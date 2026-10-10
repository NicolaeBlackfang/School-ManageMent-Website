// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  setupTwoFactor,
  verifyTwoFactor,
  disableTwoFactor,
} = require('../controllers/authController');
const { protect, softAuth, authorizeRoles } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');
const User = require('../models/User');

const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Notice = require('../models/Notice');

// Public Gateways
router.post('/register', validate(schemas.register), registerUser);
router.post('/login', validate(schemas.login), loginUser);

// Session bootstrap + lifecycle
router.get('/me', protect, getMe);
router.post('/logout', protect, logoutUser);

// 2FA (TOTP)
router.post('/2fa/setup', protect, setupTwoFactor);
router.post('/2fa/verify', softAuth, validate(schemas.twoFactorVerify), verifyTwoFactor);
router.post('/2fa/disable', validate(schemas.twoFactorVerify), protect, disableTwoFactor);

// Private Gateway - Handles standard profile updates
router.put('/profile', protect, validate(schemas.profile), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.profileImage = req.body.profileImage || user.profileImage;

      const updatedUser = await user.save();

      res.json({
        success: true,
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          profileImage: updatedUser.profileImage,
          twoFactorEnabled: Boolean(updatedUser.twoFactorEnabled),
        },
      });
    } else {
      res.status(404).json({ success: false, message: 'User context reference dropped.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// @desc    Fetch automated live statistics counters for Admin Dashboard indicators
// @route   GET /api/auth/dashboard-stats
// @access  Private (Admins only)
router.get('/dashboard-stats', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const [studentCount, teacherCount, noticeCount] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'teacher' }),
      Notice ? Notice.countDocuments({}) : Promise.resolve(0),
    ]);

    const pendingTasksCount = await Student.countDocuments({
      $or: [{ gradeClass: 'Unassigned' }, { rollNumber: { $exists: false } }],
    });

    res.json({
      success: true,
      stats: {
        registeredStudents: studentCount,
        activeTeachers: teacherCount,
        noticesPublished: noticeCount,
        pendingTasks: pendingTasksCount,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

router.get('/users', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const { role, search } = req.query;

    let matchQuery = {};

    if (role) {
      matchQuery.role = role;
    }

    if (search) {
      const safeSearch = String(search).slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      matchQuery.$or = [
        { name: { $regex: safeSearch, $options: 'i' } },
        { email: { $regex: safeSearch, $options: 'i' } },
      ];
    }

    const users = await User.aggregate([
      { $match: matchQuery },
      { $project: { password: 0 } },
      {
        $lookup: {
          from: 'teachers',
          localField: '_id',
          foreignField: 'userId',
          as: 'teacherProfile',
        },
      },
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: 'userId',
          as: 'studentProfile',
        },
      },
      {
        $addFields: {
          customId: {
            $cond: {
              if: { $eq: ['$role', 'teacher'] },
              then: { $arrayElemAt: ['$teacherProfile.teacherId', 0] },
              else: "",
            },
          },
          rollNumber: {
            $cond: {
              if: { $eq: ['$role', 'student'] },
              then: { $arrayElemAt: ['$studentProfile.rollNumber', 0] },
              else: null,
            },
          },
          classTeacherOf: {
            $cond: {
              if: { $eq: ['$role', 'teacher'] },
              then: { $arrayElemAt: ['$teacherProfile.classTeacherOf', 0] },
              else: 'None',
            },
          },
          extraField1: {
            $cond: {
              if: { $eq: ['$role', 'teacher'] },
              then: { $arrayElemAt: ['$teacherProfile.department', 0] },
              else: { $arrayElemAt: ['$studentProfile.gradeClass', 0] },
            },
          },
          extraField2: {
            $cond: {
              if: { $eq: ['$role', 'teacher'] },
              then: { $arrayElemAt: ['$teacherProfile.qualification', 0] },
              else: { $arrayElemAt: ['$studentProfile.parentContact', 0] },
            },
          },
        },
      },
      { $project: { password: 0, teacherProfile: 0, studentProfile: 0 } },
      { $sort: { extraField1: 1, rollNumber: 1 } },
    ]);

    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// @desc    Creation framework for new students or teachers (Admins can create both, Teachers can create students only)
// @route   POST /api/auth/users/create
// @access  Private (Admins & Teachers only)
router.post('/users/create', protect, authorizeRoles('admin', 'teacher'), validate(schemas.createUser), async (req, res) => {
  const { name, email, password, role, customId, extraField1, extraField2 } = req.body;

  try {
    if (req.user.role === 'teacher' && role !== 'student') {
      return res.status(403).json({ success: false, message: 'Unauthorized: Teachers are only permitted to register student accounts.' });
    }

    if (!['admin', 'teacher', 'student', 'parent'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role configuration.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'An account with this email address already exists.' });
    }

    let assignedClass = extraField1 || 'Unassigned';
    if (req.user.role === 'teacher') {
      const teacherProfile = await Teacher.findOne({ userId: req.user.id }).lean();
      if (!teacherProfile || teacherProfile.classTeacherOf === 'None') {
        return res.status(403).json({ success: false, message: 'You are not assigned as a class teacher to any class.' });
      }
      assignedClass = teacherProfile.classTeacherOf;
    }

    const user = await User.create({ name: name.trim(), email: normalizedEmail, password, role });

    if (role === 'student') {
      const absoluteRollNumber = req.body.rollNumber ? Number(req.body.rollNumber) : 1;

      await Student.create({
        userId: user._id,
        studentId: customId || `STU-${Date.now().toString().slice(-4)}`,
        gradeClass: assignedClass,
        parentContact: extraField2 || '',
        guardianName: req.body.guardianName || '',
        rollNumber: absoluteRollNumber,
      });
    } else if (role === 'teacher') {
      const absoluteTeacherId = (customId && customId.trim() !== '') ? customId : `TCH-${Date.now().toString().slice(-4)}`;

      await Teacher.create({
        userId: user._id,
        teacherId: absoluteTeacherId,
        department: extraField1 || 'General Education',
        qualification: extraField2 || '',
        classTeacherOf: req.body.classTeacherOf || 'None',
      });
    }

    res.status(201).json({ success: true, message: `Successfully instantiated new ${role} account portal entry!` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// Targeted single user data aggregation resolver
router.get('/users/:id', protect, authorizeRoles('admin'), validate(schemas.idParam, 'params'), async (req, res) => {
  try {
    const user = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
      { $project: { password: 0 } },
      {
        $lookup: {
          from: 'teachers',
          localField: '_id',
          foreignField: 'userId',
          as: 'teacherProfile',
        },
      },
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: 'userId',
          as: 'studentProfile',
        },
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
                  else: "",
                },
              },
            },
          },
          extraField1: {
            $cond: {
              if: { $eq: ['$role', 'teacher'] },
              then: { $arrayElemAt: ['$teacherProfile.department', 0] },
              else: { $arrayElemAt: ['$studentProfile.gradeClass', 0] },
            },
          },
          extraField2: {
            $cond: {
              if: { $eq: ['$role', 'teacher'] },
              then: { $arrayElemAt: ['$teacherProfile.qualification', 0] },
              else: { $arrayElemAt: ['$studentProfile.parentContact', 0] },
            },
          },
          twoFactorEnabled: '$twoFactorEnabled',
        },
      },
      { $project: { password: 0, twoFactorSecret: 0, teacherProfile: 0, studentProfile: 0 } },
    ]);

    if (!user || user.length === 0) {
      return res.status(404).json({ success: false, message: 'Target profile reference dropped.' });
    }

    res.json({ success: true, data: user[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// Private Gateway - Modify user privileges
router.patch('/users/:id/role', protect, authorizeRoles('admin'), validate(schemas.idParam, 'params'), validate(schemas.changeRole), async (req, res) => {
  const { role } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Target user record not found.' });
    }

    user.role = role;
    await user.save();

    // Never serialize the password hash back to the client.
    const safeUser = { _id: user._id, name: user.name, email: user.email, role: user.role };

    res.json({ success: true, message: `User role successfully shifted to ${role}.`, data: safeUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// @desc    Allow Admin to delete a teacher from the entire system
// @route   DELETE /api/auth/users/teacher/:id
// @access  Private (Admins only)
router.delete('/users/teacher/:id', protect, authorizeRoles('admin'), validate(schemas.idParam, 'params'), validate(schemas.deleteGuard), async (req, res) => {
  try {
    const { password } = req.body;
    const adminUser = await User.findById(req.user.id).select('+password');

    const isMatch = password && (await adminUser.matchPassword(password));
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Security check failed: Password authentication mismatch.' });
    }

    await Teacher.deleteOne({ userId: req.params.id });
    await User.deleteOne({ _id: req.params.id });

    res.json({ success: true, message: 'Teacher profile cleanly purged from all cloud layers.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// Private Gateway - Admin override to delegate credentials to separate collections
router.put('/users/:id/credentials', protect, authorizeRoles('admin'), validate(schemas.idParam, 'params'), validate(schemas.updateCredentials), async (req, res) => {
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
          parentContact: extraField2 || '',
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
          classTeacherOf: req.body.classTeacherOf || 'None',
        },
        { upsert: true, new: true }
      );
    }

    res.json({ success: true, message: 'Credentials safely isolated across role-specific collections!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

module.exports = router;