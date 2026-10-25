// backend/routes/gradebookRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');
const { requireAssignment, findOutOfClassStudents } = require('../middleware/assignments');
const Student = require('../models/Student');
const Gradebook = require('../models/Gradebook');

// @desc    Get student roster for any target class along with existing marks for a specific subject
// @route   GET /api/grades/class/:classId/subject/:subjectName/term/:termName
// @access  Private (Teachers & Admins)
router.get('/class/:classId/subject/:subjectName/term/:termName', protect, authorizeRoles('teacher', 'admin'), validate(schemas.spreadsheetParams, 'params'), requireAssignment(), async (req, res) => {
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
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// @desc    Bulk upload or overwrite marks for a specific subject row
// @route   POST /api/grades/bulk-submit
// @access  Private (Teachers & Admins)
router.post('/bulk-submit', protect, authorizeRoles('teacher', 'admin'), validate(schemas.bulkSubmit), requireAssignment(), async (req, res) => {
  const { classId, subject, term, scores } = req.body;

  try {
    if (!Array.isArray(scores)) {
      return res.status(400).json({ success: false, message: 'Invalid scores payload.' });
    }

    // ⚠️ Never trust client studentIds: every scored student must belong to the
    // targeted class, otherwise a grade row could be fabricated across classes.
    const outOfClass = await findOutOfClassStudents(classId, scores.map((item) => item.studentId));
    if (outOfClass.length > 0) {
      return res.status(400).json({ success: false, message: 'One or more students do not belong to the targeted class.' });
    }

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
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});
// @desc    Allow Class Teachers to toggle publication states for their entire class scores matrix
// @route   POST /api/grades/toggle-publish
// @access  Private (Teachers only)
router.post('/toggle-publish', protect, authorizeRoles('teacher'), validate(schemas.togglePublish), requireAssignment({ requireSubject: false }), async (req, res) => {
  const { classId, term, publishState } = req.body; // publishState = true or false

  try {
    // ⚡ Execute a bulk update flag flip across all subject cards for this class term
    await Gradebook.updateMany(
      { classId, term },
      { $set: { isPublished: publishState } }
    );

    res.json({ success: true, message: `Successfully shifted reports to ${publishState ? 'PUBLISHED' : 'DRAFT'} mode!` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});


module.exports = router;
