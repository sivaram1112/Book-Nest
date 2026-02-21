const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema(
    {
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        location: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
