// backend/models/Notice.js
const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  targetAudience: { type: String, enum: ['all', 'student', 'teacher'], default: 'all' },
  attachmentUrl: { type: String, default: '' }, // 🟢 NEW: Stores uploaded file reference paths
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Notice', NoticeSchema);
