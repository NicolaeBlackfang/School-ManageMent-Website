const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const connectDB = require('./config/db');
const { csrfInit, csrfProtect } = require('./middleware/csrf');
const sanitize = require('./middleware/sanitize');
const attendanceRoutes = require('./routes/attendanceRoutes');
const { isSandbox } = require('./services/payment');
const authRoutes = require('./routes/authRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const gradebookRoutes = require('./routes/gradebookRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');


// 1. Load environment variables first
dotenv.config({ path: path.join(__dirname, '.env') });

// Fail fast on missing critical secrets rather than silently signing tokens with
// an undefined/weak key.
if (!process.env.JWT_SECRET) {
  console.error('FATAL: JWT_SECRET is not set. Refusing to start.');
  process.exit(1);
}
// Reject weak signing keys: a short secret is brute-forceable and undermines
// every session/2FA token. Fatal in production, loud warning in local dev.
if (process.env.JWT_SECRET.length < 32) {
  const msg = 'JWT_SECRET is shorter than 32 characters. Use a long random value.';
  if (process.env.NODE_ENV === 'production') {
    console.error(`FATAL: ${msg} Refusing to start.`);
    process.exit(1);
  }
  console.warn(`WARNING: ${msg}`);
}
if (process.env.NODE_ENV === 'production' && isSandbox) {
  console.warn('WARNING: PAYMENT_PROVIDER is "sandbox" in production; admission payments will be rejected until a real provider is configured.');
}

const app = express();
app.disable('x-powered-by'); // Hide the Express fingerprint

// Behind a single reverse proxy (production). Enables accurate client IPs for
// rate limiting and lets HttpOnly+Secure cookies work over HTTPS.
if (['true', '1'].includes(String(process.env.TRUST_PROXY || '').toLowerCase())) {
  app.set('trust proxy', 1);
}

// 2. Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      scriptSrcAttr: ["'none'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:", "https://res.cloudinary.com", "https://*.cloudinary.com"],
      fontSrc: ["'self'", "data:"],
      connectSrc: [
        "'self'",
        "https://res.cloudinary.com",
        "ws://localhost:5174", "wss://localhost:5174",
        "ws://localhost:5175", "wss://localhost:5175",
      ],
      objectSrc: ["'none'"],
      frameSrc: ["'none'"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  referrerPolicy: { policy: 'same-origin' },
  hsts: process.env.NODE_ENV === 'production'
    ? { maxAge: 15552000, includeSubDomains: true, preload: true }
    : false,
}));

// Restrict CORS to a configurable allow-list of trusted front-end origins
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5174,http://localhost:5175,http://localhost:3000,http://localhost:4173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Development may use any localhost port (for example when 5173 is busy).
    // Production remains restricted to the configured allow-list.
    const isLocalDevelopmentOrigin = process.env.NODE_ENV !== 'production' &&
      /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(origin || '');
    if (!origin || allowedOrigins.includes(origin) || isLocalDevelopmentOrigin) {
      return callback(null, true);
    }
    const err = new Error('Not allowed by CORS');
    err.status = 403;
    return callback(err);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-password', 'X-CSRF-Token'],
  credentials: true,
}));

// Body parsers - reduced limit to limit memory-exhaustion abuse.
// 2mb accommodates a 1MB base64-encoded profile image (~1.37x inflation).
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));
app.use(cookieParser());

// 🛡️ NoSQL injection scrubber — strips Mongo operator keys from all payloads.
app.use(sanitize);

// 🛡️ CSRF double-submit cookie: issued on every response, verified on mutations.
app.use(csrfInit);
app.use('/api', csrfProtect);

// 🛡️ Rate limiting: generous global cap, strict cap on authentication endpoints
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  skip: (req) => req.path === '/public/apply' || req.path.startsWith('/public/pay-admission/'),
  standardHeaders: true,
  legacyHeaders: false,
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // 20 attempts per 15 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many attempts. Please try again later.' },
});
app.use('/api', globalLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth/2fa/verify', authLimiter);
// OTP issuance and verification are separate from the auth router, so give
// them their own abuse controls as well.
app.use('/api/otp/send', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many code requests. Please try again later.' },
}));
app.use('/api/otp/verify', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many verification attempts. Please try again later.' },
}));



// 3. Setup Mongoose Connection Listeners FIRST
mongoose.connection.on('connected', () => {
  console.log('💚 SUCCESS: Mongoose is actively connected to MongoDB!');
});
mongoose.connection.on('error', (err) => {
  console.log(`💔 ERROR: Mongoose connection failed: ${err.message}`);
});
mongoose.connection.on('disconnected', () => {
  console.log('💛 WARNING: Mongoose disconnected from MongoDB.');
});

// 4. Trigger the actual database connection
connectDB();

// 5. Routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/grades', gradebookRoutes);
app.use('/api', assignmentRoutes);
app.use('/api/config', require('./routes/configRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));
app.use('/api/public', require('./routes/publicRoutes'));
app.use('/api/cms', require('./routes/cmsRoutes'));
app.use('/api/otp', require('./routes/otpRoutes'));

// Serve the built SPAs in production from one origin so cookies, CSRF and CSP
// stay same-site. AdminPanel lives under /admin; Website owns the public root.
if (process.env.NODE_ENV === 'production') {
  const adminDist = path.join(__dirname, '..', 'AdminPanel', 'dist');
  const websiteDist = path.join(__dirname, '..', 'Website', 'dist');

  app.use('/admin', express.static(adminDist));
  app.get('/admin/*', (req, res, next) => {
    res.sendFile(path.join(adminDist, 'index.html'), (err) => err && next());
  });

  app.use(express.static(websiteDist));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/admin')) return next();
    res.sendFile(path.join(websiteDist, 'index.html'), (err) => err && next());
  });
}





// Test Route
app.get('/', (req, res) => {
  res.send('School Management API is running...');
});

// 7. 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Resource not found.' });
});

// 8. Centralized error handler - never leak internal stack traces / DB messages
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || (err.name === 'MulterError' ? 400 : 500);
  if (status >= 500) console.error(err);
  res.status(status).json({
    success: false,
    message: status === 400 ? err.message : status === 403 ? 'Origin is not allowed.' : 'Internal server error.',
  });
});

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
