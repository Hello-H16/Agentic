const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const llmService = require('../services/llmService');

exports.sendMessage = async (req, res) => {
  try {
    const { message, conversationId, content } = req.body;
    const userContent = message || content;
    
    let conversation;
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
    } else {
      conversation = new Conversation({ userId: req.userId, title: 'New Chat' });
      await conversation.save();
    }
    
    const userMessage = new Message({ conversationId: conversation._id, role: 'user', content: userContent });
    await userMessage.save();
    
    const history = await Message.find({ conversationId: conversation._id }).sort({ timestamp: 1 }).limit(10);
    const aiResponse = await llmService.generateResponse(userContent, history);
    
    const agentResponse = new Message({ 
      conversationId: conversation._id, 
      role: 'assistant', 
      content: aiResponse
    });
    await agentResponse.save();
    
    conversation.updatedAt = new Date();
    await conversation.save();
    
    res.json({ message: agentResponse, assistantMessage: agentResponse, conversationId: conversation._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    const messages = await Message.find({ conversationId: req.params.id }).sort({ timestamp: 1 });
    res.json({ conversation, messages });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createConversation = async (req, res) => {
  try {
    const { agentId, title } = req.body;
    const conversation = new Conversation({ userId: req.userId, agentId, title: title || 'New Chat' });
    await conversation.save();
    res.json(conversation);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
