// scripts/backfillAssignments.js
// ⚠️ One-off, idempotent migration that seeds the Assignment collection from
//    existing data so the new authorization layer keeps every current teacher working.
//
// Sources:
//   1. Every distinct (submittedBy teacher, classId, subject) already present in Gradebook
//      becomes a subject assignment.
//   2. Every Teacher profile with a real `classTeacherOf` becomes a class-teacher assignment.
//
// Usage (from backend/):
//   node scripts/backfillAssignments.js          # dry run — reports what WOULD change
//   node scripts/backfillAssignments.js --apply  # writes the assignments
//
// Safe to re-run: rows are upserted against the unique {teacher,subject,class,academicYear} index.

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Assignment = require('../models/Assignment');
const Gradebook = require('../models/Gradebook');
const Teacher = require('../models/Teacher');
const User = require('../models/User');
const SchoolConfig = require('../models/SchoolConfig');

const APPLY = process.argv.includes('--apply');

const computeAcademicYear = async () => {
  const config = await SchoolConfig.findOne().lean();
  const start = config?.sessionStartDate ? new Date(config.sessionStartDate) : new Date();
  const year = Number.isNaN(start.getFullYear()) ? new Date().getFullYear() : start.getFullYear();
  return `${year}-${year + 1}`;
};

const run = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI (or MONGO_URI) is not defined in backend/.env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log(`🚀 Connected to MongoDB (${APPLY ? 'APPLY' : 'DRY RUN'}).`);

    const academicYear = await computeAcademicYear();
    console.log(`📅 Academic year label: ${academicYear}\n`);

    // --- 1. Subject assignments from existing grades ---
    const gradePairs = await Gradebook.aggregate([
      {
        $group: {
          _id: { teacher: '$submittedBy', class: '$classId', subject: '$subject' },
          count: { $sum: 1 },
        },
      },
    ]);

    const teacherIds = [...new Set(gradePairs.map((p) => p._id.teacher).filter(Boolean).map(String))];
    const teachers = await User.find({ _id: { $in: teacherIds } }).select('role name email').lean();
    const teacherById = new Map(teachers.map((t) => [String(t._id), t]));

    const subjectOps = [];
    const orphanNoTeacher = [];
    const orphanNotTeacher = [];

    gradePairs.forEach((pair) => {
      const { teacher, class: className, subject } = pair._id;
      if (!teacher) {
        orphanNoTeacher.push({ class: className, subject, grades: pair.count });
        return;
      }
      const profile = teacherById.get(String(teacher));
      if (!profile || profile.role !== 'teacher') {
        orphanNotTeacher.push({ class: className, subject, grades: pair.count, teacher: String(teacher) });
        return;
      }
      subjectOps.push({
        updateOne: {
          filter: { teacher, class: className, subject: subject, academicYear },
          update: {
            $setOnInsert: {
              teacher,
              class: className,
              subject: subject,
              academicYear,
              isClassTeacher: false,
              createdBy: null,
            },
          },
          upsert: true,
        },
      });
    });

    // --- 2. Class-teacher assignments from Teacher profiles ---
    const teacherProfiles = await Teacher.find({ classTeacherOf: { $nin: ['None', '', null] } })
      .select('userId classTeacherOf')
      .lean();
    const skippedClassTeachers = await Teacher.countDocuments({
      $or: [{ classTeacherOf: 'None' }, { classTeacherOf: '' }, { classTeacherOf: null }, { classTeacherOf: { $exists: false } }],
    });

    const classTeacherOps = teacherProfiles.map((profile) => ({
      updateOne: {
        filter: { teacher: profile.userId, class: profile.classTeacherOf, subject: null, academicYear },
        update: {
          $setOnInsert: {
            teacher: profile.userId,
            class: profile.classTeacherOf,
            subject: null,
            academicYear,
            isClassTeacher: true,
            createdBy: null,
          },
        },
        upsert: true,
      },
    }));

    console.log(`🔎 Distinct grade (teacher, class, subject) trios: ${gradePairs.length}`);
    console.log(`📘 Subject assignment rows to upsert:            ${subjectOps.length}`);
    console.log(`🏫 Class-teacher assignment rows to upsert:      ${classTeacherOps.length}`);
    console.log(`⏭️  Teacher profiles skipped (no class):          ${skippedClassTeachers}`);

    if (orphanNoTeacher.length) {
      console.log(`\n⚠️  Grades with NO submitter (cannot be assigned) — ${orphanNoTeacher.length} trio(s):`);
      orphanNoTeacher.forEach((o) => console.log(`    • class="${o.class}" subject="${o.subject}" (${o.grades} grade rows)`));
    }
    if (orphanNotTeacher.length) {
      console.log(`\n⚠️  Grades whose submitter is missing/not a teacher — ${orphanNotTeacher.length} trio(s):`);
      orphanNotTeacher.forEach((o) => console.log(`    • class="${o.class}" subject="${o.subject}" teacher=${o.teacher} (${o.grades} grade rows)`));
    }

    const allOps = [...subjectOps, ...classTeacherOps];
    if (!APPLY) {
      console.log('\n🧪 Dry run complete. Re-run with --apply to write these assignments.');
    } else if (allOps.length === 0) {
      console.log('\n✅ Nothing to write.');
    } else {
      const result = await Assignment.bulkWrite(allOps, { ordered: false });
      console.log(`\n✅ Backfill applied. Inserted ${result.upsertedCount} new assignment(s); matched ${result.matchedCount} existing.`);
    }
  } catch (err) {
    console.error('❌ Backfill failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
