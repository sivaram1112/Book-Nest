const express = require('express');
const router = express.Router();
const { getGenres } = require('../controllers/genreController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getGenres);

module.exports = router;
