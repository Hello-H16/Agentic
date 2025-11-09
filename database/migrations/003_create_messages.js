// Migration: Create Messages Collection
// Run: node database/migrations/003_create_messages.js

const mongoose = require('mongoose');
require('dotenv').config();

const messageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  role: { type: String, enum: ['user', 'agent'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agentic');
  console.log('✅ Messages collection ready');
  await mongoose.connection.close();
}

migrate();
