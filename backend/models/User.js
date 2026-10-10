// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 8,
    select: false // Automatically excludes password when fetching users
  },
  role: {
    type: String,
    enum: ['admin', 'teacher', 'student', 'parent'],
    default: 'student'
  },
  profileImage: {
    type: String,
    default: "" // Local default fallback handled on frontend assets folder
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorSecret: {
    type: String,
    default: "",
    select: false // Never returned to the client
  }
}, { timestamps: true });

// Encrypt password using pure modern async/await syntax
UserSchema.pre('save', async function () {
  // 1. If password hasn't changed, return immediately to exit the function
  if (!this.isModified('password')) {
    return;
  }

  // 2. Hash the password safely using try/catch
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw new Error(error); // Automatically forwards database errors to Express
  }
});


// Custom method to compare entered password with hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Defense-in-depth: never let a serialized user leak the password hash or the
// TOTP secret, even if a future route forgets its explicit projection.
UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    delete ret.twoFactorSecret;
    return ret;
  },
});

module.exports = mongoose.model('User', UserSchema);