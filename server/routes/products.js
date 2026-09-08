const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getProducts, getProduct, createProduct,
  updateProduct, deleteProduct, getMyProducts
} = require('../controllers/productController');

// Public
router.get('/', getProducts);
router.get('/my-products', protect, authorize('seller', 'admin'), getMyProducts);
router.get('/:slug', getProduct);

// Seller/Admin
router.post('/', protect, authorize('seller', 'admin'), createProduct);
router.put('/:id', protect, authorize('seller', 'admin'), updateProduct);
router.delete('/:id', protect, authorize('seller', 'admin'), deleteProduct);

module.exports = router;
