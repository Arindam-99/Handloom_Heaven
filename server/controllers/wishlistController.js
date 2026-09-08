const User = require('../models/User');

// @desc    Get wishlist
// @route   GET /api/wishlist
const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('wishlist', 'name price discountPrice images rating slug category');
    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle product in wishlist
// @route   POST /api/wishlist/:productId
const toggleWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const productId = req.params.productId;

    const index = user.wishlist.indexOf(productId);
    let added;

    if (index > -1) {
      user.wishlist.splice(index, 1);
      added = false;
    } else {
      user.wishlist.push(productId);
      added = true;
    }

    await user.save();

    const updatedUser = await User.findById(req.user._id)
      .populate('wishlist', 'name price discountPrice images rating slug category');

    res.json({
      success: true,
      wishlist: updatedUser.wishlist,
      added
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getWishlist, toggleWishlist };
