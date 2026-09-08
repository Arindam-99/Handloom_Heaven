const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('../models/Product');

// Working, category-appropriate Unsplash images
const productImages = {
  // HANDLOOM - weaving, shawls, scarves
  'arunachal-traditional-handwoven-shawl': [
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1601924994987-69e26d50dc64?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=600&fit=crop',
  ],
  'traditional-handloom-stole': [
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1601924994987-69e26d50dc64?w=600&h=600&fit=crop',
  ],
  'arunachal-traditional-scarf': [
    'https://images.unsplash.com/photo-1601924994987-69e26d50dc64?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop',
  ],
  'woolen-shawl-from-tawang': [
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1601924994987-69e26d50dc64?w=600&h=600&fit=crop',
  ],
  'handloom-wrap-dress': [
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=600&fit=crop',
  ],

  // WOMEN'S WEAR - traditional Indian women's clothing
  'traditional-womens-handloom-dress': [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1596450514735-111a672a949d?w=600&h=600&fit=crop',
  ],
  'handwoven-saree': [
    'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1596450514735-111a672a949d?w=600&h=600&fit=crop',
  ],
  'traditional-cotton-skirt': [
    'https://images.unsplash.com/photo-1596450514735-111a672a949d?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop',
  ],
  'handloom-kurti': [
    'https://images.unsplash.com/photo-1596450514735-111a672a949d?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop',
  ],
  'handwoven-dupatta': [
    'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1596450514735-111a672a949d?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop',
  ],

  // MEN'S WEAR - Indian men's traditional clothing
  'mens-traditional-handloom-jacket': [
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop',
  ],
  'handwoven-shirt': [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop',
  ],
  'traditional-waistcoat': [
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop',
  ],
  'handloom-kurta': [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=600&fit=crop',
  ],

  // JEWELLERY - actual jewellery images
  'nyishi-tribal-beaded-necklace': [
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
  ],
  'handmade-beaded-earrings': [
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
  ],
  'tribal-bracelet': [
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop',
  ],
  'bamboo-jewellery-set': [
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop',
  ],
  'traditional-headband': [
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
  ],

  // HANDICRAFTS - bamboo, wall hangings, cushions, mats
  'arunachal-tribal-wall-hanging': [
    'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
  ],
  'handmade-bamboo-basket': [
    'https://images.unsplash.com/photo-1505577058444-a3deb90d8c82?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=600&fit=crop',
  ],
  'tribal-pattern-cushion-cover': [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
  ],
  'handmade-table-mat-set': [
    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1505577058444-a3deb90d8c82?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=600&fit=crop',
  ],
  'decorative-tribal-items': [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop',
  ],

  // BAGS - woven bags, bamboo bags
  'bamboo-handcrafted-bag': [
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
  ],
  'handwoven-jute-bag': [
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
  ],
  'traditional-woven-backpack': [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop',
  ],
  'handmade-cane-clutch': [
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop',
  ],
};

const fixImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/arunachal-marketplace');
    console.log('Connected to MongoDB');

    let updated = 0;
    for (const [slug, imgs] of Object.entries(productImages)) {
      const result = await Product.findOneAndUpdate(
        { slug },
        { images: imgs.map(url => ({ url, alt: slug.replace(/-/g, ' ') })) },
        { new: true }
      );
      if (result) {
        console.log(`✓ ${result.name} → updated images`);
        updated++;
      } else {
        console.log(`✗ ${slug} → not found`);
      }
    }

    console.log(`\n${updated} products updated with new images`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

fixImages();
