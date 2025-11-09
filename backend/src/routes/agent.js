const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

router.get('/', auth, agentController.getAgents);
router.post('/', auth, agentController.createAgent);
router.delete('/:id', auth, agentController.deleteAgent);
router.post('/chat', chatController.sendMessage);
router.get('/conversations', auth, chatController.getConversations);
router.get('/conversations/:id', auth, chatController.getMessages);

module.exports = router;
