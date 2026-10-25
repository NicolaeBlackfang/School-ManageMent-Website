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
