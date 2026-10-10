// backend/middleware/assignments.js
// Assignment-based authorization for teacher scopes.
// Runs AFTER auth.js `protect`. Admins bypass; teachers must hold a matching
// Assignment row (subject+class for grading, class-teacher for class-level tools).
const Assignment = require('../models/Assignment');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

// Normalize a subject value; blank strings become null (class-teacher rows).
const normalizeSubject = (value) => {
  if (value === undefined || value === null) return null;
  const trimmed = String(value).trim();
  return trimmed === '' ? null : trimmed;
};

// Default extractors: gradebook routes carry the subject/class in either the
// body (POST) or the params (GET).
const defaultSubjectExtractor = (req) => req.body?.subject ?? req.params?.subjectName ?? null;
const defaultClassExtractor = (req) => req.body?.classId ?? req.params?.classId ?? null;

// Resolve a teacher's full scope: subject assignments plus the classes they are
// a designated class-teacher of. Legacy `Teacher.classTeacherOf` is kept as a
// fallback so existing data keeps working.
const getTeacherScope = async (userId) => {
  const [assignments, teacherProfile] = await Promise.all([
    Assignment.find({ teacher: userId }).sort({ class: 1, subject: 1 }).lean(),
    Teacher.findOne({ userId }).lean(),
  ]);

  const legacyClass = teacherProfile?.classTeacherOf && teacherProfile.classTeacherOf !== 'None'
    ? teacherProfile.classTeacherOf
    : null;

  const assignedClassTeacherClasses = assignments.filter((a) => a.isClassTeacher).map((a) => a.class);
  const classTeacherClasses = [...new Set([...assignedClassTeacherClasses, ...(legacyClass ? [legacyClass] : [])])];
  const subjectPairs = assignments
    .filter((a) => a.subject)
    .map((a) => ({ class: a.class, subject: a.subject }));
  const classes = [...new Set([...assignments.map((a) => a.class), ...classTeacherClasses])];

  return {
    assignments,
    classTeacherOf: legacyClass,
    classTeacherClasses,
    subjectPairs,
    classes,
  };
};

// Admins may access any class; a teacher may access any class they are a
// designated class-teacher of (Assignment, or the legacy field).
const canAccessClass = async (user, classId) => {
  if (!user) return false;
  if (user.role === 'admin') return true;
  if (user.role !== 'teacher') return false;
  const scope = await getTeacherScope(user.id);
  return scope.classTeacherClasses.includes(classId);
};

// Middleware factory: verifies the logged-in teacher holds a matching assignment.
//   subject/class: extractors (default: body then params)
//   requireSubject: when false, only class-teacher scope is required (no subject).
const requireAssignment = (options = {}) => {
  const {
    subject: subjectExtractor = defaultSubjectExtractor,
    class: classExtractor = defaultClassExtractor,
    requireSubject = true,
  } = options;

  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authorized, no session found' });
      }
      if (req.user.role === 'admin') return next();
      if (req.user.role !== 'teacher') {
        return res.status(403).json({ success: false, message: 'Access Denied: teacher scope required.' });
      }

      const className = classExtractor(req);
      if (!className || String(className).trim() === '') {
        return res.status(400).json({ success: false, message: 'Access Denied: a target class is required.' });
      }

      if (!requireSubject) {
        if (!(await canAccessClass(req.user, className))) {
          return res.status(403).json({ success: false, message: 'Access Denied: class outside your scope.' });
        }
        return next();
      }

      const subject = normalizeSubject(subjectExtractor(req));
      if (!subject) {
        return res.status(400).json({ success: false, message: 'Access Denied: a target subject is required.' });
      }

      const assignment = await Assignment.findOne({ teacher: req.user.id, class: className, subject }).lean();
      if (!assignment) {
        return res.status(403).json({ success: false, message: 'Access Denied: no matching subject/class assignment.' });
      }

      req.assignment = assignment;
      return next();
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Request failed.' });
    }
  };
};

// Returns the subset of `studentIds` that do NOT belong to `classId`.
// Prevents cross-class grade rows from being written.
const findOutOfClassStudents = async (classId, studentIds) => {
  const unique = [...new Set((studentIds || []).map(String))];
  if (unique.length === 0) return [];
  const enrolled = await Student.find({ userId: { $in: unique }, gradeClass: classId }).select('userId').lean();
  const enrolledIds = new Set(enrolled.map((s) => String(s.userId)));
  return unique.filter((id) => !enrolledIds.has(id));
};

module.exports = {
  requireAssignment,
  getTeacherScope,
  canAccessClass,
  findOutOfClassStudents,
  normalizeSubject,
};
