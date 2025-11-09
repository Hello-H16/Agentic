const express = require('express');
const router = express.Router();
const emailAgentController = require('../controllers/emailAgentController');
const auth = require('../middleware/auth');

router.post('/create', auth, emailAgentController.createEmailAgent);
router.get('/templates', auth, emailAgentController.getEmailTemplates);

module.exports = router;
