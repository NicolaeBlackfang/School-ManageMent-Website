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

const profileImage = z.string().max(1_900_000).optional().or(z.literal('')).refine((value) => {
  if (!value) return true;
  if (/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value)) return true;
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
}, 'Profile photo must be a supported image.');

const schemas = {
  // Auth ----------------------------------------------------------------------
  register: z.object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email().toLowerCase(),
    password: z.string().min(8).max(128),
  }),
  otpSend: z.object({
    email: z.string().trim().email().toLowerCase(),
    purpose: z.enum(['register', 'password_reset']).optional(),
  }),
  otpVerify: z.object({
    email: z.string().trim().email().toLowerCase(),
    otp: z.string().regex(/^\d{6}$/),
    purpose: z.enum(['register', 'password_reset']).optional(),
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
    profileImage,
  }),
  profilePhoto: z.object({ profileImage }),

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
    profileImage,
  }),
  updateCredentials: z.object({
    customId: z.string().trim().max(40).optional().or(z.literal('')),
    password: z.string().min(8).max(128).optional().or(z.literal('')),
    extraField1: z.string().trim().max(80).optional().or(z.literal('')),
    extraField2: z.string().trim().max(120).optional().or(z.literal('')),
    classTeacherOf: z.string().trim().max(80).optional().or(z.literal('None')),
    profileImage,
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
    profileImage,
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
    admissionsOpen: z.boolean().optional(),
  }),
  toggleOffDay: z.object({ dayIndex: z.coerce.number().int().min(0).max(6) }),
  toggleHoliday: z.object({ dateStr: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/) }),

  // Public website ---------------------------------------------------------------------
  infoUpdate: z.object({
    schoolName: z.string().trim().max(120).optional(),
    tagline: z.string().trim().max(200).optional(),
    welcomeTitle: z.string().trim().max(200).optional(),
    aboutText: z.string().trim().max(4000).optional(),
    mission: z.string().trim().max(4000).optional(),
    vision: z.string().trim().max(4000).optional(),
    address: z.string().trim().max(300).optional(),
    phone: z.string().trim().max(60).optional(),
    email: z.string().trim().max(120).optional(),
    facebook: z.string().trim().max(300).optional(),
    youtube: z.string().trim().max(300).optional(),
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
