const crypto = require('crypto');
const OtpVerification = require('../models/OtpVerification');
const User = require('../models/User');
const { sendOtpEmail } = require('../services/email');

const generateOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

const sendOtp = async (req, res) => {
  try {
    const { email, purpose = 'register' } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    
    // Check if user already exists for register
    if (purpose === 'register') {
      const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }
    }
    
    // Delete any existing OTP for this email and purpose
    await OtpVerification.deleteMany({ email: email.toLowerCase().trim(), purpose });
    
    const otp = generateOtp();
    await OtpVerification.create({
      email: email.toLowerCase().trim(),
      otpHash: crypto.createHash('sha256').update(otp).digest('hex'),
      purpose
    });
    
    await sendOtpEmail(email, otp);
    
    res.json({ success: true, message: 'OTP sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp, purpose = 'register' } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }
    
    const otpRecord = await OtpVerification.findOne({
      email: email.toLowerCase().trim(),
      purpose,
      verified: false,
      expiresAt: { $gt: new Date() }
    }).select('+otpHash +otp');
    
    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }
    
    if (otpRecord.attempts >= 3) {
      await OtpVerification.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ success: false, message: 'Too many attempts. Request new OTP' });
    }
    
    const submittedHash = crypto.createHash('sha256').update(otp).digest();
    const storedHash = Buffer.from(otpRecord.otpHash || '', 'hex');
    const otpMatches = storedHash.length === submittedHash.length && crypto.timingSafeEqual(storedHash, submittedHash);
    if (!otpMatches) {
      otpRecord.attempts += 1;
      await otpRecord.save();
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
    
    otpRecord.verified = true;
    await otpRecord.save();
    
    res.json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
};

module.exports = { sendOtp, verifyOtp };
