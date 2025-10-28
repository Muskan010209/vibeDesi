const ReviewDAO = require('../dao/reviewDAO');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
exports.createReview = asyncHandler(async (req, res, next) => {
    const { product, rating, title, comment, images } = req.body;

    // Check if user already reviewed this product
    const existingReview = await ReviewDAO.findByUserAndProduct(req.user._id, product);

    if (existingReview) {
        return res.status(400).json({
            success: false,
            message: 'You have already reviewed this product'
        });
    }

    const review = await ReviewDAO.create({
        user: req.user._id,
        product,
        rating,
        title,
        comment,
        images: images || [],
        isVerified: true
    });

    // Update product rating
    await updateProductRating(product);

    res.status(201).json({
        success: true,
        data: review
    });
});

// @desc    Get product reviews
// @route   GET /api/reviews/product/:productId
// @access  Public
exports.getProductReviews = asyncHandler(async (req, res, next) => {
    const reviews = await ReviewDAO.findByProduct(req.params.productId);

    res.status(200).json({
        success: true,
        count: reviews.length,
        data: reviews
    });
});

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = asyncHandler(async (req, res, next) => {
    const review = await ReviewDAO.findById(req.params.id);

    // Check ownership
    if (review.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: 'Not authorized'
        });
    }

    const updatedReview = await ReviewDAO.update(req.params.id, req.body);

    // Update product rating if rating changed
    if (req.body.rating) {
        await updateProductRating(review.product);
    }

    res.status(200).json({
        success: true,
        data: updatedReview
    });
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
    const review = await ReviewDAO.findById(req.params.id);

    // Check ownership
    if (review.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: 'Not authorized'
        });
    }

    await ReviewDAO.delete(req.params.id);
    await updateProductRating(review.product);

    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc    Like/helpful review
// @route   POST /api/reviews/:id/like
// @access  Private
exports.likeReview = asyncHandler(async (req, res, next) => {
    const review = await ReviewDAO.findById(req.params.id);

    const updatedReview = await ReviewDAO.update(req.params.id, {
        $inc: { helpful: 1 }
    });

    res.status(200).json({
        success: true,
        data: updatedReview
    });
});

// Helper function to update product rating
const updateProductRating = async (productId) => {
    const reviews = await ReviewDAO.findByProduct(productId);

    if (reviews.length === 0) {
        await Product.findByIdAndUpdate(productId, {
            rating: 0,
            reviewCount: 0
        });
        return;
    }

    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: reviews.length
    });
};




