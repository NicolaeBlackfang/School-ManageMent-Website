// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Teacher = require('../models/Teacher');
const { protect, authorizeRoles } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// ⚠️ SECURITY HELPER: Admins may access any class; a teacher only their own class.
const canAccessClass = async (user, classId) => {
  if (!user) return false;
  if (user.role === 'admin') return true;
  const teacherProfile = await Teacher.findOne({ userId: user.id }).lean();
  return !!(teacherProfile && teacherProfile.classTeacherOf === classId);
};

// @desc    Submit daily attendance roster
// @route   POST /api/attendance
// @access  Private (Teachers & Admins only)
router.post('/', protect, authorizeRoles('teacher', 'admin'), validate(schemas.submitAttendance), async (req, res) => {
  const { classId, date, records } = req.body;

  try {
    // ⚠️ Authorization: a teacher may only submit attendance for their own class
    if (!(await canAccessClass(req.user, classId))) {
      return res.status(403).json({ success: false, message: 'Access Denied: class outside your scope.' });
    }

    if (!date || !Array.isArray(records)) {
      return res.status(400).json({ success: false, message: 'A date and a records array are required.' });
    }

    // Upsert logic: Update if the class attendance for that day already exists, otherwise create new
    const cleanDate = new Date(date).setHours(0,0,0,0);

    const attendance = await Attendance.findOneAndUpdate(
      { classId, date: cleanDate },
      { classId, date: cleanDate, records, submittedBy: req.user.id },
      { new: true, upsert: true }
    );

    res.status(201).json({ success: true, data: attendance });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Attendance could not be recorded.' });
  }
});

// @desc    Get attendance history for a specific class
// @route   GET /api/attendance/:classId
// @access  Private (Admins & the class-owning teacher only)
router.get('/:classId', protect, authorizeRoles('admin', 'teacher'), validate(schemas.classParam, 'params'), async (req, res) => {
  try {
    // ⚠️ Authorization: students/parents must use their own scoped endpoints;
    // teachers can only read their assigned class.
    if (!(await canAccessClass(req.user, req.params.classId))) {
      return res.status(403).json({ success: false, message: 'Access Denied: class outside your scope.' });
    }

    const history = await Attendance.find({ classId: req.params.classId })
      .populate('records.studentId', 'name email')
      .sort({ date: -1 });

    res.json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not fetch attendance history.' });
  }
});

module.exports = router;
