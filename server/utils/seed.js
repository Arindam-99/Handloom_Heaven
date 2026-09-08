const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Category = require('../models/Category');
const User = require('../models/User');
const Product = require('../models/Product');

const categories = [
  {
    name: "Women's Traditional Wear",
    description: "Authentic traditional dresses, shawls, skirts and blouses from Arunachal Pradesh",
    sortOrder: 1,
    subCategories: [
      { name: 'Traditional Dresses', slug: 'traditional-dresses' },
      { name: 'Shawls', slug: 'shawls' },
      { name: 'Skirts', slug: 'skirts' },
      { name: 'Blouses', slug: 'blouses' },
      { name: 'Scarves', slug: 'scarves' }
    ]
  },
  {
    name: "Men's Traditional Wear",
    description: "Traditional shirts, jackets, shawls and accessories for men",
    sortOrder: 2,
    subCategories: [
      { name: 'Traditional Shirts', slug: 'traditional-shirts' },
      { name: 'Traditional Jackets', slug: 'traditional-jackets' },
      { name: 'Shawls', slug: 'shawls' },
      { name: 'Accessories', slug: 'accessories' }
    ]
  },
  {
    name: "Jewellery",
    description: "Handcrafted traditional jewellery including necklaces, earrings, and tribal-inspired ornaments",
    sortOrder: 3,
    subCategories: [
      { name: 'Necklaces', slug: 'necklaces' },
      { name: 'Earrings', slug: 'earrings' },
      { name: 'Bracelets', slug: 'bracelets' },
      { name: 'Traditional Ornaments', slug: 'traditional-ornaments' },
      { name: 'Beaded Jewellery', slug: 'beaded-jewellery' }
    ]
  },
  {
    name: "Handloom",
    description: "Authentic handwoven textiles, shawls, scarves, and fabrics",
    sortOrder: 4,
    subCategories: [
      { name: 'Shawls', slug: 'shawls' },
      { name: 'Scarves', slug: 'scarves' },
      { name: 'Woven Fabrics', slug: 'woven-fabrics' },
      { name: 'Home Decor', slug: 'home-decor' }
    ]
  },
  {
    name: "Handicrafts",
    description: "Bamboo, cane, and handcrafted products from local artisans",
    sortOrder: 5,
    subCategories: [
      { name: 'Bamboo Products', slug: 'bamboo-products' },
      { name: 'Cane Products', slug: 'cane-products' },
      { name: 'Baskets', slug: 'baskets' },
      { name: 'Decorative Items', slug: 'decorative-items' }
    ]
  },
  {
    name: "Bags",
    description: "Handcrafted traditional bags and purses",
    sortOrder: 6,
    subCategories: [
      { name: 'Traditional Bags', slug: 'traditional-bags' },
      { name: 'Woven Bags', slug: 'woven-bags' },
      { name: 'Clutches', slug: 'clutches' }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/arunachal-marketplace');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Create admin user
    await User.findOneAndUpdate(
      { email: 'admin@arunachal.com' },
      {
        name: 'Admin',
        email: 'admin@arunachal.com',
        password: 'admin123',
        role: 'admin',
        isActive: true
      },
      { upsert: true, new: true }
    );

    // Create sample seller
    const seller = await User.findOneAndUpdate(
      { email: 'seller@arunachal.com' },
      {
        name: 'Rikam Artisans',
        email: 'seller@arunachal.com',
        password: 'seller123',
        role: 'seller',
        isActive: true
      },
      { upsert: true, new: true }
    );

    // Create categories (with manual slug generation)
    const categoriesWithSlugs = categories.map(cat => ({
      ...cat,
      slug: cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }));
    const createdCategories = await Category.insertMany(categoriesWithSlugs);
    console.log(`${createdCategories.length} categories created`);

    // Create sample products
    const products = [
      {
        name: 'Traditional Handwoven Shawl',
        category: createdCategories[3]._id,
        subCategory: 'Shawls',
        price: 2499,
        discountPrice: 2199,
        description: 'A beautifully handwoven shawl featuring traditional Arunachal patterns. Each piece is unique and tells a story of our rich cultural heritage.',
        material: 'Handwoven Cotton',
        colors: ['Red', 'Black', 'Maroon'],
        sizes: ['Free Size'],
        stock: 20,
        seller: seller._id,
        artisanName: 'Mama Yirang',
        artisanLocation: 'Upper Subansiri, Arunachal Pradesh',
        artisanExperience: '18 years',
        origin: 'Arunachal Pradesh',
        storyBehindProduct: 'This shawl is woven by the artisans of Upper Subansiri using traditional backstrap loom techniques passed down through generations.',
        tags: ['women', 'handloom', 'traditional'],
        isApproved: true,
        isFeatured: true,
        rating: 4.8
      },
      {
        name: 'Tribal Beaded Necklace',
        category: createdCategories[2]._id,
        subCategory: 'Necklaces',
        price: 1500,
        description: 'Handcrafted beaded necklace with traditional tribal patterns. Made with natural beads and traditional techniques.',
        material: 'Natural Beads & Cotton Thread',
        colors: ['Multi-color'],
        sizes: ['One Size'],
        stock: 30,
        seller: seller._id,
        artisanName: 'Mili Tatak',
        artisanLocation: 'East Kameng, Arunachal Pradesh',
        artisanExperience: '12 years',
        origin: 'Arunachal Pradesh',
        storyBehindProduct: 'Each bead is carefully selected and strung by hand following centuries-old tribal jewellery-making traditions.',
        tags: ['women', 'jewellery', 'tribal'],
        isApproved: true,
        isFeatured: true,
        rating: 4.6
      },
      {
        name: 'Bamboo Handicraft Basket',
        category: createdCategories[4]._id,
        subCategory: 'Baskets',
        price: 899,
        description: 'Eco-friendly handcrafted bamboo basket. Perfect for home storage or as a decorative piece.',
        material: 'Bamboo',
        colors: ['Natural', 'Brown'],
        sizes: ['Medium', 'Large'],
        stock: 50,
        seller: seller._id,
        artisanName: 'Tongam Rina',
        artisanLocation: 'Tirap, Arunachal Pradesh',
        artisanExperience: '25 years',
        origin: 'Arunachal Pradesh',
        storyBehindProduct: 'Bamboo weaving is an integral part of Arunachal culture. This basket is crafted using techniques unique to the Nocte tribe.',
        tags: ['unisex', 'handicraft', 'bamboo', 'eco-friendly'],
        isApproved: true,
        isFeatured: true,
        rating: 4.5
      },
      {
        name: "Men's Traditional Jacket",
        category: createdCategories[1]._id,
        subCategory: 'Traditional Jackets',
        price: 3500,
        discountPrice: 3200,
        description: "A traditional men's jacket with authentic Arunachal patterns. Perfect for cultural occasions and daily wear.",
        material: 'Handwoven Cotton',
        colors: ['Black', 'Red'],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 15,
        seller: seller._id,
        artisanName: 'Gumro Yarkam',
        artisanLocation: 'West Kameng, Arunachal Pradesh',
        artisanExperience: '15 years',
        origin: 'Arunachal Pradesh',
        storyBehindProduct: 'This jacket represents the warrior spirit of the Monpa tribe. The patterns are traditionally worn during festivals.',
        tags: ['men', 'traditional', 'handloom'],
        isApproved: true,
        isFeatured: true,
        rating: 4.7
      },
      {
        name: 'Traditional Cotton Skirt',
        category: createdCategories[0]._id,
        subCategory: 'Skirts',
        price: 1800,
        description: 'Beautiful traditional cotton skirt with handwoven patterns from Arunachal Pradesh.',
        material: 'Handwoven Cotton',
        colors: ['Blue', 'Green', 'Red'],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 25,
        seller: seller._id,
        artisanName: 'Yamang Tani',
        artisanLocation: 'Lower Subansiri, Arunachal Pradesh',
        artisanExperience: '20 years',
        origin: 'Arunachal Pradesh',
        storyBehindProduct: 'This skirt is inspired by the traditional attire of the Apatani women, known for their distinctive weaving patterns.',
        tags: ['women', 'traditional', 'handloom'],
        isApproved: true,
        rating: 4.4
      }
    ];

    const productsWithSlugs = products.map(p => ({
      ...p,
      slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }));
    await Product.insertMany(productsWithSlugs);
    console.log(`${products.length} products created`);

    console.log('Seed data created successfully!');
    console.log('Admin: admin@arunachal.com / admin123');
    console.log('Seller: seller@arunachal.com / seller123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
