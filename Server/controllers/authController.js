// controllers/authController.js
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const User = require('../models/User');
const PasswordResetToken = require('../models/PasswordResetToken');
const { sendMail, isConfigured: emailConfigured, escapeHtml } = require('../services/email');
const { encryptSecret, decryptSecret, sha256 } = require('../utils/crypto');
const {
  signSessionToken,
  signPreauthToken,
  sessionCookieOptions,
  clearSessionCookie,
} = require('../middleware/auth');

const RESET_TOKEN_TTL_MS = 30 * 60 * 1000;

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Serialize a user document into the safe client-facing shape (no secrets).
const publicUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  profileImage: user.profileImage || '',
  twoFactorEnabled: Boolean(user.twoFactorEnabled),
});

// @desc    Register a new account (public self-registration is always a 'parent')
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (typeof name !== 'string' || !EMAIL_REGEX.test(email) || password.length < 8) {
      return res.status(400).json({ success: false, message: 'Invalid registration payload.' });
    }

    // ⚠️ SECURITY: Public self-registration ALWAYS creates a 'parent' account.
    const SAFE_PUBLIC_ROLE = 'parent';

    const userExists = await User.findOne({ email: email.toLowerCase().trim() });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: SAFE_PUBLIC_ROLE,
    });

    // Issued as an HttpOnly cookie — the JWT never touches JavaScript storage.
    res.cookie('token', signSessionToken(user), sessionCookieOptions());

    res.status(201).json({ success: true, user: publicUser(user) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Registration failed.' });
  }
};

// @desc    Authenticate user via email/password (cookie session + optional 2FA)
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid credentials format.' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select(
      '+password +twoFactorSecret +failedLoginAttempts +lockUntil'
    );

    // Per-account lockout (IP rate limits alone cannot stop targeted attacks).
    if (user && user.isLocked()) {
      return res.status(429).json({
        success: false,
        message: 'Account temporarily locked after repeated failed attempts. Try again later.',
      });
    }

    if (user && (await user.matchPassword(password))) {
      await user.resetLoginFailures();

      // 2FA enforced first: hand out a short-lived preauth token instead of the session.
      if (user.twoFactorEnabled && user.twoFactorSecret) {
        res.cookie('preauth', signPreauthToken(user._id), {
          ...sessionCookieOptions(),
          maxAge: 10 * 60 * 1000,
        });
        return res.json({
          success: true,
          twoFactorRequired: true,
          user: { _id: user._id, name: user.name, email: user.email },
        });
      }

      res.cookie('token', signSessionToken(user), sessionCookieOptions());
      return res.json({ success: true, user: publicUser(user) });
    }

    if (user) await user.registerFailedLogin();
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Login failed.' });
  }
};

// @desc    Return the currently authenticated user (session bootstrap for the SPA)
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.json({ success: true, user: publicUser(req.user) });
};

// @desc    Log out: destroy the session + preauth + csrf cookies
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = (req, res) => {
  clearSessionCookie(res);
  res.json({ success: true, message: 'Logged out.' });
};

// @desc    Begin TOTP setup: generate a secret + QR code (enabled only after verify)
// @route   POST /api/auth/2fa/setup
// @access  Private
const setupTwoFactor = async (req, res) => {
  try {
    const secret = speakeasy.generateSecret({ name: `SchoolPortal:${req.user.email}` });

    // Persist encrypted immediately but keep it dormant until a valid code confirms it.
    req.user.twoFactorSecret = encryptSecret(secret.base32);
    req.user.twoFactorEnabled = false;
    await req.user.save();

    let otpauthUrl = secret.otpauth_url;
    let qrDataUrl = '';
    if (otpauthUrl) {
      qrDataUrl = await qrcode.toDataURL(otpauthUrl);
    } else {
      otpauthUrl = `otpauth://totp/SchoolPortal:${encodeURIComponent(req.user.email)}?secret=${secret.base32}&issuer=SchoolPortal`;
      qrDataUrl = await qrcode.toDataURL(otpauthUrl);
    }

    res.json({ success: true, secret: secret.base32, otpauthUrl, qrCode: qrDataUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: '2FA setup failed.' });
  }
};

// @desc    Complete 2FA — either enable during setup, or finish login with a preauth token
// @route   POST /api/auth/2fa/verify
// @access  Public (preauth cookie) or Private (setup)
const verifyTwoFactor = async (req, res) => {
  const { code } = req.body;

  try {
    let user;
    let preauthConsumed = false;

    if (req.cookies && req.cookies.preauth) {
      // Login-in-progress path: identity comes from the preauth cookie.
      try {
        const decoded = jwt.verify(req.cookies.preauth, process.env.JWT_SECRET);
        if (decoded.purpose !== '2fa') {
          return res.status(401).json({ success: false, message: 'Invalid verification session.' });
        }
        user = await User.findById(decoded.id).select('+twoFactorSecret');
        preauthConsumed = true;
      } catch (e) {
        return res.status(401).json({ success: false, message: 'Verification session expired. Please log in again.' });
      }
    } else if (req.user) {
      // Setup path: user already holds a session.
      user = req.user;
      user = await User.findById(user._id).select('+twoFactorSecret');
    }

    if (!user || !user.twoFactorSecret) {
      return res.status(400).json({ success: false, message: '2FA is not configured for this account.' });
    }

    const valid = speakeasy.totp.verify({
      secret: decryptSecret(user.twoFactorSecret),
      encoding: 'base32',
      token: String(code || ''),
      window: 1,
    });

    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid verification code.' });
    }

    if (preauthConsumed) {
      // Complete login: swap the short-lived preauth cookie for a real session.
      res.cookie('token', signSessionToken(user), sessionCookieOptions());
      res.clearCookie('preauth', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/' });
      return res.json({ success: true, user: publicUser(user) });
    }

    // Enable the account's 2FA permanently.
    user.twoFactorEnabled = true;
    await user.save();
    return res.json({ success: true, message: 'Two-factor authentication enabled.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Verification failed.' });
  }
};

