const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    index: true
  },
  slug: {
    type: String,
    unique: true,
    index: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subCategory: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  discountPrice: {
    type: Number,
    default: 0,
    min: 0
  },
  images: [{
    url: String,
    alt: String
  }],
  description: {
    type: String,
    default: ''
  },
  material: {
    type: String,
    default: ''
  },
  colors: [String],
  sizes: [String],
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  origin: {
    type: String,
    default: 'Arunachal Pradesh'
  },
  tribe: {
    type: String,
    default: ''
  },
  craftingMethod: {
    type: String,
    default: ''
  },
  storyBehindProduct: {
    type: String,
    default: ''
  },
  weight: {
    type: String,
    default: ''
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  artisan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  artisanName: {
    type: String,
    default: ''
  },
  artisanLocation: {
    type: String,
    default: ''
  },
  artisanExperience: {
    type: String,
    default: ''
  },
  artisanBio: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  tags: [String],
  isApproved: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isBestseller: {
    type: Boolean,
    default: false
  },
  totalSold: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Generate slug from name
productSchema.pre('save', function() {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

// Text index for search
productSchema.index({ name: 'text', description: 'text', material: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
