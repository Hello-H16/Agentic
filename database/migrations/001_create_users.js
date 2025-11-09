// Migration: Create Users Collection
// Run: node database/migrations/001_create_users.js

const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agentic');
  console.log('✅ Users collection ready');
  await mongoose.connection.close();
}

migrate();
