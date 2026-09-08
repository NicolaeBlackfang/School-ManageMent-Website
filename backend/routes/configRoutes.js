// backend/routes/configRoutes.js
const express = require('express');
const router = express.Router();
const SchoolConfig = require('../models/SchoolConfig');
const { protect, authorizeRoles } = require('../middleware/auth');

// @desc    Get global school configurations (Public/Authenticated)
// @route   GET /api/config
router.get('/', async (req, res) => {
  try {
    let config = await SchoolConfig.findOne();
    // If no configuration document exists yet in Atlas, initialize the default one
    if (!config) {
      config = await SchoolConfig.create({});
    }
    res.json({ success: true, data: config });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update global dropdown arrays
// @route   POST /api/config/update
// @access  Private (Admins only)
router.post('/update', protect, authorizeRoles('admin'), async (req, res) => {
  const { classes, subjects, examTerms } = req.body;
  try {
    let config = await SchoolConfig.findOne();
    if (!config) config = new SchoolConfig();

    if (classes) config.classes = classes;
    if (subjects) config.subjects = subjects;
    if (examTerms) config.examTerms = examTerms;

    await config.save();
    res.json({ success: true, message: 'Global configurations updated successfully!', data: config });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
