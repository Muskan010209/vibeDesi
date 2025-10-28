const OrderDAO = require('../dao/orderDAO');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = asyncHandler(async (req, res, next) => {
    const { items, shippingAddress, paymentMethod } = req.body;

    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order = await OrderDAO.create({
        user: req.user._id,
        items,
        totalAmount,
        shippingAddress,
        paymentMethod,
        orderStatus: 'pending'
    });

    res.status(201).json({
        success: true,
        data: order
    });
});

// @desc    Get my orders
// @route   GET /api/orders
// @access  Private
exports.getMyOrders = asyncHandler(async (req, res, next) => {
    const orders = await OrderDAO.findByUser(req.user._id);

    res.status(200).json({
        success: true,
        count: orders.length,
        data: orders
    });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = asyncHandler(async (req, res, next) => {
    const order = await OrderDAO.findById(req.params.id);

    // Check if order belongs to user
    if (order.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: 'Not authorized to access this order'
        });
    }

    res.status(200).json({
        success: true,
        data: order
    });
});

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelOrder = asyncHandler(async (req, res, next) => {
    const order = await OrderDAO.findById(req.params.id);

    // Check if order belongs to user
    if (order.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: 'Not authorized'
        });
    }

    // Only allow cancellation if order is pending
    if (order.orderStatus !== 'pending') {
        return res.status(400).json({
            success: false,
            message: 'Order can only be cancelled if pending'
        });
    }

    const updatedOrder = await OrderDAO.update(req.params.id, {
        orderStatus: 'cancelled'
    });

    res.status(200).json({
        success: true,
        data: updatedOrder
    });
});

// @desc    Request order return
// @route   PUT /api/orders/:id/return
// @access  Private
exports.returnOrder = asyncHandler(async (req, res, next) => {
    const { reason } = req.body;
    const order = await OrderDAO.findById(req.params.id);

    // Check if order belongs to user
    if (order.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: 'Not authorized'
        });
    }

    // Only allow return if order is delivered
    if (order.orderStatus !== 'delivered') {
        return res.status(400).json({
            success: false,
            message: 'Order must be delivered to return'
        });
    }

    const updatedOrder = await OrderDAO.update(req.params.id, {
        orderStatus: 'return_requested',
        returnReason: reason,
        returnRequestDate: new Date()
    });

    res.status(200).json({
        success: true,
        data: updatedOrder
    });
});




