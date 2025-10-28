const express = require('express');
const {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview,
    likeReview
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/product/:productId')
    .get(getProductReviews);

router.use(protect); // Protected routes

router.route('/')
    .post(createReview);

router.route('/:id')
    .put(updateReview)
    .delete(deleteReview);

router.route('/:id/like')
    .post(likeReview);

module.exports = router;


