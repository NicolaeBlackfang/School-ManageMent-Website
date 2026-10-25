// utils/transaction.js
// Runs a unit of work inside a MongoDB transaction when the deployment supports
// it (replica set / mongos, e.g. Atlas). Standalone dev instances fall back to
// the same callback without a session so local development keeps working.
const mongoose = require('mongoose');

const TRANSACTION_UNSUPPORTED = new Set([20, 251]); // IllegalOperation, NoSuchTransaction

const isUnsupportedTransactionError = (err) =>
  TRANSACTION_UNSUPPORTED.has(err?.code) ||
  /replica set|mongos|Transaction numbers are only allowed|transactions are not supported/i.test(
    String(err?.message || '')
  );

const runInTransaction = async (work) => {
  let session;
  try {
    session = await mongoose.startSession();
  } catch {
    return work(null);
  }

  let result;
  try {
    await session.withTransaction(async () => {
      result = await work(session);
    });
    return result;
  } catch (err) {
    if (isUnsupportedTransactionError(err)) {
      console.warn('MongoDB transactions unavailable; running without one.');
      return work(null);
    }
    throw err;
  } finally {
    await session.endSession();
  }
};

module.exports = { runInTransaction };
