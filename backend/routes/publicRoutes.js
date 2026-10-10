// backend/routes/publicRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');
const cloudinary = require('../config/cloudinary');
const { protect, authorizeRoles } = require('../middleware/auth');
const { SchoolInfo, Application } = require('../models/PublicModels');

const storage = multer.memoryStorage();

// Only permit common image formats and cap the upload size to prevent abuse/DoS
const imageFileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Validation failed: only JPEG, PNG, WEBP or GIF images are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 2 } // 5MB per file
});

const streamUpload = (buffer, folderName) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: folderName, resource_type: 'image' }, (err, res) => {
      if (err) return reject(err);
      resolve(res.secure_url);
    });
    stream.end(buffer);
  });
};

// @desc    Get public school profiles information and leadership matrix
// @route   GET /api/public/info
router.get('/info', async (req, res) => {
  try {
    let info = await SchoolInfo.findOne().lean();
    if (!info) info = await SchoolInfo.create({});
    res.json({ success: true, data: info });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// @desc    Update base school website text parameters (Admin Only)
// @route   POST /api/public/info/update
router.post('/info/update', protect, authorizeRoles('admin'), upload.fields([{ name: 'logo' }, { name: 'banner' }]), async (req, res) => {
  const { welcomeTitle, aboutText } = req.body;
  try {
    let info = await SchoolInfo.findOne() || new SchoolInfo();
    info.welcomeTitle = welcomeTitle || info.welcomeTitle;
    info.aboutText = aboutText || info.aboutText;

    if (req.files?.logo) info.schoolLogo = await streamUpload(req.files.logo.buffer, 'school_branding');
    if (req.files?.banner) info.bannerImage = await streamUpload(req.files.banner.buffer, 'school_branding');

    await info.save();
    res.json({ success: true, message: 'Website updated live!', data: info });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// @desc    Append a new Founding Member Profile Card
// @route   POST /api/public/founder/add
router.post('/founder/add', protect, authorizeRoles('admin'), upload.single('founderPhoto'), async (req, res) => {
  const { name, designation, quote } = req.body;
  try {
    let info = await SchoolInfo.findOne() || await SchoolInfo.create({});
    let uploadedImageUrl = req.file ? await streamUpload(req.file.buffer, 'school_founders') : "";

    info.founders.push({ name, designation, quote, image: uploadedImageUrl });
    await info.save();
    res.json({ success: true, message: 'Leader card deployed live!', data: info });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// @desc    Wipe/Delete a specific Founder Profile array index entry
// @route   DELETE /api/public/founder/:founderId
router.delete('/founder/:founderId', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    let info = await SchoolInfo.findOne();
    if (!info) return res.status(404).json({ success: false, message: 'Config document missing.' });
    info.founders = info.founders.filter(f => f._id.toString() !== req.params.founderId.toString());
    await info.save();
    res.json({ success: true, message: 'Founding member card removed successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// @route   POST /api/public/apply
router.post('/apply', async (req, res) => {
  try {
    const config = await SchoolInfo.findOne().lean() || { admissionFeeAmount: 500 };

    // ⚠️ SECURITY: Explicit allow-list instead of spreading req.body.
    // This prevents mass assignment of server-controlled fields such as
    // applicationStatus, paidAmount, paymentStatus and paymentTxnId.
    const payload = {
      studentNameEn: req.body.studentNameEn,
      studentNameBn: req.body.studentNameBn,
      targetClass: req.body.targetClass,
      dateOfBirth: req.body.dateOfBirth,
      birthCertificateNo: req.body.birthCertificateNo,
      emailAddress: req.body.emailAddress,
      fatherNameEn: req.body.fatherNameEn,
      fatherNameBn: req.body.fatherNameBn,
      fatherNid: req.body.fatherNid,
      motherNameEn: req.body.motherNameEn,
      motherNameBn: req.body.motherNameBn,
      motherNid: req.body.motherNid,
      parentPhone: req.body.parentPhone,
      guardianNameEn: req.body.guardianNameEn,
      guardianNameBn: req.body.guardianNameBn,
      guardianPhone: req.body.guardianPhone,
      payableAmount: Number(config.admissionFeeAmount) || 500,
      paidAmount: 0,
      paymentStatus: 'Unpaid',
      applicationStatus: 'Pending'
    };

    const required = ['studentNameEn', 'studentNameBn', 'targetClass', 'dateOfBirth', 'birthCertificateNo', 'emailAddress', 'fatherNameEn', 'fatherNameBn', 'motherNameEn', 'motherNameBn', 'parentPhone'];
    const missing = required.filter((field) => payload[field] === undefined || payload[field] === null || payload[field] === '');
    if (missing.length) {
      return res.status(400).json({ success: false, message: `Missing required fields: ${missing.join(', ')}` });
    }

    const newApp = await Application.create(payload);
    res.status(201).json({
      success: true,
      message: 'Application recorded. Proceeding to payment token verification.',
      applicationId: newApp._id,
      payableAmount: config.admissionFeeAmount
    });
  } catch (error) { res.status(400).json({ success: false, message: 'Application could not be recorded.' }); }
});

// ⚠️ SECURITY NOTE: This is a mock MFS confirmation. In production this MUST be
// replaced by server-to-server verification of the transaction with the payment
// gateway (bKash/Nagad etc.) rather than trusting client-supplied values.
// @route   POST /api/public/pay-admission/:appId
router.post('/pay-admission/:appId', async (req, res) => {
  const { paymentMethod, txnId } = req.body;

  try {
    // 1. Validate transaction reference format/length
    if (typeof txnId !== 'string' || txnId.trim().length < 4 || txnId.trim().length > 64) {
      return res.status(400).json({ success: false, message: 'A valid transaction ID is required.' });
    }

    const app = await Application.findById(req.params.appId);
    if (!app) return res.status(404).json({ success: false, message: 'Application voucher absent.' });

    // 2. Idempotency: never allow an already-paid voucher to be re-marked / re-priced
    if (app.paymentStatus === 'Paid') {
      return res.status(409).json({ success: false, message: 'This application has already been paid.' });
    }

    // 3. ⚠️ Amount is determined by the SERVER, never taken from the request body.
    //    The client-submitted `amount` is ignored entirely, so it cannot be forged.
    app.paymentStatus = 'Paid';
    app.paidAmount = Number(app.payableAmount) || 500;
    app.paymentTxnId = txnId.trim();
    app.paymentMethod = typeof paymentMethod === 'string' ? paymentMethod.slice(0, 32) : 'bKash';
    await app.save();

    res.json({ success: true, message: '💸 Fee payment received! Your application status is now under review on Atlas.' });
  } catch (error) { res.status(500).json({ success: false, message: 'Payment could not be processed.' }); }
});

// @route   GET /api/public/applications (Admin Only)
router.get('/applications', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const list = await Application.find({}).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: list });
  } catch (error) { res.status(500).json({ success: false, message: 'Request failed.' }); }
});

// 🟢 UPGRADED EVALUATION ENDPOINT WITH STATUS VERIFICATIONS
// @route   PATCH /api/public/application/:appId
router.patch('/application/:appId', protect, authorizeRoles('admin'), async (req, res) => {
  const { status, paymentStatus } = req.body;
  try {
    const appRecord = await Application.findById(req.params.appId);
    if (!appRecord) return res.status(404).json({ success: false, message: 'Application entry missing.' });

    if (status) appRecord.applicationStatus = status;
    if (paymentStatus) appRecord.paymentStatus = paymentStatus;
    await appRecord.save();


    // Fire Nodemailer email alert pipeline if configured
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || '://gmail.com', port: 587, secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });
      await transporter.sendMail({
        from: `"Admissions Desk Hub" <${process.env.SMTP_USER}>`, to: appRecord.emailAddress,
        subject: `Admission Intake Status Update: #${appRecord._id.toString().slice(-6).toUpperCase()}`,
        html: `<p>Dear Parent, your application tracking code <strong>#${appRecord._id}</strong> for <strong>${appRecord.studentNameEn}</strong> status updated to: <strong>${appRecord.applicationStatus}</strong> (Payment: ${appRecord.paymentStatus}).</p>`
      }).catch(e => console.error(`Mail dispatch failed: ${e.message}`));
    }

    res.json({ success: true, message: ' Vouchers parameters saved cleanly on Atlas chains.' });
  } catch (error) { res.status(500).json({ success: false, message: 'Request failed.' }); }
});

module.exports = router;
