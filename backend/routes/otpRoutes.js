const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp } = require('../controllers/otpController');
const { validate, schemas } = require('../middleware/validate');

router.post('/send', validate(schemas.otpSend), sendOtp);
router.post('/verify', validate(schemas.otpVerify), verifyOtp);

module.exports = router;
