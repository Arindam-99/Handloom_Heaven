const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Category = require('../models/Category');
const User = require('../models/User');
const Product = require('../models/Product');

// Unique Unsplash images for each product category
const images = {
  shawl: [
    'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1601924994987-69e26d50dc64?w=600&h=600&fit=crop',
  ],
  dress: [
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&h=600&fit=crop',
  ],
  men: [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=600&fit=crop',
  ],
  jewellery: [
    'https://images.unsplash.com/photo-1515562141589-67f0d569b47e?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
  ],
  bamboo: [
    'https://images.unsplash.com/photo-1528396518501-b53b655eb9b3?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1505577058444-a3deb90d8c82?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop',
  ],
  handloom: [
    'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop',
  ],
  bag: [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop',
  ],
  home: [
    'https://images.unsplash.com/photo-1616627988170-6c44c4e1e055?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
  ]
};

const categories = [
  { name: "Handloom", description: "Authentic handwoven textiles, shawls, scarves, and fabrics", sortOrder: 1,
    subCategories: [{ name: 'Shawls', slug: 'shawls' }, { name: 'Scarves', slug: 'scarves' }, { name: 'Woven Fabrics', slug: 'woven-fabrics' }, { name: 'Home Décor', slug: 'home-decor' }, { name: 'Stoles', slug: 'stoles' }]
  },
  { name: "Women's Traditional Wear", description: "Authentic traditional dresses, shawls, skirts and blouses from Arunachal Pradesh", sortOrder: 2,
    subCategories: [{ name: 'Traditional Dresses', slug: 'traditional-dresses' }, { name: 'Skirts', slug: 'skirts' }, { name: 'Dupattas', slug: 'dupattas' }, { name: 'Kurtis', slug: 'kurtis' }, { name: 'Blouses', slug: 'blouses' }]
  },
  { name: "Men's Traditional Wear", description: "Traditional jackets, shirts, kurtas and shawls for men", sortOrder: 3,
    subCategories: [{ name: 'Jackets', slug: 'jackets' }, { name: 'Shirts', slug: 'shirts' }, { name: 'Kurtas', slug: 'kurtas' }, { name: 'Wraps', slug: 'wraps' }]
  },
  { name: "Jewellery", description: "Handcrafted traditional jewellery including necklaces, earrings, and tribal ornaments", sortOrder: 4,
    subCategories: [{ name: 'Necklaces', slug: 'necklaces' }, { name: 'Earrings', slug: 'earrings' }, { name: 'Bracelets', slug: 'bracelets' }, { name: 'Headbands', slug: 'headbands' }, { name: 'Pendants', slug: 'pendants' }]
  },
  { name: "Handicrafts", description: "Bamboo, cane, and handcrafted decorative products", sortOrder: 5,
    subCategories: [{ name: 'Wall Hangings', slug: 'wall-hangings' }, { name: 'Baskets', slug: 'baskets' }, { name: 'Bamboo Products', slug: 'bamboo-products' }, { name: 'Decorative Items', slug: 'decorative-items' }]
  },
  { name: "Bags", description: "Handcrafted traditional bags, handbags and purses", sortOrder: 6,
    subCategories: [{ name: 'Traditional Bags', slug: 'traditional-bags' }, { name: 'Handbags', slug: 'handbags' }, { name: 'Woven Bags', slug: 'woven-bags' }]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/arunachal-marketplace');
    console.log('Connected to MongoDB');

    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    await User.findOneAndUpdate(
      { email: 'admin@arunachal.com' },
      { name: 'Admin', email: 'admin@arunachal.com', password: 'admin123', role: 'admin', isActive: true },
      { upsert: true, new: true }
    );

    const seller = await User.findOneAndUpdate(
      { email: 'seller@arunachal.com' },
      { name: 'Rikam Artisans', email: 'seller@arunachal.com', password: 'seller123', role: 'seller', isActive: true },
      { upsert: true, new: true }
    );

    const createdCategories = await Category.insertMany(
      categories.map(c => ({ ...c, slug: c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }))
    );
    console.log(`${createdCategories.length} categories created`);

    const catMap = {};
    createdCategories.forEach(c => { catMap[c.name] = c._id; });

    const allProducts = [
      // === HANDLOOM (5 products) ===
      { name: 'Arunachal Traditional Handwoven Shawl', cat: 'Handloom', sub: 'Shawls', price: 2499, discount: 2199,
        desc: 'A beautifully handwoven shawl featuring traditional Arunachal patterns using centuries-old backstrap loom techniques.',
        material: 'Handwoven Cotton', colors: ['Red', 'Black', 'Maroon'], sizes: ['Free Size'], stock: 20,
        artisan: 'Mama Yirang', artisanLoc: 'Upper Subansiri', artisanExp: '18 years',
        story: 'This shawl is woven by artisans of Upper Subansiri using traditional backstrap loom techniques passed down through generations.', img: images.shawl, tags: ['women', 'handloom', 'traditional'], featured: true, rating: 4.8 },
      { name: 'Traditional Handloom Stole', cat: 'Handloom', sub: 'Stoles', price: 1100,
        desc: 'An elegant handwoven stole with delicate traditional patterns. Lightweight and versatile for everyday wear.',
        material: 'Cotton Silk Blend', colors: ['Cream', 'Green', 'Blue'], sizes: ['Free Size'], stock: 35,
        artisan: 'Yamang Tani', artisanLoc: 'Lower Subansiri', artisanExp: '14 years',
        story: 'Crafted by skilled weavers of the Apatani tribe using fine cotton-silk blend threads.', img: images.handloom, tags: ['women', 'handloom'], rating: 4.5 },
      { name: 'Arunachal Traditional Scarf', cat: 'Handloom', sub: 'Scarves', price: 850,
        desc: 'A lightweight traditional scarf with authentic geometric patterns from Arunachal Pradesh.',
        material: 'Handwoven Cotton', colors: ['Red', 'Orange', 'Green'], sizes: ['Free Size'], stock: 40,
        artisan: 'Neelam Dui', artisanLoc: 'Papum Pare', artisanExp: '10 years',
        story: 'Each scarf features traditional motifs that represent the natural beauty of Arunachal Pradesh.', img: images.shawl.slice(1), tags: ['unisex', 'handloom'], rating: 4.3 },
      { name: 'Woolen Shawl from Tawang', cat: 'Handloom', sub: 'Shawls', price: 3200, discount: 2900,
        desc: 'A premium woolen shawl from the Monpa tribe of Tawang. Warm, luxurious and deeply cultural.',
        material: 'Pure Wool', colors: ['Maroon', 'Grey', 'Brown'], sizes: ['Free Size'], stock: 15,
        artisan: 'Tenzin Dorjee', artisanLoc: 'Tawang', artisanExp: '22 years',
        story: 'This woolen shawl is handwoven by Monpa artisans in Tawang using traditional patterns unique to their tribe.', img: images.handloom.slice(1), tags: ['unisex', 'handloom', 'winter'], rating: 4.9 },
      { name: 'Handloom Wrap Dress', cat: 'Handloom', sub: 'Woven Fabrics', price: 1800,
        desc: 'A versatile handloom wrap fabric that can be styled as a dress, skirt or shawl.',
        material: 'Handwoven Cotton', colors: ['Indigo', 'Rust'], sizes: ['Free Size'], stock: 25,
        artisan: 'Yamang Tani', artisanLoc: 'Lower Subansiri', artisanExp: '20 years',
        story: 'Inspired by traditional Apatani wrap garments, this versatile piece celebrates the weaving heritage.', img: images.handloom.slice(2), tags: ['women', 'handloom'], rating: 4.4 },

      // === WOMEN'S TRADITIONAL WEAR (5 products) ===
      { name: "Traditional Women's Handloom Dress", cat: "Women's Traditional Wear", sub: 'Traditional Dresses', price: 2800, discount: 2500,
        desc: 'A stunning traditional handloom dress with authentic Arunachal patterns and vibrant colors.',
        material: 'Handwoven Cotton', colors: ['Red', 'Blue', 'Green'], sizes: ['S', 'M', 'L', 'XL'], stock: 18,
        artisan: 'Yamang Tani', artisanLoc: 'Lower Subansiri', artisanExp: '20 years',
        story: 'This dress is inspired by the traditional attire of the Apatani women, known for their distinctive weaving patterns.', img: images.dress, tags: ['women', 'traditional', 'handloom'], featured: true, rating: 4.6 },
      { name: 'Handwoven Saree', cat: "Women's Traditional Wear", sub: 'Traditional Dresses', price: 3500,
        desc: 'An elegant handwoven saree with traditional Arunachal motifs. A statement piece for cultural occasions.',
        material: 'Handwoven Cotton Silk', colors: ['Red & Black', 'Blue & Gold'], sizes: ['Free Size'], stock: 12,
        artisan: 'Mama Yirang', artisanLoc: 'Upper Subansiri', artisanExp: '18 years',
        story: 'This saree blends the weaving traditions of Arunachal with the classic saree drape for a unique cultural statement.', img: images.dress.slice(1), tags: ['women', 'traditional'], rating: 4.7 },
      { name: 'Traditional Cotton Skirt', cat: "Women's Traditional Wear", sub: 'Skirts', price: 1800,
        desc: 'Beautiful traditional cotton skirt with handwoven patterns from Arunachal Pradesh.',
        material: 'Handwoven Cotton', colors: ['Blue', 'Green', 'Red'], sizes: ['S', 'M', 'L', 'XL'], stock: 25,
        artisan: 'Yamang Tani', artisanLoc: 'Lower Subansiri', artisanExp: '20 years',
        story: 'This skirt is inspired by the traditional attire of the Apatani women, known for their distinctive weaving patterns.', img: images.dress.slice(2), tags: ['women', 'traditional'], rating: 4.4 },
      { name: 'Handloom Kurti', cat: "Women's Traditional Wear", sub: 'Kurtis', price: 1600,
        desc: 'A contemporary handloom kurti with traditional Arunachal design elements. Perfect for daily wear.',
        material: 'Handwoven Cotton', colors: ['White', 'Indigo', 'Green'], sizes: ['S', 'M', 'L', 'XL'], stock: 30,
        artisan: 'Neelam Dui', artisanLoc: 'Papum Pare', artisanExp: '10 years',
        story: 'Modern kurti design infused with traditional Arunachal weaving patterns for everyday elegance.', img: images.dress.slice(0, 1), tags: ['women', 'handloom'], rating: 4.3 },
      { name: 'Handwoven Dupatta', cat: "Women's Traditional Wear", sub: 'Dupattas', price: 1200,
        desc: 'A gorgeous handwoven dupatta with intricate tribal patterns. Pairs beautifully with any outfit.',
        material: 'Handwoven Cotton', colors: ['Red & Gold', 'Blue & White'], sizes: ['Free Size'], stock: 28,
        artisan: 'Mama Yirang', artisanLoc: 'Upper Subansiri', artisanExp: '18 years',
        story: 'Each dupatta features traditional patterns that symbolize prosperity and cultural pride.', img: images.dress.slice(1, 2), tags: ['women', 'handloom'], rating: 4.5 },

      // === MEN'S TRADITIONAL WEAR (4 products) ===
      { name: "Men's Traditional Handloom Jacket", cat: "Men's Traditional Wear", sub: 'Jackets', price: 3500, discount: 3200,
        desc: "A traditional men's jacket with authentic Arunachal patterns. Perfect for cultural occasions and daily wear.",
        material: 'Handwoven Cotton', colors: ['Black', 'Red'], sizes: ['S', 'M', 'L', 'XL'], stock: 15,
        artisan: 'Gumro Yarkam', artisanLoc: 'West Kameng', artisanExp: '15 years',
        story: 'This jacket represents the warrior spirit of the Monpa tribe. The patterns are traditionally worn during festivals.', img: images.men, tags: ['men', 'traditional', 'handloom'], featured: true, rating: 4.7 },
      { name: 'Handwoven Shirt', cat: "Men's Traditional Wear", sub: 'Shirts', price: 2200,
        desc: 'A traditional handwoven shirt with unique Arunachal patterns. Comfortable and stylish for any occasion.',
        material: 'Handwoven Cotton', colors: ['White & Blue', 'Black & Red'], sizes: ['M', 'L', 'XL'], stock: 20,
        artisan: 'Gumro Yarkam', artisanLoc: 'West Kameng', artisanExp: '15 years',
        story: 'This shirt showcases the fine weaving skills of West Kameng artisans with contemporary styling.', img: images.men.slice(1), tags: ['men', 'handloom'], rating: 4.5 },
      { name: 'Traditional Waistcoat', cat: "Men's Traditional Wear", sub: 'Jackets', price: 2000,
        desc: 'A traditional men\'s waistcoat with handwoven patterns. Perfect layering piece for any outfit.',
        material: 'Handwoven Cotton', colors: ['Black', 'Navy'], sizes: ['M', 'L', 'XL'], stock: 18,
        artisan: 'Tongam Rina', artisanLoc: 'Tirap', artisanExp: '25 years',
        story: 'This waistcoat features patterns inspired by the Nocte tribe\'s traditional attire.', img: images.men.slice(2), tags: ['men', 'traditional'], rating: 4.4 },
      { name: 'Handloom Kurta', cat: "Men's Traditional Wear", sub: 'Kurtas', price: 2500,
        desc: 'An elegant handloom kurta with subtle traditional patterns. Perfect for festivals and special occasions.',
        material: 'Handwoven Cotton', colors: ['White', 'Cream', 'Indigo'], sizes: ['M', 'L', 'XL', 'XXL'], stock: 22,
        artisan: 'Gumro Yarkam', artisanLoc: 'West Kameng', artisanExp: '15 years',
        story: 'This kurta blends traditional Arunachal aesthetics with modern comfort for the discerning wearer.', img: images.men.slice(0, 1), tags: ['men', 'handloom', 'traditional'], rating: 4.6 },

      // === JEWELLERY (5 products) ===
      { name: 'Nyishi Tribal Beaded Necklace', cat: 'Jewellery', sub: 'Necklaces', price: 1500,
        desc: 'Handcrafted beaded necklace with traditional tribal patterns. Made with natural beads and traditional techniques.',
        material: 'Natural Beads & Cotton Thread', colors: ['Multi-color'], sizes: ['One Size'], stock: 30,
        artisan: 'Mili Tatak', artisanLoc: 'East Kameng', artisanExp: '12 years',
        story: 'Each bead is carefully selected and strung by hand following centuries-old tribal jewellery-making traditions of the Nyishi tribe.', img: images.jewellery, tags: ['women', 'jewellery', 'tribal'], featured: true, rating: 4.6 },
      { name: 'Handmade Beaded Earrings', cat: 'Jewellery', sub: 'Earrings', price: 950,
        desc: 'Beautiful handmade beaded earrings with traditional tribal designs. Lightweight and elegant.',
        material: 'Natural Beads & Silver Wire', colors: ['Multi-color', 'Red & Black'], sizes: ['One Size'], stock: 45,
        artisan: 'Mili Tatak', artisanLoc: 'East Kameng', artisanExp: '12 years',
        story: 'These earrings are inspired by traditional Adi tribe beadwork, each piece unique in color combination.', img: images.jewellery.slice(1), tags: ['women', 'jewellery'], rating: 4.5 },
      { name: 'Tribal Bracelet', cat: 'Jewellery', sub: 'Bracelets', price: 650,
        desc: 'Handmade tribal bracelet with authentic patterns. A beautiful everyday accessory.',
        material: 'Natural Beads & Cotton Thread', colors: ['Red & Black', 'Blue & White'], sizes: ['One Size'], stock: 50,
        artisan: 'Mili Tatak', artisanLoc: 'East Kameng', artisanExp: '12 years',
        story: 'Each bracelet is woven with patterns that represent unity and strength in tribal culture.', img: images.jewellery.slice(2), tags: ['unisex', 'jewellery'], rating: 4.3 },
      { name: 'Bamboo Jewellery Set', cat: 'Jewellery', sub: 'Necklaces', price: 1200,
        desc: 'Unique bamboo jewellery set including necklace and earrings. Eco-friendly and stylish.',
        material: 'Bamboo & Natural Dyes', colors: ['Natural', 'Brown'], sizes: ['One Size'], stock: 25,
        artisan: 'Tongam Rina', artisanLoc: 'Tirap', artisanExp: '25 years',
        story: 'This innovative bamboo jewellery combines traditional craftsmanship with sustainable materials.', img: images.jewellery.slice(0, 1), tags: ['women', 'jewellery', 'eco-friendly'], rating: 4.4 },
      { name: 'Traditional Headband', cat: 'Jewellery', sub: 'Headbands', price: 450,
        desc: 'A traditional tribal headband with intricate beadwork. Perfect for cultural events and festivals.',
        material: 'Beads & Cotton Thread', colors: ['Red & White', 'Multi-color'], sizes: ['One Size'], stock: 40,
        artisan: 'Neelam Dui', artisanLoc: 'Papum Pare', artisanExp: '10 years',
        story: 'This headband is traditionally worn during festivals and cultural celebrations of the Apatani tribe.', img: images.jewellery.slice(1, 2), tags: ['unisex', 'jewellery', 'traditional'], rating: 4.6 },

      // === HANDICRAFTS (5 products) ===
      { name: 'Arunachal Tribal Wall Hanging', cat: 'Handicrafts', sub: 'Wall Hangings', price: 2000,
        desc: 'A stunning tribal wall hanging with intricate handwoven patterns. Perfect statement piece for any room.',
        material: 'Handwoven Cotton & Bamboo', colors: ['Red & Black', 'Blue & White'], sizes: ['Large (60cm x 40cm)'], stock: 20,
        artisan: 'Mama Yirang', artisanLoc: 'Upper Subansiri', artisanExp: '18 years',
        story: 'This wall hanging depicts traditional motifs that tell stories of the natural world and tribal legends.', img: images.home, tags: ['home', 'handicraft', 'traditional'], featured: true, rating: 4.7 },
      { name: 'Handmade Bamboo Basket', cat: 'Handicrafts', sub: 'Baskets', price: 899,
        desc: 'Eco-friendly handcrafted bamboo basket. Perfect for home storage or as a decorative piece.',
        material: 'Bamboo', colors: ['Natural', 'Brown'], sizes: ['Medium', 'Large'], stock: 50,
        artisan: 'Tongam Rina', artisanLoc: 'Tirap', artisanExp: '25 years',
        story: 'Bamboo weaving is an integral part of Arunachal culture. This basket is crafted using techniques unique to the Nocte tribe.', img: images.bamboo, tags: ['unisex', 'handicraft', 'bamboo'], rating: 4.5 },
      { name: 'Tribal Pattern Cushion Cover', cat: 'Handicrafts', sub: 'Decorative Items', price: 750,
        desc: 'Handwoven cushion cover with traditional tribal patterns. Adds cultural charm to any space.',
        material: 'Handwoven Cotton', colors: ['Red & Black', 'Blue & Gold'], sizes: ['16x16 inches', '18x18 inches'], stock: 35,
        artisan: 'Yamang Tani', artisanLoc: 'Lower Subansiri', artisanExp: '20 years',
        story: 'Each cushion cover features patterns inspired by traditional tribal motifs of the Apatani community.', img: images.home.slice(1), tags: ['home', 'handicraft'], rating: 4.4 },
      { name: 'Handmade Table Mat Set', cat: 'Handicrafts', sub: 'Decorative Items', price: 650,
        desc: 'Set of 4 handwoven table mats with traditional patterns. Eco-friendly and beautiful.',
        material: 'Handwoven Bamboo & Cotton', colors: ['Natural', 'Brown'], sizes: ['Standard (30x40cm)'], stock: 40,
        artisan: 'Tongam Rina', artisanLoc: 'Tirap', artisanExp: '25 years',
        story: 'These mats are woven using sustainable bamboo strips and natural dyes following traditional Nocte techniques.', img: images.bamboo.slice(1), tags: ['home', 'handicraft', 'eco-friendly'], rating: 4.3 },
      { name: 'Decorative Tribal Items', cat: 'Handicrafts', sub: 'Decorative Items', price: 1500,
        desc: 'Hand-carved decorative tribal items made from bamboo and wood. Unique collectible pieces.',
        material: 'Bamboo & Wood', colors: ['Natural'], sizes: ['Small', 'Medium'], stock: 15,
        artisan: 'Tongam Rina', artisanLoc: 'Tirap', artisanExp: '25 years',
        story: 'These hand-carved pieces represent the rich cultural heritage and artistic traditions of Arunachal tribes.', img: images.home.slice(2), tags: ['home', 'handicraft', 'collectible'], rating: 4.8 },

      // === BAGS (4 products) ===
      { name: 'Bamboo Handcrafted Bag', cat: 'Bags', sub: 'Traditional Bags', price: 1600,
        desc: 'A unique handcrafted bag made from sustainable bamboo strips. Eco-friendly and stylish.',
        material: 'Bamboo', colors: ['Natural', 'Brown'], sizes: ['Medium'], stock: 22,
        artisan: 'Tongam Rina', artisanLoc: 'Tirap', artisanExp: '25 years',
        story: 'This bag showcases the incredible versatility of bamboo weaving, a skill perfected over generations.', img: images.bag, tags: ['women', 'bag', 'eco-friendly'], featured: true, rating: 4.5 },
      { name: 'Handwoven Jute Bag', cat: 'Bags', sub: 'Woven Bags', price: 750,
        desc: 'A sturdy handwoven jute bag with traditional patterns. Perfect for daily use.',
        material: 'Jute & Cotton', colors: ['Natural', 'Brown'], sizes: ['Large'], stock: 40,
        artisan: 'Neelam Dui', artisanLoc: 'Papum Pare', artisanExp: '10 years',
        story: 'These jute bags combine traditional weaving techniques with modern functionality.', img: images.bag.slice(1), tags: ['unisex', 'bag', 'eco-friendly'], rating: 4.3 },
      { name: 'Traditional Woven Backpack', cat: 'Bags', sub: 'Traditional Bags', price: 2200,
        desc: 'A traditional woven backpack with authentic Arunachal patterns. Durable and distinctive.',
        material: 'Handwoven Cotton & Bamboo Frame', colors: ['Red & Black', 'Blue & White'], sizes: ['One Size'], stock: 18,
        artisan: 'Mama Yirang', artisanLoc: 'Upper Subansiri', artisanExp: '18 years',
        story: 'Inspired by traditional carrying baskets, this backpack brings ancient design to modern life.', img: images.bag.slice(2), tags: ['unisex', 'bag', 'traditional'], rating: 4.6 },
      { name: 'Handmade Cane Clutch', cat: 'Bags', sub: 'Handbags', price: 900,
        desc: 'An elegant handmade cane clutch with intricate weaving. Perfect for special occasions.',
        material: 'Cane & Bamboo', colors: ['Natural', 'Dark Brown'], sizes: ['One Size'], stock: 25,
        artisan: 'Tongam Rina', artisanLoc: 'Tirap', artisanExp: '25 years',
        story: 'This clutch is woven from fine cane strips using techniques passed down through Nocte artisans.', img: images.bag.slice(0, 1), tags: ['women', 'bag', 'handicraft'], rating: 4.4 },
    ];

    let count = 0;
    for (const p of allProducts) {
      const catId = catMap[p.cat];
      if (!catId) { console.log(`Category not found: ${p.cat}`); continue; }
      const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      try {
        await Product.findOneAndUpdate(
          { slug },
          {
            name: p.name, slug, category: catId, subCategory: p.sub,
            price: p.price, discountPrice: p.discount || 0,
            description: p.desc, material: p.material,
            colors: p.colors, sizes: p.sizes, stock: p.stock,
            seller: seller._id,
            artisanName: p.artisan, artisanLocation: p.artisanLoc + ', Arunachal Pradesh',
            artisanExperience: p.artisanExp,
            origin: 'Arunachal Pradesh',
            storyBehindProduct: p.story,
            images: p.img.map(url => ({ url, alt: p.name })),
            tags: p.tags, isApproved: true, isActive: true,
            isFeatured: p.featured || false,
            rating: p.rating, numReviews: Math.floor(Math.random() * 30) + 5,
            totalSold: Math.floor(Math.random() * 50) + 10
          },
          { upsert: true, new: true }
        );
        count++;
      } catch (err) {
        console.log(`Error with ${p.name}: ${err.message}`);
      }
    }

    console.log(`${count} products seeded successfully!`);
    console.log('Admin: admin@arunachal.com / admin123');
    console.log('Seller: seller@arunachal.com / seller123');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedDB();
