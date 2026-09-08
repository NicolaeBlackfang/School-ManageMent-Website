// backend/models/SchoolConfig.js
const mongoose = require('mongoose');

const SchoolConfigSchema = new mongoose.Schema({
  // Arrays of text labels used to generate dropdown choices globally
  classes: {
    type: [String],
    default: ['Grade 10-A', 'Grade 10-B', 'Grade 11-A']
  },
  subjects: {
    type: [String],
    default: ['Science', 'Mathematics', 'English']
  },
  examTerms: {
    type: [String],
    default: ['Mid-Term Exam', 'Final Exam']
  }
}, { timestamps: true });

module.exports = mongoose.model('SchoolConfig', SchoolConfigSchema);
