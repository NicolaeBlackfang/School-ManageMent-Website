// backend/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Gradebook = require('../models/Gradebook');

// @desc    Get the logged-in student's personal profile, attendance metrics, and report card scores
// @route   GET /api/student/my-records
// @access  Private (Students only)
router.get('/my-records', protect, authorizeRoles('student'), async (req, res) => {
  try {
    const userId = req.user.id; // Securely captured straight out of the encrypted JWT token pass

    // 1. Fetch Student profile parameters
    const studentProfile = await Student.findOne({ userId }).lean();
    if (!studentProfile) {
      return res.status(404).json({ success: false, message: 'Student database registry not found.' });
    }

    const { gradeClass, rollNumber } = studentProfile;

    // 2. Fetch and aggregate historical attendance sheets for this student
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(`${currentYear}-01-01`);
    const endOfYear = new Date(`${currentYear}-12-31`);

    const attendanceSheets = await Attendance.find({
      classId: gradeClass,
      date: { $gte: startOfYear, $lte: endOfYear }
    }).lean();

    let totalSessions = 0;
    let presentCount = 0;
    let lateCount = 0;
    let absentCount = 0;

    attendanceSheets.forEach(sheet => {
      const match = sheet.records.find(r => r.studentId.toString() === userId.toString());
      if (match) {
        totalSessions += 1;
        if (match.status === 'Present') presentCount += 1;
        else if (match.status === 'Late') lateCount += 1;
        else if (match.status === 'Absent') absentCount += 1;
      }
    });

    const attendancePercentage = totalSessions > 0
      ? Math.round(((presentCount + (lateCount * 0.5)) / totalSessions) * 100 * 10) / 10
      : 100;

    // 3. Fetch all finalized term marks row data out of the Gradebook collection
    const reportCardGrades = await Gradebook.find({
      studentId: userId,
      isPublished: true // ⚡ Enforces absolute privacy block protecting unpublished drafts!
    })
      .populate('submittedBy', 'name')
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      profile: {
        gradeClass,
        rollNumber: rollNumber || 'Unassigned',
        guardianName: studentProfile.guardianName || 'N/A',
        parentContact: studentProfile.parentContact || 'N/A'
      },
      attendance: {
        totalSessions,
        presentCount,
        lateCount,
        absentCount,
        percentage: attendancePercentage
      },
      grades: reportCardGrades.map(g => ({
        _id: g._id,
        subject: g.subject,
        term: g.term,
        marksObtained: g.marksObtained,
        letterGrade: g.letterGrade,
        gradedBy: g.submittedBy?.name || 'Faculty Member'
      }))
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
