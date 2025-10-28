const ProductDAO = require('../dao/productDAO');

class ProductService {
    static async getAllProducts(filters = {}) {
        let query = {};

        if (filters.category) {
            query.category = filters.category;
        }

        if (filters.search) {
            return await ProductDAO.search(filters.search);
        }

        if (filters.minPrice || filters.maxPrice) {
            query.price = {};
            if (filters.minPrice) query.price.$gte = parseInt(filters.minPrice);
            if (filters.maxPrice) query.price.$lte = parseInt(filters.maxPrice);
        }

        const products = await ProductDAO.findAll(query);

        // Sort if specified
        if (filters.sort === 'price-low') {
            return products.sort((a, b) => a.price - b.price);
        } else if (filters.sort === 'price-high') {
            return products.sort((a, b) => b.price - a.price);
        } else if (filters.sort === 'rating') {
            return products.sort((a, b) => b.rating - a.rating);
        }

        return products;
    }

    static async getProductById(id) {
        const product = await ProductDAO.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    static async createProduct(productData, userId) {
        const product = await ProductDAO.create({
            ...productData,
            createdBy: userId
        });
        return product;
    }

    static async updateProduct(id, updateData) {
        const product = await ProductDAO.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return await ProductDAO.update(id, updateData);
    }

    static async deleteProduct(id) {
        const product = await ProductDAO.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return await ProductDAO.delete(id);
    }
}

module.exports = ProductService;

