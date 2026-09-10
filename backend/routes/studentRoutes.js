// backend/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Gradebook = require('../models/Gradebook');
const SchoolConfig = require('../models/SchoolConfig');

// @desc    Get the logged-in student's personal base profiles and grade sheets
// @route   GET /api/student/my-records
// @access  Private (Students only)
router.get('/my-records', protect, authorizeRoles('student'), async (req, res) => {
  try {
    const userId = req.user.id;
    const studentProfile = await Student.findOne({ userId }).lean();
    if (!studentProfile) {
      return res.status(404).json({ success: false, message: 'Student registry entry absent.' });
    }

    const { gradeClass, rollNumber } = studentProfile;

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

    const reportCardGrades = await Gradebook.find({ studentId: userId, isPublished: true })
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

// @desc    Fetch personalized attendance calendar analytics matrix data for the logged-in student
// @route   GET /api/student/my-attendance-calendar
// @access  Private (Students only)
router.get('/my-attendance-calendar', protect, authorizeRoles('student'), async (req, res) => {
  const { year, month } = req.query;

  try {
    const userId = req.user.id;
    const studentProfile = await Student.findOne({ userId }).lean();
    if (!studentProfile) {
      return res.status(404).json({ success: false, message: 'Student registry entry absent.' });
    }

    const currentYear = parseInt(year) || new Date().getFullYear();
    const currentMonth = parseInt(month) || (new Date().getMonth() + 1);

    // 1. 🟢 MONTH SCOPE: For rendering active calendar cell colors
    const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const endOfMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59, 999);

    // 2. 🟢 YEAR SCOPE: For calculating persistent cumulative dashboard indicators
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 12, 0, 23, 59, 59, 999);

    // Fetch school config off-day markers safely
    const schoolConfig = await SchoolConfig.findOne().lean() || {};
    const weeklyOffDays = schoolConfig.weeklyOffDays || [5, 6];
    const holidays = schoolConfig.holidays || [];

    // 3. 🟢 FIXED QUERY: Pull the entire year's worth of data to secure cumulative records!
    const yearlyAttendanceSheets = await Attendance.find({
      classId: studentProfile.gradeClass,
      date: { $gte: startOfYear, $lte: endOfYear }
    }).lean();

    const personalLogs = {};
    let totalSessions = 0;
    let presentCount = 0;
    let lateCount = 0;
    let absentCount = 0;

    yearlyAttendanceSheets.forEach(sheet => {
      if (!sheet.date) return;
      const d = new Date(sheet.date);

      // Calculate standard YYYY-MM-DD key mapping parameters
      const padDay = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
      const padMonth = (d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
      const dayStr = `${d.getFullYear()}-${padMonth}-${padDay}`;

      const match = sheet.records.find(r => r.studentId.toString() === userId.toString());
      if (match) {
        // Only assign cell logs to 'personalLogs' if they belong inside the active month view bounds
        if (d >= startOfMonth && d <= endOfMonth) {
          personalLogs[dayStr] = match.status;
        }

        // 🟢 CUMULATIVE COUNTER: Counts the whole academic year across all sheets regardless of month changes!
        totalSessions += 1;
        if (match.status === 'Present') presentCount += 1;
        else if (match.status === 'Late') lateCount += 1;
        else if (match.status === 'Absent') absentCount += 1;
      }
    });

    const attendancePercentage = totalSessions > 0
      ? Math.round(((presentCount + (lateCount * 0.5)) / totalSessions) * 100 * 10) / 10
      : 100;

    res.json({
      success: true,
      personalLogs,
      weeklyOffDays,
      holidays,
      summary: {
        totalSessions,
        presentCount,
        lateCount,
        absentCount,
        percentage: attendancePercentage
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
