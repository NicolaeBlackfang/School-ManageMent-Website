// backend/routes/assignmentRoutes.js
// Admin management + teacher self-scope endpoints for the Assignment system.
const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');
const { getTeacherScope, normalizeSubject } = require('../middleware/assignments');
const Assignment = require('../models/Assignment');
const SchoolConfig = require('../models/SchoolConfig');
const Student = require('../models/Student');
const User = require('../models/User');

const isDuplicateKey = (error) => error && error.code === 11000;

// Derive a default academic year label ("2025-2026") from the configured session start.
const computeAcademicYear = async () => {
  const config = await SchoolConfig.findOne().lean();
  const start = config?.sessionStartDate ? new Date(config.sessionStartDate) : new Date();
  const year = Number.isNaN(start.getFullYear()) ? new Date().getFullYear() : start.getFullYear();
  return `${year}-${year + 1}`;
};

// @desc    Create a new assignment
// @route   POST /api/admin/assignments
// @access  Private (Admins only)
router.post('/admin/assignments', protect, authorizeRoles('admin'), validate(schemas.assignmentCreate), async (req, res) => {
  const { teacher, class: className, subject, academicYear, isClassTeacher } = req.body;

  try {
    const teacherUser = await User.findById(teacher);
    if (!teacherUser || teacherUser.role !== 'teacher') {
      return res.status(400).json({ success: false, message: 'Selected user is not a registered teacher.' });
    }

    const normalizedSubject = normalizeSubject(subject);
    const year = academicYear && academicYear.trim() !== '' ? academicYear.trim() : await computeAcademicYear();

    const assignment = await Assignment.create({
      teacher,
      class: className,
      subject: normalizedSubject,
      academicYear: year,
      isClassTeacher: Boolean(isClassTeacher),
      createdBy: req.user.id,
    });

    res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    if (isDuplicateKey(error)) {
      return res.status(400).json({ success: false, message: 'This assignment already exists for that teacher, subject, class and year.' });
    }
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// @desc    List assignments with optional filters
// @route   GET /api/admin/assignments
// @access  Private (Admins only)
router.get('/admin/assignments', protect, authorizeRoles('admin'), validate(schemas.assignmentQuery, 'query'), async (req, res) => {
  const { teacher, class: className, subject, academicYear } = req.query;

  try {
    const match = {};
    if (teacher) match.teacher = teacher;
    if (className) match.class = className;
    if (subject) match.subject = subject;
    if (academicYear) match.academicYear = academicYear;

    const assignments = await Assignment.find(match)
      .populate('teacher', 'name email role')
      .sort({ class: 1, subject: 1 })
      .lean();

    res.json({ success: true, data: assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// @desc    Update an assignment (toggle class teacher, change subject/year)
// @route   PATCH /api/admin/assignments/:id
// @access  Private (Admins only)
router.patch('/admin/assignments/:id', protect, authorizeRoles('admin'), validate(schemas.idParam, 'params'), validate(schemas.assignmentUpdate), async (req, res) => {
  const { subject, academicYear, isClassTeacher } = req.body;

  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment reference dropped.' });
    }

    if (subject !== undefined) assignment.subject = normalizeSubject(subject);
    if (academicYear !== undefined) assignment.academicYear = academicYear.trim();
    if (isClassTeacher !== undefined) assignment.isClassTeacher = Boolean(isClassTeacher);

    await assignment.save();
    res.json({ success: true, data: assignment });
  } catch (error) {
    if (isDuplicateKey(error)) {
      return res.status(400).json({ success: false, message: 'Another assignment already exists for that teacher, subject, class and year.' });
    }
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// @desc    Delete an assignment
// @route   DELETE /api/admin/assignments/:id
// @access  Private (Admins only)
router.delete('/admin/assignments/:id', protect, authorizeRoles('admin'), validate(schemas.idParam, 'params'), async (req, res) => {
  try {
    const removed = await Assignment.findByIdAndDelete(req.params.id);
    if (!removed) {
      return res.status(404).json({ success: false, message: 'Assignment reference dropped.' });
    }
    res.json({ success: true, message: 'Assignment removed successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// @desc    The logged-in teacher's own assignments
// @route   GET /api/teacher/my-assignments
// @access  Private (Teachers only)
router.get('/teacher/my-assignments', protect, authorizeRoles('teacher'), async (req, res) => {
  try {
    const scope = await getTeacherScope(req.user.id);
    res.json({ success: true, data: scope.assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// @desc    The full teaching scope (classes, subjects, students) for the logged-in teacher
// @route   GET /api/teacher/my-scope
// @access  Private (Teachers only)
router.get('/teacher/my-scope', protect, authorizeRoles('teacher'), async (req, res) => {
  try {
    const scope = await getTeacherScope(req.user.id);

    const memberships = await Student.find({ gradeClass: { $in: scope.classes } })
      .populate('userId', 'name email profileImage')
      .sort({ gradeClass: 1, rollNumber: 1 })
      .lean();

    const studentsByClass = {};
    memberships.forEach((student) => {
      if (!studentsByClass[student.gradeClass]) studentsByClass[student.gradeClass] = [];
      studentsByClass[student.gradeClass].push({
        _id: student.userId?._id || student._id,
        studentCollectionId: student._id,
        studentId: student.studentId,
        name: student.userId?.name || 'Unknown Student',
        email: student.userId?.email || '',
        profileImage: student.userId?.profileImage || '',
        rollNumber: student.rollNumber || 'N/A',
        gradeClass: student.gradeClass,
        parentContact: student.parentContact || 'Not Provided',
      });
    });

    const subjects = [...new Set(scope.subjectPairs.map((pair) => pair.subject))];

    res.json({
      success: true,
      data: {
        classTeacherOf: scope.classTeacherOf,
        classTeacherClasses: scope.classTeacherClasses,
        classes: scope.classes,
        subjectPairs: scope.subjectPairs,
        subjects,
        assignments: scope.assignments,
        studentsByClass,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

module.exports = router;
