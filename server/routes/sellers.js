const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getDashboard, getOrders, updateOrderStatus } = require('../controllers/sellerController');

router.get('/dashboard', protect, authorize('seller'), getDashboard);
router.get('/orders', protect, authorize('seller'), getOrders);
router.put('/orders/:id/status', protect, authorize('seller'), updateOrderStatus);

module.exports = router;
