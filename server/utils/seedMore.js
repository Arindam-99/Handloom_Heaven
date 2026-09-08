require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');

async function addMoreProducts() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const cats = await Category.find();
  const catMap = {};
  cats.forEach(c => catMap[c.name] = c._id);
  
  const seller = (await User.findOne({email:'seller@arunachal.com'}))._id;

  const moreProducts = [
    {
      name: 'Monpa Woolen Shawl',
      slug: 'monpa-woolen-shawl',
      category: catMap['Handloom'],
      subCategory: 'Shawls',
      price: 3200, discountPrice: 2899,
      description: 'A traditional Monpa tribe woolen shawl featuring intricate geometric patterns in earthy tones.',
      material: 'Natural Wool', colors: ['Cream', 'Brown', 'Rust'], sizes: ['Free Size'],
      stock: 15, seller, artisanName: 'Dorjee Tsering', artisanLocation: 'Tawang, Arunachal Pradesh',
      artisanExperience: '22 years', origin: 'Arunachal Pradesh', tribe: 'Monpa',
      craftingMethod: 'Traditional backstrap loom weaving',
      storyBehindProduct: 'The Monpa tribe of Tawang district are known for their exquisite woolen textiles. Each shawl takes approximately 2 weeks to complete.',
      tags: ['women','men','handloom','traditional','woolen'], isApproved: true, isFeatured: true, rating: 4.9, numReviews: 12
    },
    {
      name: 'Apatani Bamboo Vase',
      slug: 'apatani-bamboo-vase',
      category: catMap['Handicrafts'],
      subCategory: 'Decorative Items',
      price: 1200,
      description: 'Handwoven bamboo vase with traditional Apatani patterns. A beautiful addition to any home.',
      material: 'Bamboo', colors: ['Natural'], sizes: ['Medium'],
      stock: 25, seller, artisanName: 'Hage Appa', artisanLocation: 'Ziro, Arunachal Pradesh',
      artisanExperience: '30 years', origin: 'Arunachal Pradesh', tribe: 'Apatani',
      craftingMethod: 'Bamboo splitting and weaving',
      tags: ['unisex','handicraft','bamboo','home-decor'], isApproved: true, isFeatured: true, rating: 4.7
    },
    {
      name: 'Tribal Silver Earrings',
      slug: 'tribal-silver-earrings',
      category: catMap['Jewellery'],
      subCategory: 'Earrings',
      price: 950, discountPrice: 799,
      description: 'Handcrafted silver earrings with traditional tribal motifs. Lightweight and elegant.',
      material: 'Sterling Silver', colors: ['Silver'], sizes: ['One Size'],
      stock: 40, seller, artisanName: 'Renu Tama', artisanLocation: 'Pasighat, Arunachal Pradesh',
      artisanExperience: '8 years', origin: 'Arunachal Pradesh',
      tags: ['women','jewellery','silver','tribal'], isApproved: true, rating: 4.6, numReviews: 8
    },
    {
      name: 'Handwoven Cotton Stole',
      slug: 'handwoven-cotton-stole',
      category: catMap['Handloom'],
      subCategory: 'Scarves',
      price: 1100,
      description: 'Lightweight handwoven cotton stole with delicate traditional patterns. Perfect for all seasons.',
      material: 'Handwoven Cotton', colors: ['White', 'Indigo', 'Turmeric'], sizes: ['Free Size'],
      stock: 35, seller, artisanName: 'Yamang Tani', artisanLocation: 'Lower Subansiri, Arunachal Pradesh',
      artisanExperience: '15 years', origin: 'Arunachal Pradesh', tribe: 'Apatani',
      tags: ['women','handloom','cotton','scarf'], isApproved: true, isFeatured: true, rating: 4.5
    },
    {
      name: 'Galo Traditional Vest',
      slug: 'galo-traditional-vest',
      category: catMap["Men's Traditional Wear"],
      subCategory: 'Traditional Shirts',
      price: 2200,
      description: "Traditional men's vest from the Galo tribe with handwoven strips and cultural motifs.",
      material: 'Handwoven Cotton', colors: ['Black', 'White'], sizes: ['M', 'L', 'XL'],
      stock: 12, seller, artisanName: 'Jumber Pulu', artisanLocation: 'Along, Arunachal Pradesh',
      artisanExperience: '16 years', origin: 'Arunachal Pradesh', tribe: 'Galo',
      tags: ['men','traditional','handloom'], isApproved: true, rating: 4.8
    },
    {
      name: 'Woven Bamboo Basket Set',
      slug: 'woven-bamboo-basket-set',
      category: catMap['Handicrafts'],
      subCategory: 'Baskets',
      price: 1500, discountPrice: 1299,
      description: 'Set of 3 handwoven bamboo baskets in graduated sizes. Perfect for storage or display.',
      material: 'Bamboo', colors: ['Natural'], sizes: ['S/M/L Set'],
      stock: 20, seller, artisanName: 'Tongam Rina', artisanLocation: 'Tirap, Arunachal Pradesh',
      artisanExperience: '25 years', origin: 'Arunachal Pradesh', tribe: 'Nocte',
      tags: ['unisex','handicraft','bamboo','home-decor'], isApproved: true, rating: 4.4
    },
    {
      name: 'Beaded Tribal Necklace',
      slug: 'beaded-tribal-necklace-2',
      category: catMap['Jewellery'],
      subCategory: 'Beaded Jewellery',
      price: 1800,
      description: 'Multi-strand beaded necklace with vibrant colors reflecting tribal heritage of Arunachal.',
      material: 'Glass Beads & Cotton Thread', colors: ['Multi'], sizes: ['One Size'],
      stock: 30, seller, artisanName: 'Mili Tatak', artisanLocation: 'East Kameng, Arunachal Pradesh',
      artisanExperience: '12 years', origin: 'Arunachal Pradesh',
      tags: ['women','jewellery','beaded','tribal'], isApproved: true, isFeatured: true, rating: 4.7
    },
    {
      name: 'Adi Handwoven Skirt',
      slug: 'adi-handwoven-skirt',
      category: catMap["Women's Traditional Wear"],
      subCategory: 'Traditional Dresses',
      price: 2800,
      description: 'Traditional Adi tribe handwoven skirt with distinctive horizontal stripes and patterns.',
      material: 'Handwoven Cotton', colors: ['Red', 'Black'], sizes: ['S', 'M', 'L'],
      stock: 10, seller, artisanName: 'Narmi Deru', artisanLocation: 'Pasighat, Arunachal Pradesh',
      artisanExperience: '20 years', origin: 'Arunachal Pradesh', tribe: 'Adi',
      tags: ['women','traditional','handloom'], isApproved: true, rating: 4.9
    },
    {
      name: 'Woven Jute Bag',
      slug: 'woven-jute-bag',
      category: catMap['Bags'],
      subCategory: 'Traditional Bags',
      price: 750,
      description: 'Handcrafted jute and cotton blend bag with traditional Arunachal patterns. Eco-friendly and stylish.',
      material: 'Jute & Cotton', colors: ['Brown', 'Beige'], sizes: ['One Size'],
      stock: 45, seller, artisanName: 'Tagak Yirang', artisanLocation: 'Upper Subansiri, Arunachal Pradesh',
      artisanExperience: '10 years', origin: 'Arunachal Pradesh',
      tags: ['women','bags','eco-friendly','handcraft'], isApproved: true, rating: 4.3
    },
    {
      name: 'Nishi Cane Chair',
      slug: 'nishi-cane-chair',
      category: catMap['Handicrafts'],
      subCategory: 'Cane Products',
      price: 4500, discountPrice: 3999,
      description: 'Handcrafted cane chair with traditional Nishi design. Comfortable and durable.',
      material: 'Cane & Bamboo', colors: ['Natural'], sizes: ['Standard'],
      stock: 8, seller, artisanName: 'Tado Taku', artisanLocation: 'Doimukh, Arunachal Pradesh',
      artisanExperience: '35 years', origin: 'Arunachal Pradesh', tribe: 'Nishi',
      tags: ['unisex','handicraft','cane','furniture'], isApproved: true, rating: 4.8
    },
    {
      name: 'Traditional Beaded Bracelet',
      slug: 'traditional-beaded-bracelet',
      category: catMap['Jewellery'],
      subCategory: 'Bracelets',
      price: 450,
      description: 'Handmade beaded bracelet with traditional tribal color patterns. Unisex design.',
      material: 'Glass Beads', colors: ['Red-Black', 'Blue-White', 'Green-Yellow'], sizes: ['One Size'],
      stock: 60, seller, artisanName: 'Rini Tama', artisanLocation: 'Pasighat, Arunachal Pradesh',
      artisanExperience: '6 years', origin: 'Arunachal Pradesh',
      tags: ['unisex','jewellery','beaded','affordable'], isApproved: true, rating: 4.2
    },
    {
      name: 'Handloom Wall Hanging',
      slug: 'handloom-wall-hanging',
      category: catMap['Handloom'],
      subCategory: 'Home Decor',
      price: 2000, discountPrice: 1799,
      description: 'Beautiful handloom wall hanging depicting traditional Arunachal motifs and nature patterns.',
      material: 'Cotton & Wool', colors: ['Multi'], sizes: ['60cm x 90cm'],
      stock: 18, seller, artisanName: 'Mama Yirang', artisanLocation: 'Upper Subansiri, Arunachal Pradesh',
      artisanExperience: '18 years', origin: 'Arunachal Pradesh',
      tags: ['unisex','handloom','home-decor','art'], isApproved: true, isFeatured: true, rating: 4.6
    }
  ];

  try {
    const existingCount = await Product.countDocuments();
    let added = 0;
    for (const p of moreProducts) {
      const exists = await Product.findOne({ slug: p.slug });
      if (!exists) {
        await Product.create(p);
        added++;
      }
    }
    const totalNow = await Product.countDocuments();
    console.log('Products before:', existingCount, '-> now:', totalNow, `(added ${added} new)`);
  } catch (err) {
    console.error('Error:', err.message);
  }
  process.exit(0);
}

addMoreProducts();
