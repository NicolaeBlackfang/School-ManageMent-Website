// backend/models/Teacher.js
const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  teacherId: {
    type: String,
    required: [true, 'Please add a custom teacher ID'],
    unique: true,
    trim: true
  },
  department: {
    type: String,
    default: 'General Education'
  },
  qualification: {
    type: String,
    default: ''
  },
  classTeacherOf: {
    type: String,
    default: 'None', // e.g., "Grade 10-A"
    trim: true
  },
  // 🟢 NEW FIELDS FOR FUTURE SCALE:
  teacherPhone: {
    type: String,
    default: ''
  },
  subjectExpertise: {
    type: [String], // Array of strings e.g., ["Physics", "Chemistry"]
    default: []
  },
  monthlySalary: {
    type: Number,
    default: 0
  },
  employmentStatus: {
    type: String,
    enum: ['Active', 'On Leave', 'Suspended'],
    default: 'Active'
  },
  joiningDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', TeacherSchema);
