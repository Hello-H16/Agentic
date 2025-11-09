const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workflowId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workflow' },
  name: { type: String, required: true },
  status: { type: String, enum: ['pending', 'running', 'completed', 'failed'], default: 'pending' },
  input: { type: String },
  output: { type: String },
  steps: [{
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
    status: { type: String, enum: ['pending', 'running', 'completed', 'failed'] },
    input: { type: String },
    output: { type: String },
    startedAt: { type: Date },
    completedAt: { type: Date }
  }],
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

module.exports = mongoose.model('Task', taskSchema);
