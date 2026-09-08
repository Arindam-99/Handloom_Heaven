const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');

// All NEW unique Unsplash images - none overlap with existing products
const newProducts = [
  // === HANDLOOM (3 more) ===
  {
    name: 'Monpa Handwoven Blanket',
    slug: 'monpa-handwoven-blanket',
    description: 'A thick, warm handwoven blanket from Monpa artisans of Tawang. Traditional patterns with natural dyes.',
    price: 4500,
    material: 'Merino Wool',
    origin: 'Tawang, Arunachal Pradesh',
    colors: ['Red & Black', 'Blue & White'],
    sizes: ['Double'],
    stock: 10,
    rating: 4.8,
    numReviews: 12,
    artisanName: 'Tenzin Dolma',
    artisanLocation: 'Tawang, Arunachal Pradesh',
    artisanExperience: '20 years',
    storyBehindProduct: 'Handwoven on traditional backstrap looms using techniques unique to the Monpa people of Tawang. Each blanket takes over 2 weeks to complete.',
    tags: ['unisex', 'blanket', 'handloom'],
    images: [
      { url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=600&fit=crop', alt: 'Handwoven blanket' },
      { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop', alt: 'Woolen blanket detail' },
      { url: 'https://images.unsplash.com/photo-1616627988170-6c44c4e1e055?w=600&h=600&fit=crop', alt: 'Traditional weaving' },
    ]
  },
  {
    name: 'Apatani Woven Table Runner',
    slug: 'apatani-woven-table-runner',
    description: 'A beautifully woven table runner with Apatani tribal patterns. Perfect for home decoration.',
    price: 1200,
    material: 'Handloom Cotton',
    origin: 'Ziro Valley, Arunachal Pradesh',
    colors: ['Natural', 'Indigo'],
    sizes: ['Standard'],
    stock: 20,
    rating: 4.5,
    numReviews: 8,
    artisanName: 'Hage Appa',
    artisanLocation: 'Ziro Valley, Arunachal Pradesh',
    artisanExperience: '15 years',
    storyBehindProduct: 'The Apatani women are known for their exceptional weaving skills. This table runner features traditional geometric patterns that tell stories of the harvest.',
    tags: ['home', 'table', 'handloom'],
    images: [
      { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=600&fit=crop', alt: 'Table runner' },
      { url: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&h=600&fit=crop', alt: 'Woven pattern' },
      { url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&h=600&fit=crop', alt: 'Table decoration' },
    ]
  },
  {
    name: 'Handwoven Cushion Set',
    slug: 'handwoven-cushion-set',
    description: 'A set of two handwoven cushion covers with traditional Arunachal patterns. Adds warmth to any room.',
    price: 1800,
    material: 'Cotton & Wool Blend',
    origin: 'Itanagar, Arunachal Pradesh',
    colors: ['Earth Tones', 'Red & Cream'],
    sizes: ['16x16 inch'],
    stock: 15,
    rating: 4.6,
    numReviews: 14,
    artisanName: 'Ngamwang Lowang',
    artisanLocation: 'Itanagar, Arunachal Pradesh',
    artisanExperience: '12 years',
    storyBehindProduct: 'Each cushion cover is woven on a floor loom using traditional patterns that have been in the family for generations.',
    tags: ['home', 'cushion', 'handloom'],
    images: [
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop', alt: 'Cushion set' },
      { url: 'https://images.unsplash.com/photo-1616627988170-6c44c4e1e055?w=600&h=600&fit=crop', alt: 'Cushion detail' },
      { url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=600&fit=crop', alt: 'Home styling' },
    ]
  },

  // === WOMEN'S WEAR (3 more) ===
  {
    name: 'Traditional Phanek',
    slug: 'traditional-phanek',
    description: 'A traditional Meitei-style wrap skirt worn by women of Arunachal Pradesh. Handwoven with intricate borders.',
    price: 2200,
    material: 'Handloom Silk',
    origin: 'Imphal influenced, Arunachal Pradesh',
    colors: ['Maroon', 'Royal Blue'],
    sizes: ['Free Size'],
    stock: 12,
    rating: 4.7,
    numReviews: 9,
    artisanName: 'Yamang Yapi',
    artisanLocation: ' Naharlagun, Arunachal Pradesh',
    artisanExperience: '18 years',
    storyBehindProduct: 'The Phanek is a traditional wrap-around skirt that symbolizes the grace and strength of Northeast Indian women.',
    tags: ['women', 'skirt', 'traditional'],
    images: [
      { url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop', alt: 'Traditional phanek' },
      { url: 'https://images.unsplash.com/photo-1596450514735-111a672a949d?w=600&h=600&fit=crop', alt: 'Silk fabric' },
      { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop', alt: 'Wrap skirt' },
    ]
  },
  {
    name: 'Handwoven Cotton Blouse',
    slug: 'handwoven-cotton-blouse',
    description: 'A comfortable handwoven cotton blouse with traditional embroidery. Perfect for everyday ethnic wear.',
    price: 1400,
    material: 'Handloom Cotton',
    origin: 'Arunachal Pradesh',
    colors: ['White', 'Off-White'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 25,
    rating: 4.4,
    numReviews: 11,
    artisanName: 'Liomi Riba',
    artisanLocation: 'Pasighat, Arunachal Pradesh',
    artisanExperience: '10 years',
    storyBehindProduct: 'This blouse is handwoven on a frame loom using unbleached cotton, preserving the natural cream color of the fiber.',
    tags: ['women', 'blouse', 'cotton'],
    images: [
      { url: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&h=600&fit=crop', alt: 'Cotton blouse' },
      { url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop', alt: 'Embroidery detail' },
      { url: 'https://images.unsplash.com/photo-1596450514735-111a672a949d?w=600&h=600&fit=crop', alt: 'Traditional blouse' },
    ]
  },
  {
    name: 'Woven Wrap Top',
    slug: 'woven-wrap-top',
    description: 'A modern wrap top made from handwoven fabric. Blends traditional craft with contemporary style.',
    price: 1650,
    material: 'Handloom Cotton',
    origin: 'Arunachal Pradesh',
    colors: ['Indigo', 'Terracotta'],
    sizes: ['S', 'M', 'L'],
    stock: 18,
    rating: 4.5,
    numReviews: 7,
    artisanName: 'Mili Tatak',
    artisanLocation: 'Itanagar, Arunachal Pradesh',
    artisanExperience: '12 years',
    storyBehindProduct: 'A contemporary design that brings traditional handloom into modern fashion. Each piece is unique due to the handweaving process.',
    tags: ['women', 'top', 'handloom'],
    images: [
      { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop', alt: 'Wrap top' },
      { url: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&h=600&fit=crop', alt: 'Woven fabric' },
      { url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop', alt: 'Style detail' },
    ]
  },

  // === MEN'S WEAR (3 more) ===
  {
    name: 'Handwoven Nehru Jacket',
    slug: 'handwoven-nehru-jacket',
    description: 'A classic Nehru jacket handwoven from traditional fabric. Perfect for festive occasions.',
    price: 3200,
    material: 'Handloom Wool',
    origin: 'Arunachal Pradesh',
    colors: ['Charcoal', 'Navy'],
    sizes: ['M', 'L', 'XL'],
    stock: 12,
    rating: 4.7,
    numReviews: 15,
    artisanName: 'Tongam Rina',
    artisanLocation: 'Tirap, Arunachal Pradesh',
    artisanExperience: '25 years',
    storyBehindProduct: 'This Nehru jacket combines pan-Indian elegance with Arunachal weaving traditions. The wool is sourced locally from sheep reared in the hills.',
    tags: ['men', 'jacket', 'formal'],
    images: [
      { url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop', alt: 'Nehru jacket' },
      { url: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=600&fit=crop', alt: 'Jacket detail' },
      { url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop', alt: 'Formal jacket' },
    ]
  },
  {
    name: 'Traditional Men\'s Vest',
    slug: 'traditional-mens-vest',
    description: 'A sleeveless vest in traditional tribal pattern. Made from handwoven cotton with bamboo buttons.',
    price: 1800,
    material: 'Handloom Cotton',
    origin: 'Arunachal Pradesh',
    colors: ['Black & Red', 'Blue & White'],
    sizes: ['M', 'L', 'XL'],
    stock: 20,
    rating: 4.5,
    numReviews: 10,
    artisanName: 'Mama Yirang',
    artisanLocation: 'Upper Subansiri, Arunachal Pradesh',
    artisanExperience: '18 years',
    storyBehindProduct: 'The vest is a staple in many tribal communities of Arunachal. The geometric patterns identify the wearer\'s tribal affiliation.',
    tags: ['men', 'vest', 'traditional'],
    images: [
      { url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop', alt: 'Traditional vest' },
      { url: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=600&fit=crop', alt: 'Vest detail' },
      { url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop', alt: 'Handwoven vest' },
    ]
  },
  {
    name: 'Cotton Lungi for Men',
    slug: 'cotton-lungi-for-men',
    description: 'A traditional handwoven cotton lungi with border patterns. Comfortable daily wear.',
    price: 800,
    material: 'Handloom Cotton',
    origin: 'Arunachal Pradesh',
    colors: ['Blue', 'Green'],
    sizes: ['Free Size'],
    stock: 30,
    rating: 4.3,
    numReviews: 6,
    artisanName: 'Jummo Tatak',
    artisanLocation: 'Pasighat, Arunachal Pradesh',
    artisanExperience: '14 years',
    storyBehindProduct: 'The lungi is handwoven on a traditional loom using locally grown cotton. The border patterns are unique to the Adi community.',
    tags: ['men', 'lungi', 'casual'],
    images: [
      { url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop', alt: 'Cotton lungi' },
      { url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop', alt: 'Woven pattern' },
      { url: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=600&fit=crop', alt: 'Border detail' },
    ]
  },

  // === JEWELLERY (3 more) ===
  {
    name: 'Conch Shell Necklace',
    slug: 'conch-shell-necklace',
    description: 'A traditional necklace made from polished conch shell beads. Worn by tribal women during festivals.',
    price: 850,
    material: 'Conch Shell & Cotton Thread',
    origin: 'Arunachal Pradesh',
    colors: ['White', 'Cream'],
    sizes: ['Free Size'],
    stock: 30,
    rating: 4.6,
    numReviews: 18,
    artisanName: 'Saddie Sink',
    artisanLocation: 'Ziro Valley, Arunachal Pradesh',
    artisanExperience: '12 years',
    storyBehindProduct: 'Conch shell necklaces are an integral part of tribal identity. Each bead is hand-carved and polished using traditional methods.',
    tags: ['women', 'necklace', 'tribal'],
    images: [
      { url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop', alt: 'Conch necklace' },
      { url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop', alt: 'Shell beads' },
      { url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop', alt: 'Tribal necklace' },
    ]
  },
  {
    name: 'Silver Tribal Ring',
    slug: 'silver-tribal-ring',
    description: 'A handcrafted silver ring with tribal motifs. Each ring is unique with traditional engravings.',
    price: 750,
    material: 'Sterling Silver',
    origin: 'Arunachal Pradesh',
    colors: ['Silver'],
    sizes: ['6', '7', '8', '9'],
    stock: 25,
    rating: 4.8,
    numReviews: 22,
    artisanName: 'Panther',
    artisanLocation: 'Khonsa, Arunachal Pradesh',
    artisanExperience: '20 years',
    storyBehindProduct: 'Silver jewellery holds deep spiritual significance in Arunachal cultures. The motifs represent nature, protection, and prosperity.',
    tags: ['unisex', 'ring', 'silver'],
    images: [
      { url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop', alt: 'Silver ring' },
      { url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop', alt: 'Tribal ring detail' },
      { url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop', alt: 'Ring display' },
    ]
  },
  {
    name: 'Bamboo Bangle Set',
    slug: 'bamboo-bangle-set',
    description: 'A set of 4 handcrafted bamboo bangles with tribal patterns. Lightweight and eco-friendly.',
    price: 550,
    material: 'Bamboo & Natural Dye',
    origin: 'Arunachal Pradesh',
    colors: ['Natural', 'Painted'],
    sizes: ['Free Size'],
    stock: 35,
    rating: 4.4,
    numReviews: 16,
    artisanName: 'Saddie Sink',
    artisanLocation: 'Ziro Valley, Arunachal Pradesh',
    artisanExperience: '12 years',
    storyBehindProduct: 'Bamboo crafting is an ancient art in Arunachal Pradesh. These bangles are made from a single bamboo strip, shaped and polished by hand.',
    tags: ['women', 'bangles', 'bamboo'],
    images: [
      { url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop', alt: 'Bamboo bangles' },
      { url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop', alt: 'Bangle set' },
      { url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop', alt: 'Bangles display' },
    ]
  },

  // === HANDICRAFTS (3 more) ===
  {
    name: 'Bamboo Flower Vase',
    slug: 'bamboo-flower-vase',
    description: 'A handcrafted bamboo flower vase with intricate weaving patterns. Perfect for home décor.',
    price: 950,
    material: 'Bamboo',
    origin: 'Arunachal Pradesh',
    colors: ['Natural', 'Dark Brown'],
    sizes: ['Medium'],
    stock: 20,
    rating: 4.6,
    numReviews: 11,
    artisanName: 'Peter Parker',
    artisanLocation: 'Ziro Valley, Arunachal Pradesh',
    artisanExperience: '25 years',
    storyBehindProduct: 'Bamboo weaving is an integral part of Arunachal culture. This vase is woven using a technique called "miching" passed down through generations.',
    tags: ['home', 'vase', 'bamboo'],
    images: [
      { url: 'https://images.unsplash.com/photo-1612363148951-15f16817648f?w=600&h=600&fit=crop', alt: 'Bamboo vase' },
      { url: 'https://images.unsplash.com/photo-1505577058444-a3deb90d8c82?w=600&h=600&fit=crop', alt: 'Bamboo craft' },
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop', alt: 'Vase detail' },
    ]
  },
  {
    name: 'Cane Chair',
    slug: 'traditional-cane-chair',
    description: 'A handcrafted cane chair with traditional weaving. Sturdy, comfortable and eco-friendly.',
    price: 5500,
    material: 'Cane & Bamboo',
    origin: 'Arunachal Pradesh',
    colors: ['Natural'],
    sizes: ['Standard'],
    stock: 8,
    rating: 4.9,
    numReviews: 7,
    artisanName: 'Peter Parker',
    artisanLocation: 'Ziro Valley, Arunachal Pradesh',
    artisanExperience: '25 years',
    storyBehindProduct: 'Cane furniture has been crafted in Arunachal for centuries. This chair uses cane harvested from sustainable forests in the foothills.',
    tags: ['home', 'furniture', 'cane'],
    images: [
      { url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=600&fit=crop', alt: 'Cane chair' },
      { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop', alt: 'Chair detail' },
      { url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=600&fit=crop', alt: 'Cane weaving' },
    ]
  },
  {
    name: 'Bamboo Tea Coaster Set',
    slug: 'bamboo-tea-coaster-set',
    description: 'A set of 6 hand-painted bamboo tea coasters with tribal motifs. Functional art for your home.',
    price: 450,
    material: 'Bamboo',
    origin: 'Arunachal Pradesh',
    colors: ['Natural'],
    sizes: ['3.5 inch diameter'],
    stock: 40,
    rating: 4.5,
    numReviews: 20,
    artisanName: 'Loki',
    artisanLocation: 'Itanagar, Arunachal Pradesh',
    artisanExperience: '15 years',
    storyBehindProduct: 'Each coaster is hand-cut from a single bamboo culm and painted with traditional Apatani motifs representing nature and harmony.',
    tags: ['home', 'coaster', 'bamboo'],
    images: [
      { url: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600&h=600&fit=crop', alt: 'Bamboo coasters' },
      { url: 'https://images.unsplash.com/photo-1505577058444-a3deb90d8c82?w=600&h=600&fit=crop', alt: 'Coaster set' },
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop', alt: 'Tribal motif' },
    ]
  },

  // === BAGS (3 more) ===
  {
    name: 'Handwoven Sling Bag',
    slug: 'handwoven-sling-bag',
    description: 'A compact handwoven sling bag with leather strap. Perfect for daily use and travel.',
    price: 1100,
    material: 'Handloom Cotton & Leather',
    origin: 'Arunachal Pradesh',
    colors: ['Indigo', 'Brown'],
    sizes: ['One Size'],
    stock: 22,
    rating: 4.6,
    numReviews: 13,
    artisanName: 'Mama Yirang',
    artisanLocation: 'Upper Subansiri, Arunachal Pradesh',
    artisanExperience: '18 years',
    storyBehindProduct: 'This sling bag blends traditional weaving with modern functionality. The leather strap is sourced from local tanneries.',
    tags: ['women', 'bag', 'sling'],
    images: [
      { url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop', alt: 'Sling bag' },
      { url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop', alt: 'Bag detail' },
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop', alt: 'Woven bag' },
    ]
  },
  {
    name: 'Traditional Market Basket',
    slug: 'traditional-market-basket',
    description: 'A large bamboo market basket used by local women. Sturdy, spacious and authentically handwoven.',
    price: 650,
    material: 'Bamboo',
    origin: 'Arunachal Pradesh',
    colors: ['Natural'],
    sizes: ['Large'],
    stock: 25,
    rating: 4.4,
    numReviews: 9,
    artisanName: 'Peter Parker',
    artisanLocation: 'Ziro Valley, Arunachal Pradesh',
    artisanExperience: '25 years',
    storyBehindProduct: 'This basket is the kind used daily by women in local markets across Arunachal. The wide mouth and deep body make it perfect for carrying produce.',
    tags: ['unisex', 'basket', 'bamboo'],
    images: [
      { url: 'https://images.unsplash.com/photo-1505577058444-a3deb90d8c82?w=600&h=600&fit=crop', alt: 'Market basket' },
      { url: 'https://images.unsplash.com/photo-1528396518501-b53b655eb9b3?w=600&h=600&fit=crop', alt: 'Bamboo weave' },
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop', alt: 'Basket detail' },
    ]
  },
  {
    name: 'Embroidered Potli Bag',
    slug: 'embroidered-potli-bag',
    description: 'A small drawstring potli bag with traditional embroidery. Perfect for festivals and special occasions.',
    price: 580,
    material: 'Cotton & Silk Thread',
    origin: 'Arunachal Pradesh',
    colors: ['Red', 'Maroon'],
    sizes: ['Small'],
    stock: 30,
    rating: 4.7,
    numReviews: 19,
    artisanName: 'Mili Tatak',
    artisanLocation: 'Itanagar, Arunachal Pradesh',
    artisanExperience: '12 years',
    storyBehindProduct: 'The potli bag is a traditional accessory used during festivals and ceremonies. The embroidery patterns are inspired by tribal art.',
    tags: ['women', 'potli', 'embroidered'],
    images: [
      { url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop', alt: 'Potli bag' },
      { url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop', alt: 'Embroidery detail' },
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop', alt: 'Drawstring bag' },
    ]
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const categories = await Category.find({});
    const catMap = {};
    categories.forEach(c => { catMap[c.name] = c._id; });

    const seller = await User.findOne({ role: 'seller' });
    if (!seller) { console.log('No seller found!'); process.exit(1); }

    let added = 0;
    for (const prod of newProducts) {
      // Determine category
      let catId = '';
      if (prod.tags.includes('blanket') || prod.tags.includes('table') || prod.tags.includes('cushion') || prod.tags.includes('handloom')) catId = catMap['Handloom'];
      else if (prod.tags.includes('women')) {
        if (prod.tags.includes('necklace') || prod.tags.includes('ring') || prod.tags.includes('bangles') || prod.tags.includes('earrings') || prod.tags.includes('bracelet') || prod.tags.includes('headband')) catId = catMap['Jewellery'];
        else catId = catMap["Women's Traditional Wear"];
      }
      else if (prod.tags.includes('men')) catId = catMap["Men's Traditional Wear"];
      else if (prod.tags.includes('home') || prod.tags.includes('furniture') || prod.tags.includes('vase') || prod.tags.includes('coaster')) catId = catMap['Handicrafts'];
      else if (prod.tags.includes('bag') || prod.tags.includes('basket') || prod.tags.includes('potli') || prod.tags.includes('sling')) catId = catMap['Bags'];
      else catId = catMap['Handicrafts'];

      try {
        await Product.create({
          ...prod,
          category: catId,
          seller: seller._id,
          isActive: true,
          isApproved: true,
          discountPrice: null,
        });
        added++;
        console.log(`✓ ${prod.name}`);
      } catch (err) {
        if (err.code === 11000) {
          console.log(`Skip (exists): ${prod.name}`);
        } else {
          console.log(`Error: ${prod.name} - ${err.message}`);
        }
      }
    }

    const total = await Product.countDocuments();
    console.log(`\nAdded ${added} products. Total now: ${total}`);
    process.exit();
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
