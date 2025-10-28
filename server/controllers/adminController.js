const UserDAO = require('../dao/userDAO');
const ProductDAO = require('../dao/productDAO');
const OrderDAO = require('../dao/orderDAO');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getDashboardStats = asyncHandler(async (req, res, next) => {
    const userStats = await UserDAO.getStats();
    const orderStats = await OrderDAO.getStats();

    // Get products count by category
    const categoryStats = await ProductDAO.findAll();
    const categoryCount = categoryStats.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});

    // Get recent orders
    const recentOrders = await OrderDAO.findAll();
    const recentOrdersSlice = recentOrders.slice(0, 5);

    // Get top products by price
    const topProducts = await ProductDAO.findAll();
    topProducts.sort((a, b) => (b.price * b.discount / 100) - (a.price * a.discount / 100));
    const top5Products = topProducts.slice(0, 5);

    res.status(200).json({
        success: true,
        data: {
            users: userStats,
            orders: orderStats,
            products: {
                total: categoryStats.length,
                byCategory: categoryCount
            },
            recentOrders: recentOrdersSlice,
            topProducts: top5Products
        }
    });
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await UserDAO.findAll();

    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    await UserDAO.delete(req.params.id);

    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
exports.updateUserRole = asyncHandler(async (req, res, next) => {
    const { role } = req.body;

    const user = await UserDAO.update(req.params.id, { role });

    res.status(200).json({
        success: true,
        data: user
    });
});

