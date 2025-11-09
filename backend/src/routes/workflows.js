const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflowController');
const auth = require('../middleware/auth');

router.get('/', auth, workflowController.getWorkflows);
router.post('/', auth, workflowController.createWorkflow);
router.put('/:id', auth, workflowController.updateWorkflow);
router.delete('/:id', auth, workflowController.deleteWorkflow);
router.post('/:id/execute', auth, workflowController.executeWorkflow);

module.exports = router;
