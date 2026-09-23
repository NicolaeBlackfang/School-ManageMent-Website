// backend/models/PublicModels.js
const mongoose = require('mongoose');

// 1. Founding Member Individual Record Schema Template
const FounderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  quote: { type: String, required: true },
  image: { type: String, default: "" }
});

// 2. Global School Website Parameters Schema
const SchoolInfoSchema = new mongoose.Schema({
  welcomeTitle: { type: String, default: "Welcome to Institutional Excellence" },
  aboutText: { type: String, default: "Providing top-tier educational frameworks and global curriculum standard structures." },
  schoolLogo: { type: String, default: "" },
  bannerImage: { type: String, default: "" },
  founders: [FounderSchema]
}, { timestamps: true });

// 3. 🟢 FIXED: Admission Application Schema with all extended data parameters
const ApplicationSchema = new mongoose.Schema({
  studentNameEn: { type: String, required: true },
  studentNameBn: { type: String, required: true },
  targetClass: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  birthCertificateNo: { type: String, required: true },
  emailAddress: { type: String, required: true },

  // Parents Profile Matrix (Dual-Language & NIDs)
  fatherNameEn: { type: String, required: true },
  fatherNameBn: { type: String, required: true },
  fatherNid: { type: String },
  motherNameEn: { type: String, required: true },
  motherNameBn: { type: String, required: true },
  motherNid: { type: String },
  parentPhone: { type: String, required: true },

  // Emergency Legal Guardian Backup
  guardianNameEn: { type: String },
  guardianNameBn: { type: String },
  guardianPhone: { type: String },

  // Fee and MFS Verification Fields
  payableAmount: { type: Number, default: 500 },
  paidAmount: { type: Number, default: 0 },
  paymentStatus: { type: String, default: 'Unpaid' },
  paymentMethod: { type: String },
  paymentTxnId: { type: String },

  // Oversight Workflow Status
  applicationStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

module.exports = {
  SchoolInfo: mongoose.model('SchoolInfo', SchoolInfoSchema),
  Application: mongoose.model('Application', ApplicationSchema)
};
