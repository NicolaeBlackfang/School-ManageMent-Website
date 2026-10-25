// scripts/seed-admin.js
// ⚠️ Bootstrap the very first (or reset an existing) Administrator account.
//
// Usage (from backend/):
//   node scripts/seed-admin.js                          # uses defaults, prints a generated password
//   node scripts/seed-admin.js --email boss@school.com --password 'SuperSecret!2' --name "Boss Admin"
//   node scripts/seed-admin.js --reset-password          # force-reset the password of an existing admin
//
// Defaults: name "Super Admin", email "admin@school.com", password auto-generated.
// The password is hashed via the User model's pre-save hook — never stored in plain text.
//
// Safe to re-run: if the email already exists it becomes an admin (and its password
// is reset only when --reset-password / --password is supplied).

const path = require('path');
const dotenv = require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

// --- 1. Parse CLI flags ---
const args = process.argv.slice(2);
const flag = (name) => {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
};
const hasFlag = (name) => args.includes(`--${name}`);

const email = (flag('email') || 'admin@school.com').toLowerCase().trim();
const name = flag('name') || 'Super Admin';
const reqPassword = flag('password');
const resetPassword = hasFlag('reset-password') || Boolean(reqPassword);

// --- 2. Auto-generate a strong password when none is provided ---
const crypto = require('crypto');
const generatedPassword = reqPassword || crypto.randomBytes(12).toString('base64url') + '!Aa1';
const password = reqPassword || generatedPassword;

// Guard against the minimum-length rule on the User schema
if (password.length < 8) {
  console.error('❌ Password must be at least 8 characters long.');
  process.exit(1);
}

const run = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI (or MONGO_URI) is not defined in backend/.env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log('🚀 Connected to MongoDB.');

    const existing = await User.findOne({ email });

    if (existing) {
      existing.name = name.trim();
      existing.role = 'admin';
      if (resetPassword) existing.password = password;
      await existing.save();

      console.log(`✅ Existing account ${email} promoted to Admin.`);
      if (resetPassword) console.log(`🔑 Password reset to: ${password}`);
    } else {
      await User.create({ name: name.trim(), email, password, role: 'admin' });
      console.log(`✅ Created new Admin account: ${email}`);
      console.log(`🔑 Password: ${password}`);
    }

    console.log('\n👉 Log in at /login and you will land on /admin/dashboard.');
    if (!reqPassword) {
      console.log('⚠️  Change this password after first login via Admin → User roster → edit, or re-run:');
      console.log(`    node scripts/seed-admin.js --email ${email} --password 'YourNewPass'`);
    }
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();