const Genre = require('../models/Genre');

// @desc    Get all genres
// @route   GET /api/genres
// @access  Private/Admin
const getGenres = async (req, res) => {
    try {
        const genres = await Genre.find({});
        res.json(genres);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getGenres,
};
