// backend/src/controllers/adminController.js
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json({ users });
};

exports.toggleUserStatus = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { $set: { disabled: !req.body.disable ? false : true } }, { new: true });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user });
};

exports.getSystemStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalConversations = await Conversation.countDocuments();
  const totalMessages = await Message.countDocuments();
  // sample cost calc (placeholder)
  const apiCost = 0; 
  res.json({ totalUsers, totalConversations, totalMessages, apiCost });
};

exports.updateSettings = async (req, res) => {
  // store in DB or config file; simple example: pretend we saved
  // Accept body: { defaultModel: 'gpt-4', rateLimitPerMin: 60 }
  // In production use a Settings collection or feature flag service
  res.json({ message: 'Settings updated (stub)' });
};

exports.getCostAnalytics = async (req, res) => {
  // fetch historic costs from a billing collection
  res.json({ data: [] });
};
