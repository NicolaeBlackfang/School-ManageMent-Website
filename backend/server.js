const express = require('express');
const cors = require('cors');
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

// 2. Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));


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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Test Route
app.get('/', (req, res) => {
  res.send('School Management API is running...');
});

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
