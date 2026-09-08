// backend/routes/noticeRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const { protect, authorizeRoles } = require('../middleware/auth');
const Notice = require('../models/Notice');
const User = require('../models/User');

// 1. Configure Multer Disk Storage Infrastructure Destination Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/notices/';
    // Automatically create directory folder hierarchy branches if absent inside project roots
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generates a sanitized unique timestamp signature extension index identifier
    cb(null, `NOTICE-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Filter rules strictly blocking any document extensions except authentic PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Validation Aborted: Notice attachments must be in PDF layout format only!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// 2. 🟢 UPGRADED POST ROUTE: Captures incoming PDF file attachments cleanly
router.post('/', protect, authorizeRoles('admin'), upload.single('pdfFile'), async (req, res) => {
  const { title, content, targetAudience } = req.body;

  try {
    const noticePayload = {
      title,
      content,
      targetAudience: targetAudience || 'all',
      submittedBy: req.user.id,
      attachmentUrl: req.file ? `/uploads/notices/${req.file.filename}` : '' // Saves server address string
    };

    const notice = await Notice.create(noticePayload);
    res.status(201).json({ success: true, data: notice });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Get notices matching target visibility rules
// @route   GET /api/notices
router.get('/', protect, async (req, res) => {
  try {
    let filter = {};

    // 🟢 ENFORCED VISIBILITY ISOLATION RULES
    if (req.user.role === 'student') {
      // Students can only see notices meant for 'all' or specifically for 'student'
      filter.targetAudience = { $in: ['all', 'student'] };
    } else if (req.user.role === 'teacher') {
      // Teachers can see everything! (all, student notices, and private teacher circulars)
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
// @access  Private (Admins only)
router.post('/verify-admin-password', protect, authorizeRoles('admin'), async (req, res) => {
  const { password } = req.body;
  try {
    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User record dropped.' });
    }

    // Evaluate credentials cryptographically
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: '🔒 Security clearance denied: Incorrect password entered.' });
    }

    res.json({ success: true, message: 'Clearance verified.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



// @desc    Wipe/Delete an institutional notice from all indices permanently with Admin Password Verification
// @route   DELETE /api/notices/:id
// @access  Private (Admins only)
router.delete('/:id', protect, authorizeRoles('admin'), async (req, res) => {
  // Extract password from custom verification header
  const adminPassword = req.headers['x-admin-password'];

  if (!adminPassword) {
    return res.status(400).json({ success: false, message: 'Security Blocked: Admin verification password string required.' });
  }

  try {
    // 1. Fetch current logged-in admin's true profile hash out of Atlas
    const adminUser = await User.findById(req.user.id).select('+password');

    // 2. Validate input text credentials against native password hash rules
    const isMatch = await bcrypt.compare(adminPassword, adminUser.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: '🔒 Access Denied: Incorrect administrator password verification.' });
    }

    // 3. Locate the target notice bulletin document
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Target announcement bulletin record not found.' });
    }

    // Cascading local disk asset filesystem cleanups
    if (notice.attachmentUrl) {
      const filePath = path.join(__dirname, '..', notice.attachmentUrl);
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Disk cleanup skipped: File absent or already unlinked.`);
      });
    }

    // Erase notice entirely out of database collection registries
    await Notice.deleteOne({ _id: req.params.id });

    res.json({ success: true, message: '🎯 Notice and attachment wiped successfully from system clusters!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



module.exports = router;
