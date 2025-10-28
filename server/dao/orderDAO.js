const Order = require('../models/Order');

class OrderDAO {
    static async findAll() {
        return await Order.find().populate('user', 'name email').populate('items.product');
    }

    static async findById(id) {
        return await Order.findById(id).populate('user', 'name email').populate('items.product');
    }

    static async findByUser(userId) {
        return await Order.find({ user: userId })
            .populate('items.product')
            .sort({ createdAt: -1 });
    }

    static async findByOrderId(orderId) {
        return await Order.findById(orderId).populate('items.product');
    }

    static async create(orderData) {
        return await Order.create(orderData);
    }

    static async update(id, updateData) {
        return await Order.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
    }

    static async getStats() {
        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({ orderStatus: 'pending' });
        const completedOrders = await Order.countDocuments({ orderStatus: 'delivered' });

        const revenue = await Order.aggregate([
            {
                $match: { paymentStatus: 'completed' }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$totalAmount' }
                }
            }
        ]);

        return {
            totalOrders,
            pendingOrders,
            completedOrders,
            totalRevenue: revenue[0]?.total || 0
        };
    }
}

module.exports = OrderDAO;

