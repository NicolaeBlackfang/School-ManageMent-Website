// services/email.js
// Small SMTP wrapper. Email is optional: callers should treat failures as
// non-fatal so core flows (password reset request, admission status) still work.
const nodemailer = require('nodemailer');

const isConfigured = () => Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const getTransport = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

const sendMail = async ({ to, subject, html, text }) => {
  if (!isConfigured()) return { skipped: true };
  const transport = getTransport();
  return transport.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    text,
    html: html || undefined,
  });
};

module.exports = { sendMail, isConfigured, escapeHtml };

const sendOtpEmail = async (email, otp) => {
  if (!isConfigured()) {
    console.log(`[OTP] ${email}: ${otp}`);
    return { skipped: true };
  }
  const transport = getTransport();
  return transport.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Scholaris - Email Verification Code',
    text: `Your verification code is: ${otp}. This code expires in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">Email Verification</h2>
        <p>Your verification code for Scholaris is:</p>
        <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 20px 0;">
          ${otp}
        </div>
        <p>This code expires in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  });
};

module.exports.sendOtpEmail = sendOtpEmail;
