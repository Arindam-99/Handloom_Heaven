const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Get seller dashboard stats
// @route   GET /api/sellers/dashboard
const getDashboard = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const totalProducts = await Product.countDocuments({ seller: sellerId });
    const totalOrders = await Order.countDocuments({ 'items.seller': sellerId });
    const pendingOrders = await Order.countDocuments({
      'items.seller': sellerId,
      status: { $in: ['placed', 'confirmed', 'processing'] }
    });

    // Calculate total sales
    const orders = await Order.find({
      'items.seller': sellerId,
      paymentStatus: 'paid'
    });
    const totalSales = orders.reduce((acc, order) => {
      const sellerItems = order.items.filter(
        item => item.seller.toString() === sellerId.toString()
      );
      return acc + sellerItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, 0);

    // Recent orders
    const recentOrders = await Order.find({ 'items.seller': sellerId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      stats: {
        totalProducts,
        totalOrders,
        pendingOrders,
        totalSales
      },
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get seller's orders
// @route   GET /api/sellers/orders
const getOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    let query = { 'items.seller': req.user._id };
    if (status) query.status = status;

    const skip = (Number(page) - 1) * Number(limit);

    const orders = await Order.find(query)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      orders,
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order status (seller)
// @route   PUT /api/sellers/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber, trackingUrl } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Verify seller owns items in this order
    const hasSellerItems = order.items.some(
      item => item.seller.toString() === req.user._id.toString()
    );
    if (!hasSellerItems) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    order.status = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (trackingUrl) order.trackingUrl = trackingUrl;
    if (status === 'delivered') order.deliveredAt = new Date();

    order.statusHistory.push({
      status,
      note: `Updated by seller`
    });

    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDashboard, getOrders, updateOrderStatus };
