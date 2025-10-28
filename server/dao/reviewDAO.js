const Review = require('../models/Review');

class ReviewDAO {
    static async findAll(filters = {}) {
        return await Review.find(filters).populate('user', 'name email avatar').sort({ createdAt: -1 });
    }

    static async findById(id) {
        return await Review.findById(id).populate('user', 'name email avatar');
    }

    static async findByProduct(productId) {
        return await Review.find({ product: productId })
            .populate('user', 'name email avatar')
            .sort({ createdAt: -1 });
    }

    static async findByUser(userId) {
        return await Review.find({ user: userId }).sort({ createdAt: -1 });
    }

    static async findByUserAndProduct(userId, productId) {
        return await Review.findOne({ user: userId, product: productId });
    }

    static async create(reviewData) {
        return await Review.create(reviewData);
    }

    static async update(id, updateData) {
        return await Review.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
    }

    static async delete(id) {
        return await Review.findByIdAndDelete(id);
    }
}

module.exports = ReviewDAO;


