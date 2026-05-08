const UserDAO = require('../../dao/userDAO');
const ProductDAO = require('../../dao/productDAO');
const OrderDAO = require('../../dao/orderDAO');

class AdminService {
    static async getDashboardStats() {
        const userStats = await UserDAO.getStats();
        const orderStats = await OrderDAO.getStats();

        const products = await ProductDAO.findAllWithPopulate({}, 'category');
        const categoryCount = products.reduce((acc, product) => {
            const category = product.category;
            if (!category) return acc;
            const key = category.slug || category.name || 'uncategorized';
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});

        const recentOrders = await OrderDAO.findAll();
        const recentOrdersSlice = recentOrders.slice(0, 5);

        const topProducts = [...products];
        topProducts.sort((a, b) => (b.price * b.discount / 100) - (a.price * a.discount / 100));
        const top5Products = topProducts.slice(0, 5);

        return {
            users: userStats,
            orders: orderStats,
            products: {
                total: products.length,
                byCategory: categoryCount
            },
            recentOrders: recentOrdersSlice,
            topProducts: top5Products
        };
    }

    static async getAllUsers() {
        return await UserDAO.findAll();
    }

    static async deleteUser(id) {
        return await UserDAO.delete(id);
    }

    static async updateUserRole(id, role) {
        return await UserDAO.update(id, { role });
    }
}

module.exports = AdminService;
