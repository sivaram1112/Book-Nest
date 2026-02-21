const Inventory = require('../models/Inventory');

// @desc    Get all inventory items
// @route   GET /api/inventory
// @access  Private/Admin
const getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find({}).populate('book', 'title author');
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get inventory for a specific book
// @route   GET /api/inventory/:id
// @access  Public
const getInventoryByBook = async (req, res) => {
    try {
        const inventory = await Inventory.find({ book: req.params.id }).populate('book', 'title');
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add inventory item
// @route   POST /api/inventory
// @access  Private/Admin
const addInventory = async (req, res) => {
    const { book, quantity, location } = req.body;

    try {
        const inventory = new Inventory({
            book,
            quantity,
            location,
        });

        const createdInventory = await inventory.save();
        res.status(201).json(createdInventory);
    } catch (error) {
        res.status(400).json({ message: 'Invalid inventory data', error: error.message });
    }
};

// @desc    Update inventory quantity
// @route   PUT /api/inventory/:id
// @access  Private/Admin
const updateInventory = async (req, res) => {
    const { quantity, location } = req.body;

    try {
        const inventory = await Inventory.findById(req.params.id);

        if (inventory) {
            inventory.quantity = quantity !== undefined ? quantity : inventory.quantity;
            inventory.location = location || inventory.location;

            const updatedInventory = await inventory.save();
            res.json(updatedInventory);
        } else {
            res.status(404).json({ message: 'Inventory item not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid inventory data', error: error.message });
    }
};

module.exports = {
    getInventory,
    getInventoryByBook,
    addInventory,
    updateInventory,
};
