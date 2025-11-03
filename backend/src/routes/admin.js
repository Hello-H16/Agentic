const express = require('express');
const router = express.Router();

// Example route
router.get('/stats', (req, res) => {
  res.json({ message: 'Admin analytics data working ✅' });
});

module.exports = router;
