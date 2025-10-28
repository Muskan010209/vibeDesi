const User = require('../models/User');

class UserDAO {
    static async findAll() {
        return await User.find().select('-password');
    }

    static async findById(id) {
        return await User.findById(id).select('-password');
    }

    static async findByEmail(email) {
        return await User.findOne({ email }).select('+password');
    }

    static async create(userData) {
        return await User.create(userData);
    }

    static async update(id, updateData) {
        return await User.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
    }

    static async delete(id) {
        return await User.findByIdAndDelete(id);
    }

    static async getStats() {
        const totalUsers = await User.countDocuments();
        const totalAdmins = await User.countDocuments({ role: 'admin' });
        const activeUsers = await User.countDocuments({ isActive: true });

        return { totalUsers, totalAdmins, activeUsers };
    }
}

module.exports = UserDAO;

