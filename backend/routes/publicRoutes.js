// backend/routes/publicRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');
const cloudinary = require('../config/cloudinary');
const { protect, authorizeRoles } = require('../middleware/auth');
const { SchoolInfo, Application } = require('../models/PublicModels');

const storage = multer.memoryStorage();
const upload = multer({ storage });

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
    res.status(500).json({ success: false, message: error.message });
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
    res.status(500).json({ success: false, message: error.message });
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
    res.status(500).json({ success: false, message: error.message });
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
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/public/apply
router.post('/apply', async (req, res) => {
  try {
    const config = await SchoolInfo.findOne().lean() || { admissionFeeAmount: 500 };
    const payload = { ...req.body, paymentStatus: 'Unpaid', paidAmount: 0 };
    const newApp = await Application.create(payload);
    res.status(201).json({
      success: true,
      message: 'Application recorded. Proceeding to payment token verification.',
      applicationId: newApp._id,
      payableAmount: config.admissionFeeAmount
    });
  } catch (error) { res.status(400).json({ success: false, message: error.message }); }
});

// 🟢 NEW: Submit direct mock MFS payment verification pass for admission slip
// @route   POST /api/public/pay-admission/:appId
router.post('/pay-admission/:appId', async (req, res) => {
  const { paymentMethod, txnId, amount } = req.body;
  if (!txnId || !amount) return res.status(400).json({ success: false, message: 'Transaction details missing.' });

  try {
    const app = await Application.findById(req.params.appId);
    if (!app) return res.status(404).json({ success: false, message: 'Application voucher absent.' });

    app.paymentStatus = 'Paid';
    app.paidAmount = Number(amount);
    app.paymentTxnId = txnId;
    app.paymentMethod = paymentMethod || 'bKash';
    await app.save();

    res.json({ success: true, message: '💸 Fee payment received! Your application status is now under review on Atlas.' });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @route   GET /api/public/applications (Admin Only)
router.get('/applications', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const list = await Application.find({}).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: list });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
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
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

module.exports = router;
