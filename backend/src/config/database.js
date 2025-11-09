const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agentic');
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('MongoDB error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
