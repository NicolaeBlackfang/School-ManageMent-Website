const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const connectDB = require('./config/db');
const attendanceRoutes = require('./routes/attendanceRoutes');
const authRoutes = require('./routes/authRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const gradebookRoutes = require('./routes/gradebookRoutes');


// 1. Load environment variables first
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// 2. Security middleware
app.use(helmet()); // Sets sensible security headers (CSP, X-Frame-Options, etc.)

// Restrict CORS to a configurable allow-list of trusted front-end origins
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173,http://localhost:3000,http://localhost:4173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow same-origin / non-browser requests (no Origin header) and allow-listed origins
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-password'],
  credentials: true,
}));

// Body parsers - reduced limit to limit memory-exhaustion abuse.
// 2mb accommodates a 1MB base64-encoded profile image (~1.37x inflation).
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));

// 🛡️ Rate limiting: generous global cap, strict cap on authentication endpoints
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
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
app.use('/api/config', require('./routes/configRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));
app.use('/api/public', require('./routes/publicRoutes'));





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
  console.error(err);
  const status = err.status || (err.name === 'MulterError' ? 400 : 500);
  res.status(status).json({
    success: false,
    message: status === 400 ? err.message : 'Internal server error.',
  });
});

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
