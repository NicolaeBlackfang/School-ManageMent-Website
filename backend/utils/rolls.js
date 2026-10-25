// backend/utils/rolls.js
const Student = require('../models/Student');

// Close the gap left by a deleted student: decrement every roll number above the
// removed one within the same class so the sequence stays contiguous (1..n).
// Processing in ascending order guarantees each target slot is already free,
// avoiding unique-index ({ gradeClass, rollNumber }) collisions.
const reindexRollsAfterDelete = async (gradeClass, removedRoll, session = null) => {
  if (!gradeClass) return;
  const removed = Number(removedRoll);
  if (!Number.isFinite(removed)) return;

  const query = Student.find({ gradeClass, rollNumber: { $gt: removed } })
    .sort({ rollNumber: 1 })
    .select('rollNumber');
  if (session) query.session(session);

  const toShift = await query;

  for (const student of toShift) {
    student.rollNumber = student.rollNumber - 1;
    await student.save(session ? { session } : {});
  }
};

module.exports = { reindexRollsAfterDelete };
