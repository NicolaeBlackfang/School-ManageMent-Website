const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Force a strict timeout so it doesn't hang forever
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000 
    });
    console.log('🚀 Initial Mongoose connection trigger successful');
  } catch (err) {
    console.error('❌ CRITICAL DATABASE ERROR:', err.message);
    process.exit(1); // Force the server to stop so you can read the error
  }
};

module.exports = connectDB;
