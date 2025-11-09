const mongoose = require('mongoose');

const emailAgentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, default: 'Email Sender Agent' },
  type: { type: String, default: 'email' },
  fromEmail: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EmailAgent', emailAgentSchema);
