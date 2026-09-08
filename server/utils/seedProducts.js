require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');

async function seedProducts() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const cats = await Category.find();
  const catMap = {};
  cats.forEach(c => catMap[c.name] = c._id);
  
  const seller = (await User.findOne({email:'seller@arunachal.com'}))._id;

  const products = [
    // === HANDLOOM ===
    {
      name: 'Traditional Handwoven Shawl',
      slug: 'traditional-handwoven-shawl',
      category: catMap['Handloom'], subCategory: 'Shawls',
      price: 2499, discountPrice: 2199,
      description: 'A beautifully handwoven shawl featuring traditional Arunachal patterns. Each piece is unique and tells a story of our rich cultural heritage.',
      material: 'Handwoven Cotton', colors: ['Red', 'Black', 'Maroon'], sizes: ['Free Size'],
      stock: 20, seller, artisanName: 'Mama Yirang', artisanLocation: 'Upper Subansiri, Arunachal Pradesh',
      artisanExperience: '18 years', origin: 'Arunachal Pradesh', tribe: 'Nishi',
      craftingMethod: 'Backstrap loom weaving',
      storyBehindProduct: 'This shawl is woven using traditional backstrap loom techniques passed down through generations of Nishi artisans in Upper Subansiri.',
      tags: ['women','men','handloom','traditional'], isApproved: true, isFeatured: true, isBestseller: true, rating: 4.8, numReviews: 24
    },
    {
      name: 'Monpa Woolen Shawl',
      slug: 'monpa-woolen-shawl',
      category: catMap['Handloom'], subCategory: 'Shawls',
      price: 3200, discountPrice: 2899,
      description: 'A traditional Monpa tribe woolen shawl featuring intricate geometric patterns in earthy tones.',
      material: 'Natural Wool', colors: ['Cream', 'Brown', 'Rust'], sizes: ['Free Size'],
      stock: 15, seller, artisanName: 'Dorjee Tsering', artisanLocation: 'Tawang, Arunachal Pradesh',
      artisanExperience: '22 years', origin: 'Arunachal Pradesh', tribe: 'Monpa',
      craftingMethod: 'Traditional backstrap loom weaving',
      storyBehindProduct: 'The Monpa tribe of Tawang district are known for their exquisite woolen textiles. Each shawl takes approximately 2 weeks to complete.',
      tags: ['women','men','handloom','woolen'], isApproved: true, isFeatured: true, rating: 4.9, numReviews: 18
    },
    {
      name: 'Handwoven Cotton Stole',
      slug: 'handwoven-cotton-stole',
      category: catMap['Handloom'], subCategory: 'Scarves',
      price: 1100,
      description: 'Lightweight handwoven cotton stole with delicate traditional patterns. Perfect for all seasons.',
      material: 'Handwoven Cotton', colors: ['White', 'Indigo', 'Turmeric'], sizes: ['Free Size'],
      stock: 35, seller, artisanName: 'Yamang Tani', artisanLocation: 'Lower Subansiri, Arunachal Pradesh',
      artisanExperience: '15 years', origin: 'Arunachal Pradesh', tribe: 'Apatani',
      tags: ['women','handloom','cotton','scarf'], isApproved: true, isFeatured: true, rating: 4.5, numReviews: 32
    },
    {
      name: 'Handloom Wall Hanging',
      slug: 'handloom-wall-hanging',
      category: catMap['Handloom'], subCategory: 'Home Decor',
      price: 2000, discountPrice: 1799,
      description: 'Beautiful handloom wall hanging depicting traditional Arunachal motifs and nature patterns.',
      material: 'Cotton & Wool', colors: ['Multi'], sizes: ['60cm x 90cm'],
      stock: 18, seller, artisanName: 'Mama Yirang', artisanLocation: 'Upper Subansiri, Arunachal Pradesh',
      artisanExperience: '18 years', origin: 'Arunachal Pradesh',
      tags: ['unisex','handloom','home-decor','art'], isApproved: true, isFeatured: true, rating: 4.6, numReviews: 15
    },
    {
      name: 'Adi Silk Mekhela',
      slug: 'adi-silk-mekhela',
      category: catMap['Handloom'], subCategory: 'Woven Fabrics',
      price: 4500, discountPrice: 3999,
      description: 'Traditional Adi tribe silk Mekhela with intricate woven borders and cultural motifs.',
      material: 'Silk & Cotton', colors: ['Red', 'Green', 'Blue'], sizes: ['Free Size'],
      stock: 8, seller, artisanName: 'Narmi Deru', artisanLocation: 'Pasighat, Arunachal Pradesh',
      artisanExperience: '20 years', origin: 'Arunachal Pradesh', tribe: 'Adi',
      tags: ['women','handloom','silk','traditional'], isApproved: true, rating: 4.9, numReviews: 12
    },

    // === JEWELLERY ===
    {
      name: 'Tribal Beaded Necklace',
      slug: 'tribal-beaded-necklace',
      category: catMap['Jewellery'], subCategory: 'Necklaces',
      price: 1500,
      description: 'Handcrafted beaded necklace with traditional tribal patterns. Made with natural beads and traditional techniques.',
      material: 'Natural Beads & Cotton Thread', colors: ['Multi-color'], sizes: ['One Size'],
      stock: 30, seller, artisanName: 'Mili Tatak', artisanLocation: 'East Kameng, Arunachal Pradesh',
      artisanExperience: '12 years', origin: 'Arunachal Pradesh',
      tags: ['women','jewellery','tribal','beaded'], isApproved: true, isFeatured: true, isBestseller: true, rating: 4.6, numReviews: 42
    },
    {
      name: 'Tribal Silver Earrings',
      slug: 'tribal-silver-earrings',
      category: catMap['Jewellery'], subCategory: 'Earrings',
      price: 950, discountPrice: 799,
      description: 'Handcrafted silver earrings with traditional tribal motifs. Lightweight and elegant.',
      material: 'Sterling Silver', colors: ['Silver'], sizes: ['One Size'],
      stock: 40, seller, artisanName: 'Renu Tama', artisanLocation: 'Pasighat, Arunachal Pradesh',
      artisanExperience: '8 years', origin: 'Arunachal Pradesh',
      tags: ['women','jewellery','silver','tribal'], isApproved: true, isFeatured: true, rating: 4.6, numReviews: 28
    },
    {
      name: 'Multi-Strand Beaded Necklace',
      slug: 'multi-strand-beaded-necklace',
      category: catMap['Jewellery'], subCategory: 'Beaded Jewellery',
      price: 1800,
      description: 'Multi-strand beaded necklace with vibrant colors reflecting tribal heritage of Arunachal.',
      material: 'Glass Beads & Cotton Thread', colors: ['Multi'], sizes: ['One Size'],
      stock: 30, seller, artisanName: 'Mili Tatak', artisanLocation: 'East Kameng, Arunachal Pradesh',
      artisanExperience: '12 years', origin: 'Arunachal Pradesh',
      tags: ['women','jewellery','beaded','tribal'], isApproved: true, isFeatured: true, rating: 4.7, numReviews: 20
    },
    {
      name: 'Traditional Beaded Bracelet',
      slug: 'traditional-beaded-bracelet',
      category: catMap['Jewellery'], subCategory: 'Bracelets',
      price: 450,
      description: 'Handmade beaded bracelet with traditional tribal color patterns. Unisex design.',
      material: 'Glass Beads', colors: ['Red-Black', 'Blue-White', 'Green-Yellow'], sizes: ['One Size'],
      stock: 60, seller, artisanName: 'Rini Tama', artisanLocation: 'Pasighat, Arunachal Pradesh',
      artisanExperience: '6 years', origin: 'Arunachal Pradesh',
      tags: ['unisex','jewellery','beaded','affordable'], isApproved: true, isBestseller: true, rating: 4.3, numReviews: 56
    },
    {
      name: 'Conch Shell Necklace',
      slug: 'conch-shell-necklace',
      category: catMap['Jewellery'], subCategory: 'Necklaces',
      price: 2200,
      description: 'Traditional conch shell necklace with silver accents. A statement piece from Arunachal.',
      material: 'Conch Shell & Silver', colors: ['White'], sizes: ['One Size'],
      stock: 12, seller, artisanName: 'Mili Tatak', artisanLocation: 'East Kameng, Arunachal Pradesh',
      artisanExperience: '12 years', origin: 'Arunachal Pradesh',
      tags: ['women','jewellery','conch','traditional'], isApproved: true, rating: 4.8, numReviews: 9
    },

    // === HANDICRAFTS ===
    {
      name: 'Bamboo Handicraft Basket',
      slug: 'bamboo-handicraft-basket',
      category: catMap['Handicrafts'], subCategory: 'Baskets',
      price: 899,
      description: 'Eco-friendly handcrafted bamboo basket. Perfect for home storage or as a decorative piece.',
      material: 'Bamboo', colors: ['Natural', 'Brown'], sizes: ['Medium', 'Large'],
      stock: 50, seller, artisanName: 'Tongam Rina', artisanLocation: 'Tirap, Arunachal Pradesh',
      artisanExperience: '25 years', origin: 'Arunachal Pradesh', tribe: 'Nocte',
      tags: ['unisex','handicraft','bamboo','eco-friendly'], isApproved: true, isFeatured: true, isBestseller: true, rating: 4.5, numReviews: 38
    },
    {
      name: 'Apatani Bamboo Vase',
      slug: 'apatani-bamboo-vase',
      category: catMap['Handicrafts'], subCategory: 'Decorative Items',
      price: 1200,
      description: 'Handwoven bamboo vase with traditional Apatani patterns. A beautiful addition to any home.',
      material: 'Bamboo', colors: ['Natural'], sizes: ['Medium'],
      stock: 25, seller, artisanName: 'Hage Appa', artisanLocation: 'Ziro, Arunachal Pradesh',
      artisanExperience: '30 years', origin: 'Arunachal Pradesh', tribe: 'Apatani',
      tags: ['unisex','handicraft','bamboo','home-decor'], isApproved: true, isFeatured: true, rating: 4.7, numReviews: 22
    },
    {
      name: 'Woven Bamboo Basket Set',
      slug: 'woven-bamboo-basket-set',
      category: catMap['Handicrafts'], subCategory: 'Baskets',
      price: 1500, discountPrice: 1299,
      description: 'Set of 3 handwoven bamboo baskets in graduated sizes. Perfect for storage or display.',
      material: 'Bamboo', colors: ['Natural'], sizes: ['S/M/L Set'],
      stock: 20, seller, artisanName: 'Tongam Rina', artisanLocation: 'Tirap, Arunachal Pradesh',
      artisanExperience: '25 years', origin: 'Arunachal Pradesh', tribe: 'Nocte',
      tags: ['unisex','handicraft','bamboo','home-decor'], isApproved: true, rating: 4.4, numReviews: 16
    },
    {
      name: 'Nishi Cane Chair',
      slug: 'nishi-cane-chair',
      category: catMap['Handicrafts'], subCategory: 'Cane Products',
      price: 4500, discountPrice: 3999,
      description: 'Handcrafted cane chair with traditional Nishi design. Comfortable and durable.',
      material: 'Cane & Bamboo', colors: ['Natural'], sizes: ['Standard'],
      stock: 8, seller, artisanName: 'Tado Taku', artisanLocation: 'Doimukh, Arunachal Pradesh',
      artisanExperience: '35 years', origin: 'Arunachal Pradesh', tribe: 'Nishi',
      tags: ['unisex','handicraft','cane','furniture'], isApproved: true, rating: 4.8, numReviews: 7
    },
    {
      name: 'Bamboo Wine Cup Set',
      slug: 'bamboo-wine-cup-set',
      category: catMap['Handicrafts'], subCategory: 'Bamboo Products',
      price: 650,
      description: 'Set of 4 handcrafted bamboo cups. Traditional Apatani style.',
      material: 'Bamboo', colors: ['Natural'], sizes: ['Set of 4'],
      stock: 40, seller, artisanName: 'Hage Appa', artisanLocation: 'Ziro, Arunachal Pradesh',
      artisanExperience: '30 years', origin: 'Arunachal Pradesh', tribe: 'Apatani',
      tags: ['unisex','handicraft','bamboo','kitchen'], isApproved: true, isBestseller: true, rating: 4.5, numReviews: 34
    },

    // === MEN'S WEAR ===
    {
      name: "Men's Traditional Jacket",
      slug: 'mens-traditional-jacket',
      category: catMap["Men's Traditional Wear"], subCategory: 'Traditional Jackets',
      price: 3500, discountPrice: 3200,
      description: "A traditional men's jacket with authentic Arunachal patterns. Perfect for cultural occasions and daily wear.",
      material: 'Handwoven Cotton', colors: ['Black', 'Red'], sizes: ['S', 'M', 'L', 'XL'],
      stock: 15, seller, artisanName: 'Gumro Yarkam', artisanLocation: 'West Kameng, Arunachal Pradesh',
      artisanExperience: '15 years', origin: 'Arunachal Pradesh', tribe: 'Monpa',
      tags: ['men','traditional','handloom'], isApproved: true, isFeatured: true, isBestseller: true, rating: 4.7, numReviews: 20
    },
    {
      name: 'Galo Traditional Vest',
      slug: 'galo-traditional-vest',
      category: catMap["Men's Traditional Wear"], subCategory: 'Traditional Shirts',
      price: 2200,
      description: "Traditional men's vest from the Galo tribe with handwoven strips and cultural motifs.",
      material: 'Handwoven Cotton', colors: ['Black', 'White'], sizes: ['M', 'L', 'XL'],
      stock: 12, seller, artisanName: 'Jumber Pulu', artisanLocation: 'Along, Arunachal Pradesh',
      artisanExperience: '16 years', origin: 'Arunachal Pradesh', tribe: 'Galo',
      tags: ['men','traditional','handloom'], isApproved: true, rating: 4.8, numReviews: 14
    },
    {
      name: 'Monpa Woolen Cap',
      slug: 'monpa-woolen-cap',
      category: catMap["Men's Traditional Wear"], subCategory: 'Accessories',
      price: 750,
      description: 'Traditional Monpa woolen cap with embroidered patterns. Warm and authentic.',
      material: 'Wool', colors: ['Black', 'Red'], sizes: ['One Size'],
      stock: 30, seller, artisanName: 'Dorjee Tsering', artisanLocation: 'Tawang, Arunachal Pradesh',
      artisanExperience: '22 years', origin: 'Arunachal Pradesh', tribe: 'Monpa',
      tags: ['men','traditional','woolen','accessory'], isApproved: true, rating: 4.6, numReviews: 19
    },
    {
      name: 'Nishi Warrior Belt',
      slug: 'nishi-warrior-belt',
      category: catMap["Men's Traditional Wear"], subCategory: 'Accessories',
      price: 1100,
      description: 'Handcrafted leather and cane belt with traditional Nishi warrior motifs.',
      material: 'Leather & Cane', colors: ['Brown'], sizes: ['M', 'L'],
      stock: 18, seller, artisanName: 'Tado Taku', artisanLocation: 'Doimukh, Arunachal Pradesh',
      artisanExperience: '35 years', origin: 'Arunachal Pradesh', tribe: 'Nishi',
      tags: ['men','traditional','leather','accessory'], isApproved: true, rating: 4.7, numReviews: 11
    },

    // === WOMEN'S WEAR ===
    {
      name: 'Traditional Cotton Skirt',
      slug: 'traditional-cotton-skirt',
      category: catMap["Women's Traditional Wear"], subCategory: 'Skirts',
      price: 1800,
      description: 'Beautiful traditional cotton skirt with handwoven patterns from Arunachal Pradesh.',
      material: 'Handwoven Cotton', colors: ['Blue', 'Green', 'Red'], sizes: ['S', 'M', 'L', 'XL'],
      stock: 25, seller, artisanName: 'Yamang Tani', artisanLocation: 'Lower Subansiri, Arunachal Pradesh',
      artisanExperience: '20 years', origin: 'Arunachal Pradesh', tribe: 'Apatani',
      tags: ['women','traditional','handloom'], isApproved: true, isFeatured: true, rating: 4.4, numReviews: 26
    },
    {
      name: 'Adi Handwoven Skirt',
      slug: 'adi-handwoven-skirt',
      category: catMap["Women's Traditional Wear"], subCategory: 'Traditional Dresses',
      price: 2800,
      description: 'Traditional Adi tribe handwoven skirt with distinctive horizontal stripes and patterns.',
      material: 'Handwoven Cotton', colors: ['Red', 'Black'], sizes: ['S', 'M', 'L'],
      stock: 10, seller, artisanName: 'Narmi Deru', artisanLocation: 'Pasighat, Arunachal Pradesh',
      artisanExperience: '20 years', origin: 'Arunachal Pradesh', tribe: 'Adi',
      tags: ['women','traditional','handloom'], isApproved: true, rating: 4.9, numReviews: 8
    },
    {
      name: 'Monpa Woolen Blouse',
      slug: 'monpa-woolen-blouse',
      category: catMap["Women's Traditional Wear"], subCategory: 'Blouses',
      price: 1950,
      description: 'Traditional Monpa woolen blouse with intricate embroidery and warm fabric.',
      material: 'Wool & Cotton', colors: ['Red', 'Blue'], sizes: ['S', 'M', 'L'],
      stock: 14, seller, artisanName: 'Dorjee Tsering', artisanLocation: 'Tawang, Arunachal Pradesh',
      artisanExperience: '22 years', origin: 'Arunachal Pradesh', tribe: 'Monpa',
      tags: ['women','traditional','woolen'], isApproved: true, rating: 4.7, numReviews: 13
    },

    // === BAGS ===
    {
      name: 'Woven Jute Bag',
      slug: 'woven-jute-bag',
      category: catMap['Bags'], subCategory: 'Traditional Bags',
      price: 750,
      description: 'Handcrafted jute and cotton blend bag with traditional Arunachal patterns. Eco-friendly and stylish.',
      material: 'Jute & Cotton', colors: ['Brown', 'Beige'], sizes: ['One Size'],
      stock: 45, seller, artisanName: 'Tagak Yirang', artisanLocation: 'Upper Subansiri, Arunachal Pradesh',
      artisanExperience: '10 years', origin: 'Arunachal Pradesh',
      tags: ['women','bags','eco-friendly','handcraft'], isApproved: true, isFeatured: true, rating: 4.3, numReviews: 31
    },
    {
      name: 'Bamboo Handbag',
      slug: 'bamboo-handbag',
      category: catMap['Bags'], subCategory: 'Woven Bags',
      price: 1600,
      description: 'Unique handwoven bamboo handbag with leather straps. A statement accessory.',
      material: 'Bamboo & Leather', colors: ['Natural', 'Black'], sizes: ['One Size'],
      stock: 22, seller, artisanName: 'Hage Appa', artisanLocation: 'Ziro, Arunachal Pradesh',
      artisanExperience: '30 years', origin: 'Arunachal Pradesh',
      tags: ['women','bags','bamboo','handcraft'], isApproved: true, rating: 4.6, numReviews: 17
    },
    {
      name: 'Tribal Clutch Purse',
      slug: 'tribal-clutch-purse',
      category: catMap['Bags'], subCategory: 'Clutches',
      price: 950,
      description: 'Handwoven tribal clutch with beaded embellishments. Perfect for special occasions.',
      material: 'Cotton & Beads', colors: ['Red', 'Black'], sizes: ['One Size'],
      stock: 28, seller, artisanName: 'Mili Tatak', artisanLocation: 'East Kameng, Arunachal Pradesh',
      artisanExperience: '12 years', origin: 'Arunachal Pradesh',
      tags: ['women','bags','clutch','tribal'], isApproved: true, rating: 4.5, numReviews: 22
    }
  ];

  try {
    let added = 0;
    let skipped = 0;
    for (const p of products) {
      const exists = await Product.findOne({ slug: p.slug });
      if (!exists) {
        await Product.create(p);
        added++;
      } else {
        skipped++;
      }
    }
    const total = await Product.countDocuments();
    console.log(`Done! Added: ${added}, Skipped: ${skipped}, Total products: ${total}`);
  } catch (err) {
    console.error('Error:', err.message);
  }
  process.exit(0);
}

seedProducts();
