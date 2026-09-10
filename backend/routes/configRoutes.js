// backend/routes/configRoutes.js
const express = require('express');
const router = express.Router();
const SchoolConfig = require('../models/SchoolConfig');
const { protect, authorizeRoles } = require('../middleware/auth');

// @desc    Get global school configurations
// @route   GET /api/config
router.get('/', async (req, res) => {
  try {
    let config = await SchoolConfig.findOne();
    if (!config) config = await SchoolConfig.create({});
    res.json({ success: true, data: config });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update global dropdown arrays
// @route   POST /api/config/update
router.post('/update', protect, authorizeRoles('admin'), async (req, res) => {
  const { classes, subjects, examTerms } = req.body;
  try {
    let config = await SchoolConfig.findOne() || new SchoolConfig();
    if (classes) config.classes = classes;
    if (subjects) config.subjects = subjects;
    if (examTerms) config.examTerms = examTerms;
    await config.save();
    res.json({ success: true, message: 'Global configurations updated successfully!', data: config });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 🟢 ADDED: Toggle a specific day of the week as an official school off-day repeating column
router.post('/toggle-offday', protect, async (req, res) => {
  const { dayIndex } = req.body;
  if (dayIndex === undefined || dayIndex < 0 || dayIndex > 6) {
    return res.status(400).json({ success: false, message: 'Invalid calendar day reference index.' });
  }
  try {
    let config = await SchoolConfig.findOne() || await SchoolConfig.create({});
    const indexPosition = config.weeklyOffDays.indexOf(Number(dayIndex));
    if (indexPosition > -1) {
      config.weeklyOffDays.splice(indexPosition, 1); // Open it up
    } else {
      config.weeklyOffDays.push(Number(dayIndex)); // Close column index
    }
    await config.save();
    res.json({ success: true, weeklyOffDays: config.weeklyOffDays });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 🟢 ADDED: Toggle a specific single unique date string as a holiday vacation block
router.post('/toggle-holiday', protect, async (req, res) => {
  const { dateStr } = req.body;
  if (!dateStr) return res.status(400).json({ success: false, message: 'Date string parameters required.' });
  try {
    let config = await SchoolConfig.findOne() || await SchoolConfig.create({});
    const index = config.holidays.indexOf(dateStr);
    if (index > -1) {
      config.holidays.splice(index, 1); // Reopen day
    } else {
      config.holidays.push(dateStr); // Close single day
    }
    await config.save();
    res.json({ success: true, holidays: config.holidays });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
