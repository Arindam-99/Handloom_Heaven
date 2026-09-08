const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('../models/Product');
const img = (url, alt) => ({ url, alt });

// Verified working Unsplash images matched to product types
const productUpdates = {
  // === HANDLOOM ===
  'arunachal-traditional-handwoven-shawl': [
    img('https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop', 'Handwoven shawl'),
    img('https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=600&fit=crop', 'Woven textile'),
    img('https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=600&fit=crop', 'Handloom fabric'),
  ],
  'traditional-handloom-stole': [
    img('https://images.unsplash.com/photo-1601924994987-69e26d50dc64?w=600&h=600&fit=crop', 'Traditional stole'),
    img('https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop', 'Stole fabric'),
    img('https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=600&fit=crop', 'Woven stole'),
  ],
  'arunachal-traditional-scarf': [
    img('https://images.unsplash.com/photo-1601924994987-69e26d50dc64?w=600&h=600&fit=crop', 'Traditional scarf'),
    img('https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop', 'Scarf display'),
    img('https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=600&fit=crop', 'Colorful scarf'),
  ],
  'woolen-shawl-from-tawang': [
    img('https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop', 'Woolen shawl'),
    img('https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop', 'Warm woolen wrap'),
    img('https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=600&fit=crop', 'Tawang wool shawl'),
  ],
  'handloom-wrap-dress': [
    img('https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=600&fit=crop', 'Handloom wrap'),
    img('https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop', 'Wrap dress fabric'),
    img('https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=600&fit=crop', 'Handloom textile'),
  ],

  // === WOMEN'S WEAR ===
  'traditional-womens-handloom-dress': [
    img('https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop', 'Traditional dress'),
    img('https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop', 'Saree display'),
    img('https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&h=600&fit=crop', 'Ethnic dress'),
  ],
  'handwoven-saree': [
    img('https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop', 'Handwoven saree'),
    img('https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop', 'Saree fabric'),
    img('https://images.unsplash.com/photo-1596450514735-111a672a949d?w=600&h=600&fit=crop', 'Woven saree'),
  ],
  'traditional-cotton-skirt': [
    img('https://images.unsplash.com/photo-1596450514735-111a672a949d?w=600&h=600&fit=crop', 'Cotton skirt'),
    img('https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop', 'Traditional skirt'),
    img('https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop', 'Cotton fabric'),
  ],
  'handloom-kurti': [
    img('https://images.unsplash.com/photo-1596450514735-111a672a949d?w=600&h=600&fit=crop', 'Handloom kurti'),
    img('https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop', 'Embroidered kurti'),
    img('https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop', 'Cotton kurti'),
  ],
  'handwoven-dupatta': [
    img('https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop', 'Handwoven dupatta'),
    img('https://images.unsplash.com/photo-1596450514735-111a672a949d?w=600&h=600&fit=crop', 'Dupatta fabric'),
    img('https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop', 'Dupatta draped'),
  ],

  // === MEN'S WEAR ===
  'men-s-traditional-handloom-jacket': [
    img('https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=600&fit=crop', 'Traditional jacket'),
    img('https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop', 'Men blazer'),
    img('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop', 'Traditional coat'),
  ],
  'handwoven-shirt': [
    img('https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop', 'Handwoven shirt'),
    img('https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=600&fit=crop', 'Woven shirt'),
    img('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop', 'Traditional shirt'),
  ],
  'traditional-waistcoat': [
    img('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop', 'Traditional waistcoat'),
    img('https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=600&fit=crop', 'Ethnic vest'),
    img('https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop', 'Waistcoat detail'),
  ],
  'handloom-kurta': [
    img('https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop', 'Handloom kurta'),
    img('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop', 'Traditional kurta'),
    img('https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=600&fit=crop', 'Kurta display'),
  ],

  // === JEWELLERY ===
  'nyishi-tribal-beaded-necklace': [
    img('https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop', 'Tribal beaded necklace'),
    img('https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop', 'Beaded necklace detail'),
    img('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop', 'Beaded jewellery'),
  ],
  'handmade-beaded-earrings': [
    img('https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop', 'Beaded earrings'),
    img('https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop', 'Handmade earrings'),
    img('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop', 'Earring display'),
  ],
  'tribal-bracelet': [
    img('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop', 'Tribal bracelet'),
    img('https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop', 'Beaded bracelet'),
    img('https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop', 'Handmade bracelet'),
  ],
  'bamboo-jewellery-set': [
    img('https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop', 'Bamboo jewellery'),
    img('https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop', 'Jewellery set'),
    img('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop', 'Ethnic jewellery'),
  ],
  'traditional-headband': [
    img('https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop', 'Traditional headband'),
    img('https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop', 'Tribal headpiece'),
    img('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop', 'Beaded headband'),
  ],

  // === HANDICRAFTS ===
  'arunachal-tribal-wall-hanging': [
    img('https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=600&fit=crop', 'Tribal wall hanging'),
    img('https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=600&fit=crop', 'Wall art display'),
    img('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop', 'Decorative hanging'),
  ],
  'handmade-bamboo-basket': [
    img('https://images.unsplash.com/photo-1528396518501-b53b655eb9b3?w=600&h=600&fit=crop', 'Bamboo basket'),
    img('https://images.unsplash.com/photo-1505577058444-a3deb90d8c82?w=600&h=600&fit=crop', 'Handwoven basket'),
    img('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop', 'Bamboo craft'),
  ],
  'tribal-pattern-cushion-cover': [
    img('https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&h=600&fit=crop', 'Cushion cover'),
    img('https://images.unsplash.com/photo-1616627988170-6c44c4e1e055?w=600&h=600&fit=crop', 'Cushion detail'),
    img('https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=600&fit=crop', 'Tribal pattern'),
  ],
  'handmade-table-mat-set': [
    img('https://images.unsplash.com/photo-1603204077167-2fa0397f48e5?w=600&h=600&fit=crop', 'Table mat set'),
    img('https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=600&fit=crop', 'Woven table mat'),
    img('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop', 'Table setting'),
  ],
  'decorative-tribal-items': [
    img('https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&h=600&fit=crop', 'Tribal masks'),
    img('https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=600&fit=crop', 'Tribal decor'),
    img('https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=600&fit=crop', 'Decorative items'),
  ],

  // === BAGS ===
  'bamboo-handcrafted-bag': [
    img('https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop', 'Bamboo bag'),
    img('https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop', 'Woven bag'),
    img('https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop', 'Handbag detail'),
  ],
  'handwoven-jute-bag': [
    img('https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop', 'Jute bag'),
    img('https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop', 'Woven jute'),
    img('https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop', 'Tote bag'),
  ],
  'traditional-woven-backpack': [
    img('https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop', 'Woven backpack'),
    img('https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop', 'Traditional backpack'),
    img('https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop', 'Craft backpack'),
  ],
  'handmade-cane-clutch': [
    img('https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop', 'Cane clutch'),
    img('https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop', 'Handmade clutch'),
    img('https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop', 'Clutch detail'),
  ],
};

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Fix 1: Set discountPrice to null where it's 0
    const priceFix = await Product.updateMany(
      { discountPrice: 0 },
      { $set: { discountPrice: null } }
    );
    console.log(`Fixed ${priceFix.modifiedCount} products (set discountPrice from 0 to null)`);

    // Fix 2: Update images
    let updated = 0;
    for (const [slug, images] of Object.entries(productUpdates)) {
      const result = await Product.findOneAndUpdate(
        { slug },
        { $set: { images } },
        { new: true }
      );
      if (result) {
        updated++;
        console.log(`✓ ${result.name}`);
      } else {
        console.log(`✗ Not found: ${slug}`);
      }
    }

    console.log(`\nUpdated ${updated}/${Object.keys(productUpdates).length} product images`);
    console.log(`Fixed ${priceFix.modifiedCount} discountPrice values`);
    process.exit();
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
