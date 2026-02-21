const Author = require('../models/Author');

// @desc    Get all authors
// @route   GET /api/authors
// @access  Private/Admin
const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find({});
        res.json(authors);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getAuthors,
};
