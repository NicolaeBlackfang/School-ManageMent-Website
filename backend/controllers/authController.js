// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Import your role-specific sub-models
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

// Helper function to generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user and map dynamically to specific collections
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists in core credentials collection
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 1. ALWAYS create the base account inside the Users collection for login authentication
    const user = await User.create({
      name,
      email,
      password,
      role, // 'admin', 'teacher', 'student', or 'parent'
    });

    if (user) {
      // 2. 🟢 CONDITIONAL ALLOCATION RULES
      if (user.role === 'teacher') {
        // If registering as a teacher, create an entry in the Teacher collection
        const fallbackTeacherId = `TCH-${Date.now().toString().slice(-4)}`;
        await Teacher.create({
          userId: user._id,
          teacherId: fallbackTeacherId,
          department: 'General Education'
        });

        // Look inside your registerUser function and update the student conditional block:
        // controllers/authController.js

        // Look inside your registerUser function and change the student block to this:
      } else if (user.role === 'student') {
        // 🟢 FIXED: Explicitly grab rollNumber and guardianName from req.body natively
        const absoluteRollNumber = req.body.rollNumber ? Number(req.body.rollNumber) : 1;
        const customIdPlaceholder = req.body.customId || `STU-${Date.now().toString().slice(-4)}`;

        await Student.create({
          userId: user._id,
          studentId: customIdPlaceholder,
          gradeClass: req.body.extraField1 || 'Unassigned', // class assignments string
          parentContact: req.body.extraField2 || '',       // parent phone string
          guardianName: req.body.guardianName || '',        // guardian name string
          rollNumber: absoluteRollNumber                    // 🟢 SAVES REAL NUMBER INT INTO ATLAS NATIVELY!
        });
      }


      // 💡 NOTE: 'parent' and 'admin' skip this block and only remain inside the Users collection!

      // Return authentication package back to your React app
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

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
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
