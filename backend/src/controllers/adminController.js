// backend/src/controllers/adminController.js
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // e.g., status can be 'active' or 'disabled'
    const user = await User.findByIdAndUpdate(id, { $set: { status: status } }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user status', error: err.message });
  }
};

exports.getSystemStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalConversations = await Conversation.countDocuments();
    const totalMessages = await Message.countDocuments();
    // sample cost calc (placeholder)
    const apiCost = 0;
    res.json({ totalUsers, totalConversations, totalMessages, apiCost });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching system stats', error: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    // store in DB or config file; simple example: pretend we saved
    // Accept body: { defaultModel: 'gpt-4', rateLimitPerMin: 60 }
    // In production use a Settings collection or feature flag service
    console.log('Updating settings with:', req.body);
    res.json({ message: 'Settings updated (stub)' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating settings', error: err.message });
  }
};

exports.getCostAnalytics = async (req, res) => {
  try {
    // fetch historic costs from a billing collection
    res.json({ data: [] });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cost analytics', error: err.message });
  }
};
