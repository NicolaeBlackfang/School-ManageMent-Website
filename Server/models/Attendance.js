// backend/models/Attendance.js
const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  classId: {
    type: String,
    required: [true, 'Please add a class identifier or grade level (e.g., Grade 10-A)']
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  records: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Points to the User model we created earlier
        required: true
      },
      status: {
        type: String,
        enum: ['Present', 'Absent', 'Late'],
        default: 'Present'
      }
    }
  ],
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Tracks which teacher logged this attendance sheet
    required: true
  }
}, { timestamps: true });

// Prevent duplicate entries: Ensures a class can only have ONE attendance sheet per day
AttendanceSchema.index({ classId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
