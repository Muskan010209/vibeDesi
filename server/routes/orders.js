const express = require('express');
const {
    createOrder,
    getMyOrders,
    getOrderById,
    cancelOrder,
    returnOrder
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All order routes require authentication

router.route('/')
    .post(createOrder)
    .get(getMyOrders);

router.route('/:id')
    .get(getOrderById);

router.route('/:id/cancel')
    .put(cancelOrder);

router.route('/:id/return')
    .put(returnOrder);

module.exports = router;


