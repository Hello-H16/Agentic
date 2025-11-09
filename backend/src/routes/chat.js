const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

router.post('/conversations', auth, chatController.createConversation);
router.post('/messages', auth, chatController.sendMessage);
router.get('/conversations', auth, chatController.getConversations);
router.get('/conversations/:id', auth, chatController.getMessages);

module.exports = router;
