const Product = require('../models/Product');

class ProductDAO {
    static async findAll(filters = {}) {
        return await Product.find(filters);
    }

    static async findById(id) {
        return await Product.findById(id);
    }

    static async create(productData) {
        return await Product.create(productData);
    }

    static async update(id, updateData) {
        return await Product.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
    }

    static async delete(id) {
        return await Product.findByIdAndDelete(id);
    }

    static async search(query) {
        return await Product.find({ $text: { $search: query } });
    }

    static async findByCategory(category) {
        return await Product.find({ category });
    }
}

module.exports = ProductDAO;

