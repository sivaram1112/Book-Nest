const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        authors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Author',
                required: true,
            },
        ],
        genres: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Genre',
                required: true,
            },
        ],
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        image: {
            type: String,
            required: true,
        },
        isbn: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
