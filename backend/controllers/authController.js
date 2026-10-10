// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// @desc    Register a new public (parent) account
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Input validation - never trust client-supplied data
    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Invalid registration payload.' });
    }
    if (!name.trim() || !EMAIL_REGEX.test(email) || password.length < 8) {
      return res.status(400).json({ message: 'Provide a valid name, email, and a password of at least 8 characters.' });
    }

    // 2. ⚠️ SECURITY: Public self-registration ALWAYS creates a 'parent' account.
    //    The role is hard-coded here and can never be supplied by the client.
    const SAFE_PUBLIC_ROLE = 'parent';

    // Check if user already exists in core credentials collection
    const userExists = await User.findOne({ email: email.toLowerCase().trim() });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 3. ALWAYS create the base account inside the Users collection for login authentication
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: SAFE_PUBLIC_ROLE,
    });

    // Return authentication package back to your React app
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed.' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Guard against non-string input (prevents NoSQL operator injection like {"$ne": null})
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Invalid credentials format.' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed.' });
  }
};

module.exports = { registerUser, loginUser };