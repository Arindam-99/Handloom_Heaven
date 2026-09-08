const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getDashboard, getUsers, toggleUser,
  approveProduct, getPendingProducts,
  getOrders, updateOrderStatus
} = require('../controllers/adminController');

router.get('/dashboard', protect, authorize('admin'), getDashboard);
router.get('/users', protect, authorize('admin'), getUsers);
router.put('/users/:id/toggle', protect, authorize('admin'), toggleUser);
router.get('/products/pending', protect, authorize('admin'), getPendingProducts);
router.put('/products/:id/approve', protect, authorize('admin'), approveProduct);
router.get('/orders', protect, authorize('admin'), getOrders);
router.put('/orders/:id/status', protect, authorize('admin'), updateOrderStatus);

module.exports = router;
