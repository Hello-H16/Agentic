const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

exports.getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const conversationCount = await Conversation.countDocuments();
    const messageCount = await Message.countDocuments();
    
    res.json({ users: userCount, conversations: conversationCount, messages: messageCount });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
