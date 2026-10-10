// controllers/authController.js
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const User = require('../models/User');
const {
  signSessionToken,
  signPreauthToken,
  sessionCookieOptions,
  clearSessionCookie,
} = require('../middleware/auth');

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

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password +twoFactorSecret');

    if (user && (await user.matchPassword(password))) {
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

    // Persist immediately but keep it dormant until a valid code confirms it.
    req.user.twoFactorSecret = secret.base32;
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
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: code,
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
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: code,
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

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  setupTwoFactor,
  verifyTwoFactor,
  disableTwoFactor,
};