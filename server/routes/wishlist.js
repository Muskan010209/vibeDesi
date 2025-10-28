const express = require('express');
const router = express.Router();
const User = require('../models/User');

// For now, we'll use a simple in-memory wishlist
let wishlist = [];

// Get wishlist
router.get('/', async (req, res) => {
    try {
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add to wishlist
router.post('/', async (req, res) => {
    try {
        const { productId } = req.body;
        if (!wishlist.includes(productId)) {
            wishlist.push(productId);
        }
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Remove from wishlist
router.delete('/:id', async (req, res) => {
    try {
        wishlist = wishlist.filter(id => id !== req.params.id);
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


