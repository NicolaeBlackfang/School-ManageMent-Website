// backend/models/Gradebook.js
const mongoose = require('mongoose');

const GradebookSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Links to the base user account
    required: true
  },
  classId: {
    type: String, // e.g., "Grade 10-A", "Grade 10-B"
    required: true
  },
  term: {
    type: String, // e.g., "Mid-Term Exam", "Final Exam"
    required: true
  },
  subject: {
    type: String, // e.g., "Science", "Mathematics", "English"
    required: true
  },
  marksObtained: {
    type: Number,
    required: [true, 'Please add the marks obtained'],
    min: [0, 'Marks cannot be less than 0'],
    max: [100, 'Marks cannot exceed 100']
  },
  letterGrade: {
    type: String, // Automatically calculated (A+, A, B, F)
    default: 'F'
  },
  // 🟢 NEW: Controls student visibility blocks globally
  isPublished: {
    type: Boolean,
    default: false // All entries remain hidden drafts by default!
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Tracks the specific teacher who input these marks
    required: true
  }
}, { timestamps: true });

// 🟢 CRUCIAL COMPOSITE INDEX: Prevents a teacher from entering duplicate Science marks 
// for the same student, in the same class, during the same exam term.
GradebookSchema.index({ studentId: 1, classId: 1, term: 1, subject: 1 }, { unique: true });

// Auto-calculate letter grades before saving to Atlas
GradebookSchema.pre('save', function (next) {
  const marks = this.marksObtained;
  if (marks >= 90) this.letterGrade = 'A+';
  else if (marks >= 80) this.letterGrade = 'A';
  else if (marks >= 70) this.letterGrade = 'B';
  else if (marks >= 60) this.letterGrade = 'C';
  else if (marks >= 50) this.letterGrade = 'D';
  else this.letterGrade = 'F';
  next();
});

module.exports = mongoose.model('Gradebook', GradebookSchema);
