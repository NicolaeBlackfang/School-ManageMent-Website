// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // 🟢 Imported mongoose natively for object conversions
const { registerUser, loginUser } = require('../controllers/authController');
const { protect, authorizeRoles } = require('../middleware/auth');
const User = require('../models/User');

// Imported separate role-specific structural models
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Notice = require('../models/Notice');

// Public Gateways
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private Gateway - Handles standard profile updates
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.profileImage = req.body.profileImage || user.profileImage;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profileImage: updatedUser.profileImage
      });
    } else {
      res.status(404).json({ message: 'User context reference dropped.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Fetch automated live statistics counters for Admin Dashboard indicators
// @route   GET /api/auth/dashboard-stats
// @access  Private (Admins only)
router.get('/dashboard-stats', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    // ⚡ Execute parallel collection counts across MongoDB Atlas indexes for instantaneous results
    const [studentCount, teacherCount, noticeCount] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'teacher' }),
      Notice ? Notice.countDocuments({}) : Promise.resolve(0) // Safe fallback checking for notice collection
    ]);

    // Automating system pending tasks logically: 
    // Tasks can include checking how many students haven't been assigned class roll positions yet!
    const Student = require('../models/Student');
    const pendingTasksCount = await Student.countDocuments({
      $or: [
        { gradeClass: 'Unassigned' },
        { rollNumber: { $exists: false } }
      ]
    });

    res.json({
      success: true,
      stats: {
        registeredStudents: studentCount,
        activeTeachers: teacherCount,
        noticesPublished: noticeCount,
        pendingTasks: pendingTasksCount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// routes/authRoutes.js

// @desc    Get all registered users matching them with their separate sub-collection fields cleanly
// @route   GET /api/auth/users
// @access  Private (Admins only)
router.get('/users', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    // 🟢 NEW: Capture the query filters passed down from your React frontend params
    const { role, search } = req.query;

    // Build an adaptive filter match stage box array
    let matchQuery = {};

    if (role) {
      matchQuery.role = role; // Enforces strict segregation ('student' vs 'teacher')
    }

    if (search) {
      matchQuery.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.aggregate([
      // 1. 🟢 FIXED STAGE: Enforce strict role isolation right at the entry point of the pipeline
      { $match: matchQuery },

      // 2. Pull users but leave out the password hashes
      { $project: { password: 0 } },

      // 3. Look into 'teachers' collection if the user is a teacher
      {
        $lookup: {
          from: 'teachers',
          localField: '_id',
          foreignField: 'userId',
          as: 'teacherProfile'
        }
      },

      // 4. Look into 'students' collection if the user is a student
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: 'userId',
          as: 'studentProfile'
        }
      },

      // 5. Correctly map and extract rollNumber and classTeacherOf fields natively
      {
        $addFields: {
          customId: {
            $cond: {
              if: { $eq: ['$role', 'teacher'] },
              then: { $arrayElemAt: ['$teacherProfile.teacherId', 0] },
              else: ""
            }
          },
          rollNumber: {
            $cond: {
              if: { $eq: ['$role', 'student'] },
              then: { $arrayElemAt: ['$studentProfile.rollNumber', 0] },
              else: null
            }
          },
          classTeacherOf: {
            $cond: {
              if: { $eq: ['$role', 'teacher'] },
              then: { $arrayElemAt: ['$teacherProfile.classTeacherOf', 0] },
              else: 'None'
            }
          },
          extraField1: {
            $cond: {
              if: { $eq: ['$role', 'teacher'] },
              then: { $arrayElemAt: ['$teacherProfile.department', 0] },
              else: { $arrayElemAt: ['$studentProfile.gradeClass', 0] }
            }
          },
          extraField2: {
            $cond: {
              if: { $eq: ['$role', 'teacher'] },
              then: { $arrayElemAt: ['$teacherProfile.qualification', 0] },
              else: { $arrayElemAt: ['$studentProfile.parentContact', 0] }
            }
          }
        }
      },

      // 6. Clean up temporary lookups and sort by class and roll chronologically
      { $project: { teacherProfile: 0, studentProfile: 0 } },
      { $sort: { extraField1: 1, rollNumber: 1 } }
    ]);

    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



// @desc    Creation framework for new students or teachers (Admins can create both, Teachers can create students only)
// @route   POST /api/auth/users/create
// @access  Private (Admins & Teachers only)
router.post('/users/create', protect, authorizeRoles('admin', 'teacher'), async (req, res) => {
  const { name, email, password, role, customId, extraField1, extraField2 } = req.body;

  try {
    // 1. Enforce teacher-specific restriction: Teachers can only create students
    if (req.user.role === 'teacher' && role !== 'student') {
      return res.status(403).json({ success: false, message: 'Unauthorized: Teachers are only permitted to register student accounts.' });
    }

    // 2. Core security validation checks
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'An account with this email address already exists.' });
    }

    // 3. Generate the primary authentication document inside the core collection
    const user = await User.create({ name, email, password, role });

    if (role === 'student') {
      // 🟢 FIXED: Safely intercept and force-cast the roll number parameter properties
      const absoluteRollNumber = req.body.rollNumber ? Number(req.body.rollNumber) : 1;

      await Student.create({
        userId: user._id,
        studentId: customId || `STU-${Date.now().toString().slice(-4)}`,
        gradeClass: extraField1 || 'Unassigned',
        parentContact: extraField2 || '',
        guardianName: req.body.guardianName || '',
        rollNumber: absoluteRollNumber // 🟢 EXPLICITLY PASS THE NUMBER HERE
      });



    } else if (role === 'teacher') {
      const absoluteTeacherId = (customId && customId.trim() !== '') ? customId : `TCH-${Date.now().toString().slice(-4)}`;

      await Teacher.create({
        userId: user._id,
        teacherId: absoluteTeacherId,
        department: extraField1 || 'General Education',
        qualification: extraField2 || '',
        classTeacherOf: req.body.classTeacherOf || 'None' // 🟢 Captures class assignment text from admin form
      });
    }


    res.status(201).json({ success: true, message: `Successfully instantiated new ${role} account portal entry!` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// 🟢 NEW: Targeted single user data aggregation resolver
// @route   GET /api/auth/users/:id
// @access  Private (Admins only)
router.get('/users/:id', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const user = await User.aggregate([
      // 1. Immediately pinpoint the user document via index references
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
      { $project: { password: 0 } },
      {
        $lookup: {
          from: 'teachers',
          localField: '_id',
          foreignField: 'userId',
          as: 'teacherProfile'
        }
      },
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: 'userId',
          as: 'studentProfile'
        }
      },
      {
        $addFields: {
          customId: {
            $cond: {
              if: { $eq: ['$role', 'teacher'] },
              then: { $arrayElemAt: ['$teacherProfile.teacherId', 0] },
              else: {
                $cond: {
                  if: { $eq: ['$role', 'student'] },
                  then: { $arrayElemAt: ['$studentProfile.studentId', 0] },
                  else: ""
                }
              }
            }
          },
          extraField1: {
            $cond: {
              if: { $eq: ['$role', 'teacher'] },
              then: { $arrayElemAt: ['$teacherProfile.department', 0] },
              else: { $arrayElemAt: ['$studentProfile.gradeClass', 0] }
            }
          },
          extraField2: {
            $cond: {
              if: { $eq: ['$role', 'teacher'] },
              then: { $arrayElemAt: ['$teacherProfile.qualification', 0] },
              else: { $arrayElemAt: ['$studentProfile.parentContact', 0] }
            }
          }
        }
      },
      { $project: { teacherProfile: 0, studentProfile: 0 } }
    ]);

    if (!user || user.length === 0) {
      return res.status(404).json({ success: false, message: 'Target profile reference dropped.' });
    }

    // Return the individual profile dictionary straight out of the lookup array payload
    res.json({ success: true, data: user[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Private Gateway - Modify user privileges
router.patch('/users/:id/role', protect, authorizeRoles('admin'), async (req, res) => {
  const { role } = req.body;

  if (!['admin', 'teacher', 'student', 'parent'].includes(role)) {
    return res.status(400).json({ success: false, message: 'Invalid role configuration allocation.' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Target user record not found.' });
    }

    user.role = role;
    await user.save();

    res.json({ success: true, message: `User role successfully shifted to ${role}.`, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Allow Admin to delete a teacher from the entire system
// @route   DELETE /api/auth/users/teacher/:id
// @access  Private (Admins only)
router.delete('/users/teacher/:id', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const { password } = req.body;
    const adminUser = await User.findById(req.user.id).select('+password');

    // Match password candidate natively against bcrypt hash strings
    const isMatch = await adminUser.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Security check failed: Password authentication mismatch.' });
    }
    // 1. Remove profile out of the separate teacher sub-collection
    await Teacher.deleteOne({ userId: req.params.id });

    // 2. Clear credentials from base user collection
    await User.deleteOne({ _id: req.params.id });

    res.json({ success: true, message: 'Teacher profile cleanly purged from all cloud layers.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// Private Gateway - Admin override to delegate credentials to separate collections
router.put('/users/:id/credentials', protect, authorizeRoles('admin'), async (req, res) => {
  const { customId, password, extraField1, extraField2 } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Target user record not found.' });
    }

    if (password && password.trim() !== '') {
      user.password = password;
      await user.save();
    }

    if (user.role === 'student') {
      await Student.findOneAndUpdate(
        { userId: user._id },
        {
          userId: user._id,
          studentId: customId,
          gradeClass: extraField1 || 'Unassigned',
          parentContact: extraField2 || ''
        },
        { upsert: true, new: true }
      );
    } else if (user.role === 'teacher') {
      await Teacher.findOneAndUpdate(
        { userId: user._id },
        {
          userId: user._id,
          teacherId: customId,
          department: extraField1 || 'General Education',
          qualification: extraField2 || '',
          classTeacherOf: req.body.classTeacherOf || 'None' // 🟢 Captures class adjustments
        },
        { upsert: true, new: true }
      );
    }


    res.json({ success: true, message: 'Credentials safely isolated across role-specific collections!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
