// backend/models/Assignment.js
const mongoose = require('mongoose');

// Teacher ↔ Subject ↔ Class assignment (multi-assignment model).
// `subject: null` denotes a Class-Teacher assignment, which grants
// attendance/roster/analytics/publish rights for the class but NOT grading.
// Grading always requires an explicit subject row.
const AssignmentSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // The auth entity (role === 'teacher')
    required: true,
  },
  subject: {
    type: String, // Matches SchoolConfig.subjects strings; null = class-teacher only
    default: null,
    trim: true,
  },
  class: {
    type: String, // Matches SchoolConfig.classes / Student.gradeClass strings
    required: true,
    trim: true,
  },
  academicYear: {
    type: String, // e.g. "2025-2026"
    default: '',
    trim: true,
  },
  isClassTeacher: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

// Prevent duplicate (teacher, subject, class, year) assignments.
AssignmentSchema.index(
  { teacher: 1, subject: 1, class: 1, academicYear: 1 },
  { unique: true }
);

module.exports = mongoose.model('Assignment', AssignmentSchema);
