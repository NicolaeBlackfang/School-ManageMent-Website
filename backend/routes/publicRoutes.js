// backend/routes/publicRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');
const cloudinary = require('../config/cloudinary');
const { protect, authorizeRoles } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');
const { SchoolInfo, Application } = require('../models/PublicModels');
const SchoolConfig = require('../models/SchoolConfig');
const { verifyPayment } = require('../services/payment');

const DEFAULT_ADMISSION_FEE = 500;

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
router.post('/info/update', protect, authorizeRoles('admin'), upload.fields([{ name: 'logo' }, { name: 'banner' }]), validate(schemas.infoUpdate), async (req, res) => {
  const { welcomeTitle, aboutText, admissionFeeAmount } = req.body;
  try {
    let info = await SchoolInfo.findOne() || new SchoolInfo();
    info.welcomeTitle = welcomeTitle || info.welcomeTitle;
    info.aboutText = aboutText || info.aboutText;
    if (admissionFeeAmount !== undefined) info.admissionFeeAmount = admissionFeeAmount;

    // upload.fields() yields arrays keyed by field name — index [0] is required.
    if (req.files?.logo?.[0]) info.schoolLogo = await streamUpload(req.files.logo[0].buffer, 'school_branding');
    if (req.files?.banner?.[0]) info.bannerImage = await streamUpload(req.files.banner[0].buffer, 'school_branding');

    await info.save();
    res.json({ success: true, message: 'Website updated live!', data: info });
  } catch (error) {
    console.error('public info/update failed:', error);
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// @desc    Append a new Founding Member Profile Card
// @route   POST /api/public/founder/add
router.post('/founder/add', protect, authorizeRoles('admin'), upload.single('founderPhoto'), validate(schemas.founderAdd), async (req, res) => {
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
router.delete('/founder/:founderId', protect, authorizeRoles('admin'), validate(schemas.founderIdParam, 'params'), async (req, res) => {
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
router.post('/apply', validate(schemas.admissionApply), async (req, res) => {
  try {
    const [config, schoolConfig] = await Promise.all([
      SchoolInfo.findOne().lean(),
      SchoolConfig.findOne().lean(),
    ]);
    // Server-set fee: use the configured amount, fall back to the default when
    // the field is absent (legacy documents). The client never supplies this.
    const fee = Math.max(0, Number(config?.admissionFeeAmount ?? DEFAULT_ADMISSION_FEE) || 0);

    // The class list is controlled by the admin in Settings (SchoolConfig). Only
    // accept a class that is actually registered in the database.
    const approvedClasses = Array.isArray(schoolConfig?.classes) ? schoolConfig.classes : [];
    if (approvedClasses.length > 0 && !approvedClasses.includes(req.body.targetClass)) {
      return res.status(400).json({
        success: false,
        message: 'The targeted class is not approved in the school database. Please choose a class from the current list.',
      });
    }

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
      payableAmount: fee,
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
      payableAmount: fee
    });
  } catch (error) { res.status(400).json({ success: false, message: 'Application could not be recorded.' }); }
});

// Admission fee payment. The amount is determined entirely server-side by the
// payment adapter (never from the request body) and the flow is idempotent.
// @route   POST /api/public/pay-admission/:appId
router.post('/pay-admission/:appId', validate(schemas.appIdParam, 'params'), validate(schemas.payAdmission), async (req, res) => {
  const { paymentMethod, txnId } = req.body;

  try {
    const app = await Application.findById(req.params.appId);
    if (!app) return res.status(404).json({ success: false, message: 'Application voucher absent.' });

    // Idempotency: never allow an already-paid voucher to be re-marked / re-priced
    if (app.paymentStatus === 'Paid') {
      return res.status(409).json({ success: false, message: 'This application has already been paid.' });
    }

    // Server-to-server verification (or the explicitly-labelled sandbox adapter).
    // Throws a 503 when no usable provider is configured.
    const result = await verifyPayment({ application: app, txnId, method: paymentMethod });

    app.paymentStatus = 'Paid';
    app.paidAmount = Number(result.amount) || Number(app.payableAmount) || 0;
    app.paymentTxnId = result.reference;
    app.paymentMethod = result.method;
    app.paymentProvider = result.provider;
    app.paymentVerifiedAt = new Date();
    await app.save();

    res.json({
      success: true,
      message: result.sandbox
        ? 'Fee payment recorded (sandbox mode). Your application is now under review.'
        : 'Fee payment received. Your application is now under review.',
      sandbox: !!result.sandbox,
    });
  } catch (error) {
    if (error.status === 503) {
      return res.status(503).json({ success: false, message: 'Payment is temporarily unavailable.' });
    }
    res.status(500).json({ success: false, message: 'Payment could not be processed.' });
  }
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
router.patch('/application/:appId', protect, authorizeRoles('admin'), validate(schemas.appIdParam, 'params'), validate(schemas.applicationPatch), async (req, res) => {
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
        host: process.env.SMTP_HOST || 'smtp.gmail.com', port: 587, secure: false,
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
