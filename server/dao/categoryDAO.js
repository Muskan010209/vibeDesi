const Category = require('../models/Category');

class CategoryDAO {
    static async findAll() {
        return await Category.find({}).sort({ name: 1 });
    }

    static async findById(id) {
        return await Category.findById(id);
    }

    static async findBySlug(slug) {
        return await Category.findOne({ slug });
    }

    static async create(data) {
        return await Category.create(data);
    }

    static async update(id, data) {
        return await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    static async delete(id) {
        return await Category.findByIdAndDelete(id);
    }
}

module.exports = CategoryDAO;


