// middleware/validate.js
const { z } = require('zod');

// Generic middleware factory: validates a request source against a Zod schema.
// Strips unknown keys (prevents mass-assignment) and returns a GENERIC 400 on
// failure so no schema internals are leaked.
const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    try {
      const data = req[source];
      req[source] = schema.parse(data === undefined ? {} : data);
      next();
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Invalid request payload.' });
    }
  };
};

const schemas = {
  // Auth ----------------------------------------------------------------------
  register: z.object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email().toLowerCase(),
    password: z.string().min(8).max(128),
  }),
  login: z.object({
    email: z.string().trim().email().toLowerCase(),
    password: z.string().min(1).max(128),
  }),
  forgotPassword: z.object({
    email: z.string().trim().email().toLowerCase(),
  }),
  resetPassword: z.object({
    token: z.string().trim().min(32).max(128),
    password: z.string().min(8).max(128),
  }),
  changePassword: z.object({
    currentPassword: z.string().min(1).max(128),
    newPassword: z.string().min(8).max(128),
  }),
  profile: z.object({
    name: z.string().trim().min(2).max(80).optional(),
    email: z.string().trim().email().toLowerCase().optional(),
    // Avatars are stored as base64 data URLs. The client caps uploads at 1MB
    // (~1.4M base64 chars); allow headroom while staying under the 2mb body limit.
    profileImage: z.string().max(2_000_000).optional(),
  }),

  // User management ------------------------------------------------------------
  createUser: z.object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email().toLowerCase(),
    password: z.string().min(8).max(128),
    role: z.enum(['admin', 'teacher', 'student', 'parent']),
    customId: z.string().trim().max(40).optional().or(z.literal('')),
    extraField1: z.string().trim().max(80).optional().or(z.literal('')),
    extraField2: z.string().trim().max(120).optional().or(z.literal('')),
    rollNumber: z.number().int().min(1).max(500).optional(),
    guardianName: z.string().trim().max(80).optional().or(z.literal('')),
    classTeacherOf: z.string().trim().max(80).optional().or(z.literal('None')),
  }),
  updateCredentials: z.object({
    customId: z.string().trim().max(40).optional().or(z.literal('')),
    password: z.string().min(8).max(128).optional().or(z.literal('')),
    extraField1: z.string().trim().max(80).optional().or(z.literal('')),
    extraField2: z.string().trim().max(120).optional().or(z.literal('')),
    classTeacherOf: z.string().trim().max(80).optional().or(z.literal('None')),
  }),
  changeRole: z.object({ role: z.enum(['admin', 'teacher', 'student', 'parent']) }),
  deleteGuard: z.object({ password: z.string().min(1).max(128) }),

  // Notices ---------------------------------------------------------------------
  createNotice: z.object({
    title: z.string().trim().min(3).max(160),
    content: z.string().trim().min(3).max(5000),
    targetAudience: z.enum(['all', 'student', 'teacher']),
  }),
  passwordCheck: z.object({ password: z.string().min(1).max(128) }),
  idParam: z.object({ id: z.string().regex(/^[0-9a-fA-F]{24}$/) }),

  // Attendance ------------------------------------------------------------------
  submitAttendance: z.object({
    classId: z.string().trim().max(80),
    date: z.string().min(8).max(20),
    records: z.array(z.object({
      studentId: z.string().regex(/^[0-9a-fA-F]{24}$/),
      status: z.enum(['Present', 'Absent', 'Late']),
    })).max(2000),
  }),
  teacherSubmitAttendance: z.object({
    classId: z.string().trim().max(80).optional().or(z.literal('')),
    date: z.string().min(8).max(20),
    records: z.array(z.object({
      studentId: z.string().regex(/^[0-9a-fA-F]{24}$/),
      status: z.enum(['Present', 'Absent', 'Late']),
    })).max(2000),
  }),
  classParam: z.object({ classId: z.string().trim().min(1).max(80) }),
  heatmapQuery: z.object({
    year: z.coerce.number().int().min(2000).max(2100).optional(),
    month: z.coerce.number().int().min(1).max(12).optional(),
  }),
  byDateQuery: z.object({ date: z.string().min(8).max(20) }),

  // Teacher student management -----------------------------------------------------
  teacherEditStudent: z.object({
    gradeClass: z.string().trim().max(80).optional(),
    parentContact: z.string().trim().max(60).optional(),
    name: z.string().trim().min(2).max(80).optional(),
    email: z.string().trim().email().toLowerCase().optional(),
    rollNumber: z.coerce.number().int().min(1).max(500).optional(),
  }),

  // Gradebook ----------------------------------------------------------------------
  spreadsheetParams: z.object({
    classId: z.string().trim().min(1).max(80),
    subjectName: z.string().trim().min(1).max(80),
    termName: z.string().trim().min(1).max(80),
  }),
  bulkSubmit: z.object({
    classId: z.string().trim().max(80),
    subject: z.string().trim().min(1).max(80),
    term: z.string().trim().min(1).max(80),
    scores: z.array(z.object({
      studentId: z.string().regex(/^[0-9a-fA-F]{24}$/),
      marksObtained: z.coerce.number().min(0).max(100),
    })).max(2000),
  }),
  togglePublish: z.object({
    classId: z.string().trim().max(80),
    term: z.string().trim().min(1).max(80),
    publishState: z.boolean(),
  }),

  // Assignments ---------------------------------------------------------------------
  assignmentCreate: z.object({
    teacher: z.string().regex(/^[0-9a-fA-F]{24}$/),
    class: z.string().trim().min(1).max(80),
    subject: z.string().trim().max(80).optional().or(z.literal('')),
    academicYear: z.string().trim().max(20).optional().or(z.literal('')),
    isClassTeacher: z.boolean().optional(),
  }),
  assignmentUpdate: z.object({
    subject: z.string().trim().max(80).optional().or(z.literal('')),
    academicYear: z.string().trim().max(20).optional().or(z.literal('')),
    isClassTeacher: z.boolean().optional(),
  }),
  assignmentQuery: z.object({
    teacher: z.string().regex(/^[0-9a-fA-F]{24}$/).optional().or(z.literal('')),
    class: z.string().trim().max(80).optional().or(z.literal('')),
    subject: z.string().trim().max(80).optional().or(z.literal('')),
    academicYear: z.string().trim().max(20).optional().or(z.literal('')),
  }),

  // School config ---------------------------------------------------------------------
  configUpdate: z.object({
    classes: z.array(z.string().trim().min(1).max(80)).max(200).optional(),
    subjects: z.array(z.string().trim().min(1).max(80)).max(200).optional(),
    examTerms: z.array(z.string().trim().min(1).max(80)).max(200).optional(),
  }),
  toggleOffDay: z.object({ dayIndex: z.coerce.number().int().min(0).max(6) }),
  toggleHoliday: z.object({ dateStr: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/) }),

  // Public website ---------------------------------------------------------------------
  infoUpdate: z.object({
    welcomeTitle: z.string().trim().max(200).optional(),
    aboutText: z.string().trim().max(4000).optional(),
    admissionFeeAmount: z.coerce.number().min(0).max(1000000).optional(),
  }),
  founderAdd: z.object({
    name: z.string().trim().min(2).max(80),
    designation: z.string().trim().min(2).max(120),
    quote: z.string().trim().min(2).max(1000),
  }),
  founderIdParam: z.object({ founderId: z.string().regex(/^[0-9a-fA-F]{24}$/) }),

  // Admissions -------------------------------------------------------------------------
  admissionApply: z.object({
    studentNameEn: z.string().trim().min(2).max(80),
    studentNameBn: z.string().trim().min(2).max(120),
    targetClass: z.string().trim().min(1).max(80),
    dateOfBirth: z.string().min(8).max(20),
    birthCertificateNo: z.string().trim().min(4).max(40),
    emailAddress: z.string().trim().email().toLowerCase(),
    fatherNameEn: z.string().trim().min(2).max(80),
    fatherNameBn: z.string().trim().min(2).max(120),
    fatherNid: z.string().trim().max(40).optional().or(z.literal('')),
    motherNameEn: z.string().trim().min(2).max(80),
    motherNameBn: z.string().trim().min(2).max(120),
    motherNid: z.string().trim().max(40).optional().or(z.literal('')),
    parentPhone: z.string().trim().min(8).max(20),
    guardianNameEn: z.string().trim().max(80).optional().or(z.literal('')),
    guardianNameBn: z.string().trim().max(120).optional().or(z.literal('')),
    guardianPhone: z.string().trim().max(20).optional().or(z.literal('')),
  }),
  payAdmission: z.object({
    paymentMethod: z.string().trim().max(32).optional(),
    txnId: z.string().trim().min(4).max(64),
  }),
  appIdParam: z.object({ appId: z.string().regex(/^[0-9a-fA-F]{24}$/) }),
  applicationPatch: z.object({
    status: z.enum(['Pending', 'Approved', 'Rejected']).optional(),
    // Admins may waive a fee but may NOT mark an application "Paid" directly —
    // payments must pass through the server-side payment adapter so the amount
    // and transaction reference are always server-verified.
    paymentStatus: z.enum(['Unpaid', 'Waived']).optional(),
  }),

  // 2FA ----------------------------------------------------------------------------------
  twoFactorVerify: z.object({ code: z.string().trim().regex(/^\d{6}$/) }),
};

module.exports = { validate, schemas };