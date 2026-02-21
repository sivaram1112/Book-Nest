const express = require('express');
const router = express.Router();
const { getAuthors } = require('../controllers/authorController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getAuthors);

module.exports = router;
