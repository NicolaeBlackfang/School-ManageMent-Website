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
  requestPasswordReset,
  resetPassword,
  changePassword,
} = require('../controllers/authController');
const { googleAuth } = require('../services/googleAuth');
const { protect, softAuth, authorizeRoles } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');
const User = require('../models/User');

const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Notice = require('../models/Notice');
const Attendance = require('../models/Attendance');
const Gradebook = require('../models/Gradebook');
const Assignment = require('../models/Assignment');
const PasswordResetToken = require('../models/PasswordResetToken');
const { reindexRollsAfterDelete } = require('../utils/rolls');
const { runInTransaction } = require('../utils/transaction');
const { getTeacherScope } = require('../middleware/assignments');

// Public Gateways
router.post('/register', validate(schemas.register), registerUser);
router.post('/google', googleAuth);
router.post('/login', validate(schemas.login), loginUser);
router.post('/forgot-password', validate(schemas.forgotPassword), requestPasswordReset);
router.post('/reset-password', validate(schemas.resetPassword), resetPassword);

// Session bootstrap + lifecycle
router.get('/me', protect, getMe);
router.post('/logout', protect, logoutUser);
router.put('/change-password', protect, validate(schemas.changePassword), async (req, res) => {
  // Students and teachers cannot change their own passwords
  if (req.user.role === 'student' || req.user.role === 'teacher') {
    return res.status(403).json({ success: false, message: 'You cannot change your own password. Contact administrator/class teacher.' });
  }
  return changePassword(req, res);
});

// 2FA (TOTP)
router.post('/2fa/setup', protect, setupTwoFactor);
router.post('/2fa/verify', softAuth, validate(schemas.twoFactorVerify), verifyTwoFactor);
router.post('/2fa/disable', validate(schemas.twoFactorVerify), protect, disableTwoFactor);

// Private Gateway - Handles standard profile updates
router.put('/profile', protect, validate(schemas.profile), async (req, res) => {
  try {
    if (['teacher', 'student'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Teacher and student profiles are view-only. Contact an administrator to make changes.' });
    }
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      // Email changes require a separate verified flow; each role may update its own name/photo.
      if (Object.prototype.hasOwnProperty.call(req.body, 'profileImage')) {
        user.profileImage = req.body.profileImage;
      }

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
  const { name, email, password, role, customId, extraField1, extraField2, profileImage } = req.body;

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
      const scope = await getTeacherScope(req.user.id);
      const requested = extraField1 && scope.classTeacherClasses.includes(extraField1)
        ? extraField1
        : scope.classTeacherClasses[0];
      if (!requested) {
        return res.status(403).json({ success: false, message: 'You are not assigned as a class teacher to any class.' });
      }
      assignedClass = requested;
    }

    // Account + role profile are created atomically so a failure can never leave
    // a User without its Student/Teacher document (or vice versa).
    await runInTransaction(async (session) => {
      const opts = session ? { session } : {};
      const [user] = await User.create(
        [{ name: name.trim(), email: normalizedEmail, password, role, profileImage: profileImage || '' }],
        opts
      );

      if (role === 'student') {
        const absoluteRollNumber = req.body.rollNumber ? Number(req.body.rollNumber) : 1;

        await Student.create(
          [{
            userId: user._id,
            studentId: customId || `STU-${Date.now().toString().slice(-4)}`,
            gradeClass: assignedClass,
            parentContact: extraField2 || '',
            guardianName: req.body.guardianName || '',
            rollNumber: absoluteRollNumber,
          }],
          opts
        );
      } else if (role === 'teacher') {
        const absoluteTeacherId = (customId && customId.trim() !== '') ? customId : `TCH-${Date.now().toString().slice(-4)}`;

        await Teacher.create(
          [{
            userId: user._id,
            teacherId: absoluteTeacherId,
            department: extraField1 || 'General Education',
            qualification: extraField2 || '',
            classTeacherOf: req.body.classTeacherOf || 'None',
          }],
          opts
        );
      }
    });

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

// @desc    Allow Admin to change teacher password
// @route   PUT /api/auth/users/teacher/:id/change-password
// @access  Private (Admins only)
router.put('/users/teacher/:id/change-password', protect, authorizeRoles('admin'), validate(schemas.idParam, 'params'), async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' });
    }
    
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'teacher') {
      return res.status(404).json({ success: false, message: 'Teacher not found.' });
    }
    
    user.password = newPassword;
    user.passwordChangedAt = new Date();
    await user.save();
    
    res.json({ success: true, message: 'Teacher password updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// @desc    Allow Admin to upload teacher profile image
// @route   PUT /api/auth/users/teacher/:id/image
// @access  Private (Admins only)
router.put('/users/teacher/:id/image', protect, authorizeRoles('admin'), validate(schemas.idParam, 'params'), validate(schemas.profilePhoto), async (req, res) => {
  try {
    const { profileImage } = req.body;
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'teacher') {
      return res.status(404).json({ success: false, message: 'Teacher not found.' });
    }
    
    user.profileImage = profileImage || '';
    await user.save();
    
    res.json({ success: true, user: { _id: user._id, profileImage: user.profileImage } });
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

    const targetUser = await User.findById(req.params.id);
    if (!targetUser) {
      return res.status(404).json({ success: false, message: 'Target profile reference dropped.' });
    }

    let message = 'Teacher profile cleanly purged from all cloud layers.';

    await runInTransaction(async (session) => {
      const opts = session ? { session } : {};

      if (targetUser.role === 'student') {
        // Remove the Student profile, grades and attendance rows too, then
        // close the roll-number gap so the class roll stays contiguous.
        const studentQuery = Student.findOne({ userId: targetUser._id });
        if (session) studentQuery.session(session);
        const student = await studentQuery;
        if (student) {
          await Gradebook.deleteMany({ studentId: targetUser._id }, opts);
          await Attendance.updateMany(
            { 'records.studentId': targetUser._id },
            { $pull: { records: { studentId: targetUser._id } } },
            opts
          );
          await Student.deleteOne({ _id: student._id }, opts);
          await reindexRollsAfterDelete(student.gradeClass, student.rollNumber, session);
        }
        await User.deleteOne({ _id: targetUser._id }, opts);
        message = 'Student profile cleanly purged from all cloud layers.';
      } else {
        // Remove teaching assignments and reset class-teacher ownership.
        await Assignment.deleteMany({ teacher: targetUser._id }, opts);
        await Teacher.deleteOne({ userId: targetUser._id }, opts);
        await User.deleteOne({ _id: targetUser._id }, opts);
      }

      await PasswordResetToken.deleteMany({ user: targetUser._id }, opts);
    });

    res.json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// Private Gateway - Admin override to delegate credentials to separate collections
router.put('/users/:id/credentials', protect, authorizeRoles('admin'), validate(schemas.idParam, 'params'), validate(schemas.updateCredentials), async (req, res) => {
  const { customId, password, extraField1, extraField2, profileImage } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Target user record not found.' });
    }

    if (password && password.trim() !== '') {
      user.password = password;
    }
    if (Object.prototype.hasOwnProperty.call(req.body, 'profileImage')) user.profileImage = profileImage;
    if (password || Object.prototype.hasOwnProperty.call(req.body, 'profileImage')) await user.save();

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
