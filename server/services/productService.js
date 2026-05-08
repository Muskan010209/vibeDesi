const ProductDAO = require('../dao/productDAO');
const Category = require('../models/Category');

class ProductService {
    static async getAllProducts(filters = {}) {
        let query = {};

        if (filters.category) {
            // Find category by slug and use its ObjectId for filtering
            const category = await Category.findOne({ slug: filters.category });
            if (category) {
                query.category = category._id;
            } else {
                // If category not found, return empty array
                return [];
            }
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

        // Populate category information
        const populatedProducts = await ProductDAO.findAllWithPopulate(query, 'category');

        // Sort if specified
        if (filters.sort === 'price-low') {
            return populatedProducts.sort((a, b) => a.price - b.price);
        } else if (filters.sort === 'price-high') {
            return populatedProducts.sort((a, b) => b.price - a.price);
        } else if (filters.sort === 'rating') {
            return populatedProducts.sort((a, b) => b.rating - a.rating);
        }

        return populatedProducts;
    }

    static async getProductById(id) {
        const product = await ProductDAO.findByIdWithPopulate(id, 'category');
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    static async createProduct(productData, userId) {
        // Convert category slug to ObjectId if it's a string
        if (productData.category && typeof productData.category === 'string') {
            const category = await Category.findOne({ slug: productData.category });
            if (!category) {
                throw new Error('Category not found');
            }
            productData.category = category._id;
        }

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

