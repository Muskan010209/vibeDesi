const express = require('express');
const router = express.Router();
const User = require('../models/User');

// For now, we'll use a simple in-memory cart
// In production, you'd want to use Redis or persist to database with session

let cart = [];

// Get cart
router.get('/', async (req, res) => {
    try {
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add to cart
router.post('/', async (req, res) => {
    try {
        const { productId, quantity, size, color } = req.body;

        const existingItem = cart.find(item =>
            item.productId === productId && item.size === size && item.color === color
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ productId, quantity, size, color });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update cart item
router.put('/:id', async (req, res) => {
    try {
        const index = cart.findIndex(item => item.productId === req.params.id);
        if (index !== -1) {
            cart[index] = { ...cart[index], ...req.body };
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Remove from cart
router.delete('/:id', async (req, res) => {
    try {
        cart = cart.filter(item => item.productId !== req.params.id);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Clear cart
router.delete('/', async (req, res) => {
    try {
        cart = [];
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


