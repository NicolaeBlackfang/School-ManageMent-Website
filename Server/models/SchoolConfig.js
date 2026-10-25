// backend/models/SchoolConfig.js
const mongoose = require('mongoose');

const SchoolConfigSchema = new mongoose.Schema({
  classes: { type: [String], default: ['Grade 10-A', 'Grade 10-B', 'Grade 11-A'] },
  subjects: { type: [String], default: ['Science', 'Mathematics', 'English'] },
  examTerms: { type: [String], default: ['Mid-Term Exam', 'Final Exam'] },
  // 🟢 NEW: Academic Session Planning Rules
  sessionStartDate: { type: Date, default: () => new Date(new Date().getFullYear(), 0, 1) }, // Jan 1st
  weeklyOffDays: { type: [Number], default: [5, 6] }, // Friday & Saturday (Standard in Bangladesh)
  holidays: { type: [String], default: [] } // Array of "YYYY-MM-DD" vacation strings
}, { timestamps: true });

module.exports = mongoose.model('SchoolConfig', SchoolConfigSchema);
