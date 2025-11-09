const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, default: 'custom' },
  role: { type: String },
  systemPrompt: { type: String, required: true },
  model: { type: String, default: 'gpt-4' },
  temperature: { type: Number, default: 0.7 },
  maxTokens: { type: Number, default: 2048 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Agent', agentSchema);
