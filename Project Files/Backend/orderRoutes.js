const express = require('express');
const router = express.Router();
const {
    getInventory,
    getInventoryByBook,
    addInventory,
    updateInventory,
} = require('../controllers/inventoryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getInventory).post(protect, admin, addInventory);
router.route('/:id').put(protect, admin, updateInventory).get(getInventoryByBook);

module.exports = router;
