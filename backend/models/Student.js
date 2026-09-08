// backend/models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  studentId: {
    type: String,
    // 🟢 FIXED: 'unique: true' completely removed to prevent automatic collection tracking crashes
    default: function() { return `STU-${Date.now().toString().slice(-4)}`; }
  },
  rollNumber: {
    type: Number,
    required: [true, 'Please assign a class roll number.']
  },
  gradeClass: {
    type: String,
    default: 'Unassigned'
  },
  parentContact: {
    type: String,
    default: ''
  },
  guardianName: {
    type: String,
    default: ''
  }
}, { timestamps: true });

// Ensure unique roll numbers PER CLASS
StudentSchema.index({ gradeClass: 1, rollNumber: 1 }, { unique: true });

module.exports = mongoose.model('Student', StudentSchema);
