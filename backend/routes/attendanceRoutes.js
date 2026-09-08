// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const { protect, authorizeRoles } = require('../middleware/auth');

// @desc    Submit daily attendance roster
// @route   POST /api/attendance
// @access  Private (Teachers & Admins only)
router.post('/', protect, authorizeRoles('teacher', 'admin'), async (req, res) => {
  const { classId, date, records } = req.body;

  try {
    // Upsert logic: Update if the class attendance for that day already exists, otherwise create new
    const cleanDate = new Date(date).setHours(0,0,0,0);
    
    const attendance = await Attendance.findOneAndUpdate(
      { classId, date: cleanDate },
      { classId, date: cleanDate, records, submittedBy: req.user.id },
      { new: true, upsert: true }
    );

    res.status(201).json({ success: true, data: attendance });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Get attendance history for a specific class
// @route   GET /api/attendance/:classId
// @access  Private (All authenticated portal roles)
router.get('/:classId', protect, async (req, res) => {
  try {
    const history = await Attendance.find({ classId: req.params.classId })
      .populate('records.studentId', 'name email')
      .sort({ date: -1 });
      
    res.json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
