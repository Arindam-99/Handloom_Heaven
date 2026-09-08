const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createOrder, getMyOrders, getOrder, cancelOrder } = require('../controllers/orderController');

router.get('/', protect, getMyOrders);
router.post('/', protect, createOrder);
router.get('/:id', protect, getOrder);
router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;
