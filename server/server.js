const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const path = require('path');
require('dotenv').config();

const app = express();

connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const { protect, authorize } = require('./middleware/auth');

// Public routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/products', require('./routes/products'));
app.use('/api/reviews', require('./routes/reviews'));

// Protected routes
app.use('/api/cart', protect, require('./routes/cart'));
app.use('/api/wishlist', protect, require('./routes/wishlist'));
app.use('/api/orders', protect, require('./routes/orders'));
app.use('/api/sellers', protect, authorize('seller', 'admin'), require('./routes/sellers'));
app.use('/api/admin', protect, authorize('admin'), require('./routes/admin'));
app.use('/api/upload', protect, require('./routes/upload'));

// Static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
