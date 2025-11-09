const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

router.get('/', auth, taskController.getTasks);
router.get('/:id', auth, taskController.getTask);

module.exports = router;