// @desc    Disable TOTP by confirming the current code
// @route   POST /api/auth/2fa/disable
// @access  Private
const disableTwoFactor = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findById(req.user._id).select('+twoFactorSecret');
    if (!user || !user.twoFactorSecret) {
      return res.status(400).json({ success: false, message: '2FA is not enabled for this account.' });
    }

    const valid = speakeasy.totp.verify({
      secret: decryptSecret(user.twoFactorSecret),
      encoding: 'base32',
      token: String(code || ''),
      window: 1,
    });
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid verification code.' });
    }

    user.twoFactorSecret = '';
    user.twoFactorEnabled = false;
    await user.save();
    res.json({ success: true, message: 'Two-factor authentication disabled.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
};

// @desc    Request a password-reset email (always returns a generic response)
// @route   POST /api/auth/forgot-password
// @access  Public
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const generic = {
    success: true,
    message: 'If an account exists for that email, a reset link has been sent.',
  };

  try {
    if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      // Do not leak validation differences for unknown accounts.
      return res.json(generic);
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.json(generic);

    await PasswordResetToken.deleteMany({ user: user._id, usedAt: null });

    const rawToken = crypto.randomBytes(32).toString('hex');
    await PasswordResetToken.create({
      user: user._id,
      tokenHash: sha256(rawToken),
      expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
    });

    const baseUrl =
      process.env.APP_URL ||
      (process.env.CLIENT_URL || 'http://localhost:5175').split(',')[0].trim();
    const resetUrl = `${baseUrl.replace(/\/$/, '')}/reset-password?token=${rawToken}`;

    if (emailConfigured()) {
      const safeName = escapeHtml(user.name);
      await sendMail({
        to: user.email,
        subject: 'Reset your Scholaris password',
        text: `Hi ${user.name}, reset your password within 30 minutes: ${resetUrl}`,
        html: `<p>Hi ${safeName},</p><p>Use the link below within 30 minutes to reset your password.</p><p><a href="${resetUrl}">Reset password</a></p><p>If you did not request this, you can ignore this email.</p>`,
      }).catch((err) => console.error('Password reset email failed:', err.message));
    } else if (process.env.NODE_ENV !== 'production') {
      // Local development without SMTP: surface the link in the server log only.
      console.log(`[password-reset] ${user.email}: ${resetUrl}`);
    }

    return res.json(generic);
  } catch (error) {
    console.error(error);
    return res.json(generic);
  }
};

// @desc    Consume a reset token and set a new password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    if (typeof token !== 'string' || token.length < 32 || typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token.' });
    }

    const record = await PasswordResetToken.findOne({
      tokenHash: sha256(token),
      usedAt: null,
      expiresAt: { $gt: new Date() },
    });

    if (!record) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token.' });
    }

    const user = await User.findById(record.user).select('+password');
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token.' });
    }

    user.password = password;
    user.passwordChangedAt = new Date();
    user.failedLoginAttempts = 0;
    user.lockUntil = null;
    await user.save();

    record.usedAt = new Date();
    await record.save();
    await PasswordResetToken.deleteMany({ user: user._id, _id: { $ne: record._id } });

    clearSessionCookie(res);
    return res.json({ success: true, message: 'Password updated. You can now sign in.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Password reset failed.' });
  }
};

// @desc    Change password while signed in
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    if (typeof currentPassword !== 'string' || typeof newPassword !== 'string' || newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'Passwords must be at least 8 characters.' });
    }

    const user = await User.findById(req.user._id).select('+password');
    if (!user || !(await user.matchPassword(currentPassword))) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect.' });
    }

    if (await user.matchPassword(newPassword)) {
      return res.status(400).json({ success: false, message: 'New password must differ from the current one.' });
    }

    user.password = newPassword;
    user.passwordChangedAt = new Date();
    await user.save();

    // Re-issue the session so the current device stays signed in.
    res.cookie('token', signSessionToken(user), sessionCookieOptions());
    return res.json({ success: true, message: 'Password changed successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Password change failed.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  setupTwoFactor,
  verifyTwoFactor,
  disableTwoFactor,
  requestPasswordReset,
  resetPassword,
  changePassword,
};