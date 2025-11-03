const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middleware/auth');
const {
  getAllUsers,
  toggleUserStatus,
  getSystemStats,
  updateSettings,
} = require('../controllers/adminController');

// All admin routes should be protected
router.use(authenticate, isAdmin);

router.get('/users', getAllUsers);
router.put('/users/:id/status', toggleUserStatus);
router.get('/stats', getSystemStats);
router.put('/settings', updateSettings);
module.exports = router;
