// backend/routes/gradebookRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const Student = require('../models/Student');
const Gradebook = require('../models/Gradebook');

// @desc    Get student roster for any target class along with existing marks for a specific subject
// @route   GET /api/grades/class/:classId/subject/:subjectName/term/:termName
// @access  Private (Teachers & Admins)
router.get('/class/:classId/subject/:subjectName/term/:termName', protect, authorizeRoles('teacher', 'admin'), async (req, res) => {
  const { classId, subjectName, termName } = req.params;

  try {
    // 1. Fetch all students belonging to the target class dropdown selection, sorted by roll position
    const students = await Student.find({ gradeClass: classId })
      .populate('userId', 'name email')
      .sort({ rollNumber: 1 }) // 🟢 Keep sheets sorted in perfect order
      .lean();

    // 2. Fetch any marks already saved for this class, subject, and exam term
    const existingGrades = await Gradebook.find({ classId, subject: subjectName, term: termName });

    // 3. Map grades onto the student roster spreadsheet list
    const spreadsheetData = students.map(student => {
      const gradeRecord = existingGrades.find(g => g.studentId.toString() === student.userId?._id.toString());
      return {
        studentId: student.userId?._id,
        // 🟢 FIXED: Swap out legacy string studentId and pipe the dynamic numeric roll number integer instead
        studentRollId: student.rollNumber || 'N/A',
        name: student.userId?.name || 'Unknown Student',
        email: student.userId?.email || '',
        marksObtained: gradeRecord ? gradeRecord.marksObtained : '',
        letterGrade: gradeRecord ? gradeRecord.letterGrade : '-'
      };
    });

    res.json({ success: true, data: spreadsheetData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Bulk upload or overwrite marks for a specific subject row
// @route   POST /api/grades/bulk-submit
// @access  Private (Teachers & Admins)
router.post('/bulk-submit', protect, authorizeRoles('teacher', 'admin'), async (req, res) => {
  const { classId, subject, term, scores } = req.body;

  try {
    const bulkOperations = scores.map(item => {
      let grade = 'F';
      const marks = Number(item.marksObtained);
      if (marks >= 90) grade = 'A+';
      else if (marks >= 80) grade = 'A';
      else if (marks >= 70) grade = 'B';
      else if (marks >= 60) grade = 'C';
      else if (marks >= 50) grade = 'D';

      return {
        updateOne: {
          filter: { studentId: item.studentId, classId, term, subject },
          update: {
            $set: {
              studentId: item.studentId,
              classId,
              term,
              subject,
              marksObtained: marks,
              letterGrade: grade,
              submittedBy: req.user.id
            }
          },
          upsert: true
        }
      };
    });

    await Gradebook.bulkWrite(bulkOperations);
    res.json({ success: true, message: `Successfully synchronized ${subject} marks to Atlas cluster!` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// @desc    Allow Class Teachers to toggle publication states for their entire class scores matrix
// @route   POST /api/grades/toggle-publish
// @access  Private (Teachers only)
router.post('/toggle-publish', protect, authorizeRoles('teacher'), async (req, res) => {
  const { classId, term, publishState } = req.body; // publishState = true or false

  try {
    const Teacher = require('../models/Teacher');
    // Security layer: Confirm this teacher actually owns this class section space
    const teacherProfile = await Teacher.findOne({ userId: req.user.id });
    if (!teacherProfile || teacherProfile.classTeacherOf !== classId) {
      return res.status(403).json({ success: false, message: 'Access Denied: You can only publish grades for your own assigned class section.' });
    }

    // ⚡ Execute a bulk update flag flip across all subject cards for this class term
    await Gradebook.updateMany(
      { classId, term },
      { $set: { isPublished: publishState } }
    );

    res.json({ success: true, message: `Successfully shifted reports to ${publishState ? 'PUBLISHED' : 'DRAFT'} mode!` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


module.exports = router;
