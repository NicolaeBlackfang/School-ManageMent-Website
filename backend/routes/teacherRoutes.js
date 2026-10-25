// backend/routes/teacherRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');
const { canAccessClass, getTeacherScope } = require('../middleware/assignments');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const User = require('../models/User');
const Attendance = require('../models/Attendance');
const Gradebook = require('../models/Gradebook');
const SchoolConfig = require('../models/SchoolConfig');
const { reindexRollsAfterDelete } = require('../utils/rolls');
const { runInTransaction } = require('../utils/transaction');

// @desc    Get the logged-in teacher's assigned class and student roster
// @route   GET /api/teacher/my-class
// @access  Private (Teachers only)
router.get('/my-class', protect, authorizeRoles('teacher'), async (req, res) => {
    try {
        const scope = await getTeacherScope(req.user.id);
        const targetClass = req.query.classId || scope.classTeacherOf || scope.classTeacherClasses[0];

        if (!targetClass) {
            return res.status(400).json({ success: false, message: 'You are not assigned as a Class Teacher to any active class.' });
        }
        if (!scope.classTeacherClasses.includes(targetClass)) {
            return res.status(403).json({ success: false, message: 'Access Denied: class outside your scope.' });
        }

        const teacherProfile = await Teacher.findOne({ userId: req.user.id }).lean();

        // 2. Fetch all students whose gradeClass matches, sorted chronologically by roll numbers
        const studentsInClass = await Student.find({ gradeClass: targetClass })
            .populate('userId', 'name email profileImage')
            .sort({ rollNumber: 1 }) // 🟢 Sorts list from Roll 1 onwards immediately
            .lean();

        // 3. Format the data into a clean structure for the frontend roster
        const formattedRoster = studentsInClass.map(student => ({
            _id: student.userId?._id || student._id,
            studentCollectionId: student._id,
            studentId: student.studentId,
            rollNumber: student.rollNumber || 'N/A', // 🟢 Pass the live sequential roll number here
            name: student.userId?.name || 'Unknown Student',
            email: student.userId?.email || '',
            profileImage: student.userId?.profileImage || '',
            gradeClass: student.gradeClass,
            parentContact: student.parentContact || 'Not Provided'
        }));


        res.json({
            success: true,
            classTeacherOf: targetClass,
            classTeacherClasses: scope.classTeacherClasses,
            department: teacherProfile?.department,
            qualification: teacherProfile?.qualification,
            roster: formattedRoster
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Request failed.' });
    }
});

// @desc    Submit or overwrite daily attendance for the teacher's class
// @route   POST /api/teacher/attendance
// @access  Private (Teachers only)
router.post('/attendance', protect, authorizeRoles('teacher'), validate(schemas.teacherSubmitAttendance), async (req, res) => {
    const { date, records, classId } = req.body;

    try {
        const scope = await getTeacherScope(req.user.id);
        const targetClass = classId || scope.classTeacherOf || scope.classTeacherClasses[0];
        if (!targetClass) {
            return res.status(403).json({ success: false, message: 'Unauthorized profile clearance.' });
        }
        if (!(await canAccessClass(req.user, targetClass))) {
            return res.status(403).json({ success: false, message: 'Access Denied: class outside your scope.' });
        }

        const cleanDate = new Date(date).setHours(0, 0, 0, 0);

        const attendance = await Attendance.findOneAndUpdate(
            { classId: targetClass, date: cleanDate },
            {
                classId: targetClass,
                date: cleanDate,
                records,
                submittedBy: req.user.id
            },
            { new: true, upsert: true }
        );

        res.status(201).json({ success: true, data: attendance });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Request failed.' });
    }
});

// @desc    Fetch submission heatmaps and session statuses for a specific month
// @route   GET /api/teacher/attendance-calendar-heatmap/:classId
router.get('/attendance-calendar-heatmap/:classId', protect, authorizeRoles('teacher', 'admin'), validate(schemas.classParam, 'params'), validate(schemas.heatmapQuery, 'query'), async (req, res) => {
    const { classId } = req.params;
    const { year, month } = req.query;

    try {
        // 0. ⚠️ Authorization: verify the caller owns this class (admins bypass)
        if (!(await canAccessClass(req.user, classId))) {
            return res.status(403).json({ success: false, message: 'Access Denied: class outside your scope.' });
        }

        // 1. Fetch config document as raw lean object, fallback safely if uninitialized
        const schoolConfig = await SchoolConfig.findOne().lean() || {};

        // Provide strict array fallbacks representing Friday & Saturday off
        const weeklyOffDays = schoolConfig.weeklyOffDays || [5, 6];
        const holidays = schoolConfig.holidays || [];
        const sessionStartDate = schoolConfig.sessionStartDate || new Date(new Date().getFullYear(), 0, 1);

        // 2. Parse the dynamic dates coming from the frontend params safely
        const parsedYear = parseInt(year) || new Date().getFullYear();
        const parsedMonth = parseInt(month) || (new Date().getMonth() + 1);

        const startDate = new Date(parsedYear, parsedMonth - 1, 1);
        const endDate = new Date(parsedYear, parsedMonth, 0, 23, 59, 59, 999);

        // 3. Query all attendance sheets submitted for this class room target zone
        const submittedSheets = await Attendance.find({
            classId: classId,
            date: { $gte: startDate, $lte: endDate }
        }).select('date').lean();

        // 4. Safely convert native Date objects into clean "YYYY-MM-DD" string formats
        const submittedDates = submittedSheets.map(sheet => {
            if (!sheet.date) return null;
            const d = new Date(sheet.date);
            const padDay = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
            const padMonth = (d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
            return `${d.getFullYear()}-${padMonth}-${padDay}`;
        }).filter(Boolean); // Cleans out any potential null values safely

        res.json({
            success: true,
            submittedDates, // Sends clean string array: ["2026-09-10", "2026-09-11"]
            weeklyOffDays,
            holidays,
            sessionStart: sessionStartDate
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Request failed.' });
    }
});



// @desc    Get existing attendance data records for a specific date
// @route   GET /api/teacher/attendance-by-date/:classId
router.get('/attendance-by-date/:classId', protect, authorizeRoles('teacher', 'admin'), validate(schemas.classParam, 'params'), validate(schemas.byDateQuery, 'query'), async (req, res) => {
    const { classId } = req.params;
    const { date } = req.query; // Expects "YYYY-MM-DD" string format

    try {
        // ⚠️ Authorization: verify the caller owns this class (admins bypass)
        if (!(await canAccessClass(req.user, classId))) {
            return res.status(403).json({ success: false, message: 'Access Denied: class outside your scope.' });
        }

        const targetDate = new Date(date);
        const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

        // Search for a sheet compiled for this class on the target day
        const existingSheet = await Attendance.findOne({
            classId,
            date: { $gte: startOfDay, $lte: endOfDay }
        }).lean();

        if (!existingSheet) {
            return res.json({ success: true, exists: false, records: [] });
        }

        res.json({ success: true, exists: true, records: existingSheet.records });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Request failed.' });
    }
});


// @desc    Get comprehensive yearly attendance percentage analytics for a class
// @route   GET /api/teacher/attendance-analytics/:classId
// @access  Private (Teachers & Admins only)
router.get('/attendance-analytics/:classId', protect, authorizeRoles('teacher', 'admin'), validate(schemas.classParam, 'params'), async (req, res) => {
    try {
        // ⚠️ Authorization: verify the caller owns this class (admins bypass)
        if (!(await canAccessClass(req.user, req.params.classId))) {
            return res.status(403).json({ success: false, message: 'Access Denied: class outside your scope.' });
        }

        const currentYear = new Date().getFullYear();
        const startOfYear = new Date(`${currentYear}-01-01`);
        const endOfYear = new Date(`${currentYear}-12-31`);

        const analytics = await Attendance.aggregate([
            // Stage 1: Filter records by Class ID and academic year limits
            {
                $match: {
                    classId: req.params.classId,
                    date: { $gte: startOfYear, $lte: endOfYear }
                }
            },
            // Stage 2: Unwind sub-document records array
            { $unwind: '$records' },
            // Stage 3: Group by unique Student User ObjectId
            {
                $group: {
                    _id: '$records.studentId',
                    totalSessions: { $sum: 1 },
                    presentCount: {
                        $sum: { $cond: [{ $eq: ['$records.status', 'Present'] }, 1, 0] }
                    },
                    lateCount: {
                        $sum: { $cond: [{ $eq: ['$records.status', 'Late'] }, 1, 0] }
                    },
                    absentCount: {
                        $sum: { $cond: [{ $eq: ['$records.status', 'Absent'] }, 1, 0] }
                    }
                }
            },
            // Stage 4: Add calculated percentage fields
            {
                $addFields: {
                    attendancePercentage: {
                        $round: [
                            {
                                $multiply: [
                                    {
                                        $divide: [
                                            { $add: ['$presentCount', { $multiply: ['$lateCount', 0.5] }] },
                                            '$totalSessions'
                                        ]
                                    },
                                    100
                                ]
                            },
                            1
                        ]
                    }
                }
            },
            // Stage 5: Cross-join with users collection for Name and Email
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'studentInfo'
                }
            },
            { $unwind: '$studentInfo' },

            // Stage 6: 🟢 FIXED STAGE: Cross-join with the separate 'students' collection to extract the real roll number
            {
                $lookup: {
                    from: 'students',
                    localField: '_id',
                    foreignField: 'userId', // Links via the user ID key reference
                    as: 'studentProfile'
                }
            },
            { $unwind: '$studentProfile' }, // Flatten the array properties

            // Stage 7: Project specific fields into frontend parameters
            {
                $project: {
                    _id: 1,
                    totalSessions: 1,
                    presentCount: 1,
                    absentCount: 1,
                    lateCount: 1,
                    attendancePercentage: 1,
                    name: '$studentInfo.name',
                    email: '$studentInfo.email',
                    // 🟢 FIXED MAPPING: Grab the numeric roll position from the correct collection payload
                    rollNumber: '$studentProfile.rollNumber'
                }
            },
            // Stage 8: Sort results cleanly by roll positions chronologically
            { $sort: { rollNumber: 1 } }
        ]);

        res.json({ success: true, year: currentYear, data: analytics });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Request failed.' });
    }
});




// @desc    Allow Class Teachers to update student records with manual roll checks
// @route   PUT /api/teacher/users/edit/:id
router.put('/users/edit/:id', protect, authorizeRoles('teacher'), validate(schemas.idParam, 'params'), validate(schemas.teacherEditStudent), async (req, res) => {
    const { gradeClass, parentContact, name, email, rollNumber, profileImage } = req.body;

    try {
        const currentStudentDoc = await Student.findOne({ userId: req.params.id });

        if (!currentStudentDoc || !(await canAccessClass(req.user, currentStudentDoc.gradeClass))) {
            return res.status(403).json({ success: false, message: 'Access Denied: Student outside your class scope.' });
        }

        // Prevent a class teacher from moving a student into a class they do not own
        const scope = await getTeacherScope(req.user.id);
        if (gradeClass && !scope.classTeacherClasses.includes(gradeClass)) {
            return res.status(403).json({ success: false, message: 'Access Denied: You cannot reassign students to another class.' });
        }

        // Check if the targeted roll number is already taken by someone else in this class
        if (rollNumber && Number(rollNumber) !== currentStudentDoc.rollNumber) {
            const rollTaken = await Student.findOne({ gradeClass: currentStudentDoc.gradeClass, rollNumber: Number(rollNumber) });
            if (rollTaken) {
                return res.status(400).json({ success: false, message: `⚠️ Roll #${rollNumber} is already assigned to another student in this class.` });
            }
        }

        await Student.findOneAndUpdate(
            { userId: req.params.id },
            {
                $set: {
                    gradeClass: gradeClass || currentStudentDoc.gradeClass,
                    parentContact: parentContact || currentStudentDoc.parentContact,
                    rollNumber: rollNumber ? Number(rollNumber) : currentStudentDoc.rollNumber
                }
            }
        );

        const user = await User.findById(req.params.id);
        if (user) {
            if (name) user.name = name;
            if (email) user.email = email;
            if (Object.prototype.hasOwnProperty.call(req.body, 'profileImage')) {
                user.profileImage = profileImage;
            }
            await user.save();
        }

        res.json({ success: true, message: 'Student records updated cleanly!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Request failed.' });
    }
});

// @desc    Allow Class Teachers to change student password
// @route   PUT /api/teacher/users/:id/change-password
// @access  Private (Teachers only)
router.put('/users/:id/change-password', protect, authorizeRoles('teacher'), validate(schemas.idParam, 'params'), async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' });
    }
    
    const student = await Student.findOne({ userId: req.params.id });
    if (!student || !(await canAccessClass(req.user, student.gradeClass))) {
      return res.status(403).json({ success: false, message: 'Unauthorized.' });
    }
    
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'student') {
      return res.status(404).json({ success: false, message: 'Student not found.' });
    }
    
    user.password = newPassword;
    user.passwordChangedAt = new Date();
    await user.save();
    
    res.json({ success: true, message: 'Student password updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// @desc    Allow teachers to upload student profile image
// @route   PUT /api/teacher/users/:id/image
// @access  Private (Teachers only)
router.put('/users/:id/image', protect, authorizeRoles('teacher'), validate(schemas.idParam, 'params'), validate(schemas.profilePhoto), async (req, res) => {
  try {
    const { profileImage } = req.body;
    const student = await Student.findOne({ userId: req.params.id });
    if (!student || !(await canAccessClass(req.user, student.gradeClass))) {
      return res.status(403).json({ success: false, message: 'Unauthorized.' });
    }
    
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Student not found.' });
    
    user.profileImage = profileImage || '';
    await user.save();
    
    res.json({ success: true, user: { _id: user._id, profileImage: user.profileImage } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Request failed.' });
  }
});

// @desc    Allow Class Teachers to delete a student out of their class roster with password confirmation
// @route   DELETE /api/teacher/users/delete/:id
// @access  Private (Teachers only)
router.delete('/users/delete/:id', protect, authorizeRoles('teacher'), validate(schemas.idParam, 'params'), validate(schemas.deleteGuard), async (req, res) => {
    const { password } = req.body; // 🟢 Extract the challenge verification password from the body request

    if (!password) {
        return res.status(400).json({ success: false, message: 'Please enter your login password to authorize this deletion.' });
    }

    try {
        // 1. Fetch the logged-in teacher's account details and explicitly include the hidden password field hash
        const teacherUser = await User.findById(req.user.id).select('+password');
        if (!teacherUser) {
            return res.status(404).json({ success: false, message: 'Teacher identity profile record absent.' });
        }

        // 2. 🟢 CRUCIAL SECURITY CHECK: Verify if the input password matches the teacher's true credentials hash string
        const isMatch = await teacherUser.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Security check failed: Password authentication mismatch.' });
        }

        // 3. Locate the profile and ensure class boundary isolation criteria match
        const student = await Student.findOne({ userId: req.params.id });

        if (!student || !(await canAccessClass(req.user, student.gradeClass))) {
            return res.status(403).json({ success: false, message: 'Unauthorized profile deletion boundaries. Access Denied.' });
        }

        // 4. Atomic cascade: grades, attendance rows, profile, account, then
        // close the roll-number gap — all in one transaction where supported.
        await runInTransaction(async (session) => {
            const opts = session ? { session } : {};
            const studentId = student.userId;

            await Gradebook.deleteMany({ studentId }, opts);
            await Attendance.updateMany(
                { 'records.studentId': studentId },
                { $pull: { records: { studentId } } },
                opts
            );
            await Student.deleteOne({ userId: studentId }, opts);
            await User.deleteOne({ _id: studentId }, opts);

            // 5. Close the roll-number gap left behind so the class stays contiguous.
            await reindexRollsAfterDelete(student.gradeClass, student.rollNumber, session);
        });

        res.json({ success: true, message: 'Student successfully unlinked and dropped from system registries.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Request failed.' });
    }
});





module.exports = router;
