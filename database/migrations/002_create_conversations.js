// Migration: Create Conversations Collection
// Run: node database/migrations/002_create_conversations.js

const mongoose = require('mongoose');
require('dotenv').config();

const conversationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, default: 'New Conversation' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agentic');
  console.log('✅ Conversations collection ready');
  await mongoose.connection.close();
}

migrate();
