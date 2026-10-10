// middleware/csrf.js
// Double-submit cookie pattern: every response may carry a `csrf` cookie (readable
// by JS) and every state-changing request must echo it in the X-CSRF-Token header.
// SameSite=Lax on the session cookie already blocks cross-site POSTs; this is
// defense-in-depth against subdomain/session-riding attacks.
const crypto = require('crypto');

const csrfCookieOptions = () => ({
  httpOnly: false, // must be readable by the SPA to echo the header
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000,
  path: '/',
});

// Ensure a csrf cookie exists on every response so the very first POST works.
const csrfInit = (req, res, next) => {
  if (!req.cookies || !req.cookies.csrf) {
    const token = crypto.randomBytes(24).toString('hex');
    res.cookie('csrf', token, csrfCookieOptions());
    req.csrfToken = token;
  } else {
    req.csrfToken = req.cookies.csrf;
  }
  next();
};

// Verify the double-submit token on all non-safe HTTP methods.
const csrfProtect = (req, res, next) => {
  const method = req.method.toUpperCase();
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) return next();

  const header = req.headers['x-csrf-token'];
  const cookie = req.cookies && req.cookies.csrf;

  if (!header || !cookie || header !== cookie) {
    return res.status(403).json({ success: false, message: 'Security token verification failed.' });
  }
  next();
};

module.exports = { csrfInit, csrfProtect }; // eslint-disable-line no-undef