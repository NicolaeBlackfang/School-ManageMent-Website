const mongoose = require('mongoose');

const OtpVerificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  otp: {
    type: String,
    select: false,
  },
  otpHash: {
    type: String,
    select: false,
  },
  purpose: {
    type: String,
    enum: ['register', 'password_reset'],
    default: 'register'
  },
  attempts: {
    type: Number,
    default: 0
  },
  verified: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
  }
}, {
  timestamps: true
});

OtpVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('OtpVerification', OtpVerificationSchema);
