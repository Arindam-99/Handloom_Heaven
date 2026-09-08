const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getProductReviews, addReview, deleteReview } = require('../controllers/reviewController');

router.get('/product/:productId', getProductReviews);
router.post('/', protect, addReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
