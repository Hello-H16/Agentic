const mongoose = require('mongoose');

const workflowSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  steps: [{
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
    order: { type: Number, required: true },
    instruction: { type: String },
    outputVariable: { type: String }
  }],
  status: { type: String, enum: ['draft', 'active', 'archived'], default: 'draft' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Workflow', workflowSchema);
