// backend/src/routes/agents.js
const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const auth = require('../middleware/auth');

router.post('/', auth, agentController.createAgent);
router.get('/', auth, agentController.getAgents);
router.get('/:id', auth, agentController.getAgent);
router.put('/:id', auth, agentController.updateAgent);
router.delete('/:id', auth, agentController.deleteAgent);

module.exports = router;
