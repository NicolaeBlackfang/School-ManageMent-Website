// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Session JWT lifetime (8 hours). 2FA "preauth" tokens are deliberately short-lived.
const SESSION_EXPIRY = process.env.JWT_EXPIRY || '8h';
const PREAUTH_EXPIRY = '10m';

// Sign the main session token (only ever delivered via an HttpOnly cookie).
const signSessionToken = (user) =>
  jwt.sign({ id: user._id, role: user.role, purpose: 'session' }, process.env.JWT_SECRET, {
    expiresIn: SESSION_EXPIRY,
  });

// Short-lived token proving the password step passed so a TOTP code can be exchanged for a session.
const signPreauthToken = (userId) =>
  jwt.sign({ id: userId, purpose: '2fa' }, process.env.JWT_SECRET, { expiresIn: PREAUTH_EXPIRY });

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

// Cookie options for the session token. Secure only in production (local dev is http).
const sessionCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 8 * 60 * 60 * 1000, // matches 8h expiry
  path: '/',
});

const clearSessionCookie = (res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
  res.clearCookie('preauth', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
  // The CSRF cookie must be cleared too; otherwise a stale token survives logout.
  res.clearCookie('csrf', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
};

// Protect: accepts the session token from an HttpOnly cookie (primary) or a Bearer
// header (fallback for programmatic/testing clients). Never trusts client roles.
const protect = async (req, res, next) => {
  let token = null;

  // 1. Primary: HttpOnly cookie session
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // 2. Fallback: Bearer header (API tooling / backward compatibility)
  if (
    !token &&
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no session found' });
  }

  try {
    const decoded = verifyToken(token);

    // Reject non-session tokens (e.g. a 2FA preauth token must never open sessions)
    if (decoded.purpose && decoded.purpose !== 'session') {
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }

    const user = await User.findById(decoded.id).select('-password -twoFactorSecret');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Not authorized, account no longer exists' });
    }

    // Password changes/resets revoke older sessions (JWT iat is in seconds).
    if (
      user.passwordChangedAt &&
      decoded.iat &&
      decoded.iat * 1000 < new Date(user.passwordChangedAt).getTime() - 1000
    ) {
      return res.status(401).json({ success: false, message: 'Session expired. Please sign in again.' });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};

// Optional auth: resolves a session when present (2FA verify / optional routes),
// but never blocks the request. `req.user` stays undefined for anonymous callers.
const softAuth = async (req, res, next) => {
  let token = null;
  if (req.cookies && req.cookies.token) token = req.cookies.token;
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return next();

  try {
    const decoded = verifyToken(token);
    if (decoded.purpose && decoded.purpose !== 'session') return next();
    const user = await User.findById(decoded.id).select('-password -twoFactorSecret');
    if (user) req.user = user;
  } catch (error) {
    // Invalid/expired session — treat as anonymous.
  }
  next();
};

// Restrict a route to specific roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this resource',
      });
    }
    next();
  };
};

module.exports = {
  protect,
  softAuth,
  authorizeRoles,
  signSessionToken,
  signPreauthToken,
  verifyToken,
  sessionCookieOptions,
  clearSessionCookie,
};