const mongoose = require('mongoose');

const authorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
