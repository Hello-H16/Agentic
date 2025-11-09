// Seed: Initial Data
// Run: node database/seeds/initial_data.js

const mongoose = require('mongoose');
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agentic');
  
  const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
  }));
  
  const existingUser = await User.findOne({ email: 'admin@example.com' });
  if (!existingUser) {
    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('✅ Admin user created');
  } else {
    console.log('ℹ️ Admin user already exists');
  }
  
  await mongoose.connection.close();
}

seed();
