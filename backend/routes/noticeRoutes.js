// backend/routes/noticeRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcryptjs');

// 🟢 FIXED: Imports the centralized config hub instantiator natively!
const cloudinary = require('../config/cloudinary');

const { protect, authorizeRoles } = require('../middleware/auth');
const Notice = require('../models/Notice');
const User = require('../models/User');

// 1. Configure the fail-safe memory buffer storage engine
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Validation Aborted: Notice attachments must be in PDF layout format only!'), false);
  }
};
const upload = multer({ storage, fileFilter });


router.post('/', protect, authorizeRoles('admin'), upload.single('pdfFile'), async (req, res) => {
  const { title, content, targetAudience } = req.body;

  try {
    let secureCloudUrl = '';

    // 🟢 Handshake buffer stream directly to Cloudinary bypassing plugin wrappers
    if (req.file) {
      const uploadPromise = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: 'school_notices',
              resource_type: 'raw', // Enforces raw file rules safely
              public_id: `NOTICE-${Date.now()}`
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );
          // Stream raw data chunks from memory buffer straight to cloud bucket
          stream.end(req.file.buffer);
        });
      };

      secureCloudUrl = await uploadPromise();
    }

    const noticePayload = {
      title,
      content,
      targetAudience: targetAudience || 'all',
      submittedBy: req.user.id,
      attachmentUrl: secureCloudUrl // Saves clean absolute cloud URL address string
    };

    const notice = await Notice.create(noticePayload);
    res.status(201).json({ success: true, data: notice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get notices matching target visibility rules
// @route   GET /api/notices
router.get('/', protect, async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'student') {
      filter.targetAudience = { $in: ['all', 'student'] };
    } else if (req.user.role === 'teacher') {
      filter.targetAudience = { $in: ['all', 'student', 'teacher'] };
    }
    const notices = await Notice.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: notices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Verify admin credentials before critical destruction actions
// @route   POST /api/notices/verify-admin-password
router.post('/verify-admin-password', protect, authorizeRoles('admin'), async (req, res) => {
  const { password } = req.body;
  try {
    const user = await User.findById(req.user.id).select('+password');
    if (!user) return res.status(404).json({ success: false, message: 'User record dropped.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: '🔒 Security clearance denied: Incorrect password entered.' });
    }
    res.json({ success: true, message: 'Clearance verified.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Wipe/Delete an institutional notice permanently with Cloudinary asset cleanup
// @route   DELETE /api/notices/:id
router.delete('/:id', protect, authorizeRoles('admin'), async (req, res) => {
  const adminPassword = req.headers['x-admin-password'];
  if (!adminPassword) {
    return res.status(400).json({ success: false, message: 'Security Blocked: Admin verification password string required.' });
  }

  try {
    const adminUser = await User.findById(req.user.id).select('+password');
    const isMatch = await bcrypt.compare(adminPassword, adminUser.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: '🔒 Access Denied: Incorrect administrator password verification.' });
    }

    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ success: false, message: 'Target announcement bulletin record not found.' });

    // Clean up Cloudinary asset if it exists
    if (notice.attachmentUrl) {
      try {
        const fileId = notice.attachmentUrl.split('/').pop(); // Extracts file string signature cleanly
        await cloudinary.uploader.destroy(`school_notices/${fileId}`, { resource_type: 'raw' });
      } catch (cloudErr) {
        console.error(`Cloudinary cleanup skipped: ${cloudErr.message}`);
      }
    }

    await Notice.deleteOne({ _id: req.params.id });
    res.json({ success: true, message: '🎯 Notice and cloud attachment wiped successfully from system clusters!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
