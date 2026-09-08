import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories } from '../store/slices/productSlice';
import { FiArrowRight, FiStar, FiTruck, FiShield, FiHeart, FiUsers, FiAward, FiPackage, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const heroSlides = [
  {
    title: "Better choices.",
    highlight: "Beautiful living.",
    subtitle: "Discover authentic handloom, jewellery & handcrafted treasures from the artisans of Arunachal Pradesh's 26 tribes.",
    image: "/images/hero/hero1.jpg"
  },
  {
    title: "Handcrafted with",
    highlight: "Ancient Traditions",
    subtitle: "Every piece tells a story of centuries-old craftsmanship passed down through generations of master artisans.",
    image: "/images/hero/hero2.jpg"
  },
  {
    title: "Wear the Heritage of",
    highlight: "Arunachal Pradesh",
    subtitle: "Traditional jewellery, handloom textiles & tribal accessories — directly from local communities.",
    image: "/images/hero/hero3.jpg"
  }
];

const categoryImages = {
  "Handloom": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=750&fit=crop",
  "Women's Traditional Wear": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=750&fit=crop",
  "Men's Traditional Wear": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=750&fit=crop",
  "Jewellery": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=750&fit=crop",
  "Handicrafts": "https://images.unsplash.com/photo-1505577058444-a3deb90d8c82?w=600&h=750&fit=crop",
  "Bags": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=750&fit=crop"
};

const categorySubtitles = {
  "Handloom": "Shawls, scarves, fabrics & home décor",
  "Women's Traditional Wear": "Dresses, skirts, kurtis & dupattas",
  "Men's Traditional Wear": "Jackets, shirts, kurtas & wraps",
  "Jewellery": "Necklaces, earrings, bracelets & more",
  "Handicrafts": "Wall hangings, baskets, bamboo & décor",
  "Bags": "Handcrafted bags, clutches & backpacks"
};

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, categories } = useSelector((state) => state.products);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');

  useEffect(() => {
    dispatch(fetchProducts({ limit: 8 }));
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const popularProducts = products.slice(0, 8);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left text */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2A2520] mb-6 leading-[1.1]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {heroSlides[currentSlide].title}
                <span className="block text-[#3C5241]">{heroSlides[currentSlide].highlight}</span>
              </h1>
              <p className="text-lg text-[#7D7162] mb-8 max-w-md leading-relaxed">{heroSlides[currentSlide].subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="bg-[#3C5241] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[#2E3F32] transition-all inline-flex items-center gap-2 text-sm">
                  Shop the Collection <FiArrowRight size={16} />
                </Link>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 mt-10">
                {[
                  { icon: <FiShield size={18} />, text: "Eco-Friendly" },
                  { icon: <FiUsers size={18} />, text: "Cruelty-Free" },
                  { icon: <FiAward size={18} />, text: "Premium Quality" }
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-sm text-[#7D7162]">
                    <span className="text-[#3C5241]">{item.icon}</span>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-[#E5EDDB]">
                <img src={heroSlides[currentSlide].image} alt="Arunachal Heritage" className="w-full h-full object-cover" />
              </div>
              {/* Badge */}
              <div className="absolute -top-3 -right-3 md:top-6 md:right-6 bg-[#3C5241] text-white rounded-full w-20 h-20 flex items-center justify-center text-center shadow-xl">
                <div className="text-[10px] font-bold leading-tight">HANDMADE<br/>BY NATIVES</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-y border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <FiTruck size={22} />, text: "Free Shipping", sub: "On orders above ₹500" },
              { icon: <FiPackage size={22} />, text: "Easy Returns", sub: "7-day return policy" },
              { icon: <FiShield size={22} />, text: "Secure Payments", sub: "100% protected checkout" },
              { icon: <FiHeart size={22} />, text: "Customer Support", sub: "Here to help anytime" }
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-11 h-11 bg-[#F4F7F0] text-[#3C5241] rounded-xl flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-bold text-[#2A2520] text-sm">{item.text}</p>
                  <p className="text-xs text-[#9A8F7C]">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Our Favorites */}
      {popularProducts.length > 0 && (
        <section className="py-16 bg-[#FAF7F2]">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2A2520]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Shop Our Favorites</h2>
              <Link to="/shop" className="text-[#3C5241] font-medium text-sm hover:underline inline-flex items-center gap-1">
                View all products <FiArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
              {popularProducts.map((product) => <ProductCard key={product._id} product={product} />)}
            </div>
          </div>
        </section>
      )}

      {/* Shop By Category */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2A2520] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Shop by Category</h2>
            <p className="text-[#7D7162] max-w-md mx-auto">Explore authentic handcrafted products from the artisans of Arunachal Pradesh</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <Link to="/shop" className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-[#3C5241] bg-[#F4F7F0] shrink-0 w-32">
              <div className="w-20 h-20 rounded-xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=160&h=160&fit=crop" alt="All" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-bold text-[#2A2520] text-center">All</span>
            </Link>
            {categories.map((cat) => (
              <Link key={cat._id} to={`/shop?category=${cat._id}`} className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-[#E8E4DC] bg-white hover:border-[#3C5241] hover:bg-[#F4F7F0] transition-all shrink-0 w-32">
                <div className="w-20 h-20 rounded-xl overflow-hidden">
                  <img src={categoryImages[cat.name] || categoryImages["Handloom"]} alt={cat.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
                <span className="text-xs font-bold text-[#2A2520] text-center leading-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Join Newsletter / App Promo */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Newsletter */}
            <div className="bg-[#3C5241] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Join the Handloom Circle</h3>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">Get exclusive offers, early access to new drops, and handloom living tips.</p>
              <div className="flex">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 px-5 py-3 rounded-l-lg text-sm text-[#2A2520] focus:outline-none" />
                <button className="bg-[#C4822D] text-white px-6 py-3 rounded-r-lg font-medium text-sm hover:bg-[#A86824] transition-colors">Join Now</button>
              </div>
            </div>
            {/* Right: Quote */}
            <div className="bg-[#E5EDDB] rounded-2xl p-8 flex flex-col justify-center">
              <div className="text-[#3C5241] text-4xl mb-4">"</div>
              <p className="text-[#2A2520] text-xl font-bold leading-relaxed mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Shopping with purpose makes every purchase more meaningful.</p>
              <div className="w-12 h-1 bg-[#C4822D] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Artisans */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2A2520] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Meet Our Artisans</h2>
            <p className="text-[#7D7162] max-w-md mx-auto">The skilled hands that craft Arunachal's living heritage</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
            {[
              { name: 'Odin Asgard', location: 'Upper Subansiri', craft: 'Traditional Handloom', experience: '18 Years', quote: 'Every thread carries the story of my ancestors.', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
              { name: 'Saddie Sink', location: 'East Kameng', craft: 'Beaded Jewellery', experience: '12 Years', quote: 'Each bead is a connection to our tribal identity.', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop' },
              { name: 'Peter Parker', location: 'Tirap', craft: 'Bamboo Weaving', experience: '25 Years', quote: 'Bamboo weaving is the soul of our community.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
              { name: 'Loki', location: 'West Kameng', craft: 'Tribal Carving', experience: '15 Years', quote: 'Every carving tells a story of our land.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
              { name: 'Panther', location: 'Tawang', craft: 'Silver Jewellery', experience: '20 Years', quote: 'Silver reflects the spirit of our mountains.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' }
            ].map((artisan) => (
              <div key={artisan.name} className="bg-[#FAF7F2] rounded-2xl overflow-hidden hover:shadow-lg border border-[#E8E4DC] transition-all duration-300 group">
                <div className="relative h-44 overflow-hidden">
                  <img src={artisan.image} alt={artisan.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{artisan.name}</h3>
                    <p className="text-white/70 text-xs">{artisan.location}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#3C5241] text-white">{artisan.craft}</span>
                    <span className="text-xs text-[#9A8F7C]">{artisan.experience}</span>
                  </div>
                  <p className="text-[#7D7162] italic text-sm leading-relaxed">"{artisan.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Buy From Us */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2A2520] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Why Buy From Us?</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <FiShield />, title: '100% Authentic', desc: 'Verified directly from artisans' },
              { icon: <FiUsers />, title: 'Direct from Artisans', desc: 'Fair trade, no middlemen' },
              { icon: <FiTruck />, title: 'Free Shipping', desc: 'On orders above ₹500' },
              { icon: <FiAward />, title: 'Quality Assured', desc: 'Handpicked items' }
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 text-center border border-[#E8E4DC] hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 mx-auto bg-[#F4F7F0] text-[#3C5241] rounded-xl flex items-center justify-center mb-4">{item.icon}</div>
                <h3 className="font-bold text-[#2A2520] text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-[#9A8F7C]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Arunachal */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2A2520] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Discover Arunachal Pradesh</h2>
            <p className="text-[#7D7162] max-w-lg mx-auto">The land of dawn-lit mountains, home to 26 major tribes</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Tribes & Communities', desc: 'Home to 26 major tribes with distinct cultures', icon: <FiUsers size={24} />, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop' },
              { title: 'Handloom Techniques', desc: 'Ancient weaving methods using traditional looms', icon: <FiAward size={24} />, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=400&fit=crop' },
              { title: 'Traditional Jewellery', desc: 'Silver, beads & tribal-inspired ornaments', icon: <FiHeart size={24} />, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=400&fit=crop' }
            ].map((item) => (
              <div key={item.title} className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-bold text-white text-lg mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2A2520]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>What Our Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Priya S.', location: 'Mumbai', review: 'The handwoven shawl is absolutely beautiful. You can feel the craftsmanship in every thread.', rating: 5, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
              { name: 'Rajesh K.', location: 'Delhi', review: 'Amazing quality! The bamboo basket is both functional and a work of art.', rating: 5, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
              { name: 'Anita M.', location: 'Bangalore', review: 'I love supporting local artisans directly. The tribal necklace is my favourite piece.', rating: 5, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' }
            ].map((review) => (
              <div key={review.name} className="bg-white rounded-2xl p-6 border border-[#E8E4DC] hover:shadow-md transition-all">
                <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, i) => <FiStar key={i} size={14} className={i < review.rating ? 'fill-[#C4822D] text-[#C4822D]' : 'text-[#E8E4DC]'} />)}</div>
                <p className="text-[#7D7162] text-sm leading-relaxed mb-5">"{review.review}"</p>
                <div className="flex items-center gap-3">
                  <img src={review.image} alt={review.name} className="w-9 h-9 rounded-full object-cover" />
                  <div><p className="font-bold text-[#2A2520] text-sm">{review.name}</p><p className="text-xs text-[#9A8F7C]">{review.location}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const price = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const defaultImage = "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop";
  const [liked, setLiked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wishlist') || '[]').includes(product._id); } catch { return false; }
  });
  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let wl = [];
    try { wl = JSON.parse(localStorage.getItem('wishlist') || '[]'); } catch {}
    if (liked) {
      wl = wl.filter(id => id !== product._id);
      toast('Removed from wishlist', { icon: '💔' });
    } else {
      wl.push(product._id);
      toast('Added to wishlist ❤️');
    }
    localStorage.setItem('wishlist', JSON.stringify(wl));
    setLiked(!liked);
  };
  return (
    <Link to={`/product/${product.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-[#E8E4DC] card-lift">
      <div className="relative aspect-square bg-[#F4F7F0] overflow-hidden">
        <img src={product.images?.[0]?.url || defaultImage} alt={product.name} className="w-full h-full object-cover img-zoom" onError={(e) => { e.target.src = defaultImage; }} />
        {hasDiscount && <span className="absolute top-3 left-3 bg-[#C4822D] text-white text-[10px] font-bold px-2.5 py-1 rounded-full animate-in">-{Math.round((1 - product.discountPrice / product.price) * 100)}%</span>}
        <button onClick={toggleLike} className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 ${liked ? 'bg-red-500 text-white opacity-100 scale-110' : 'bg-white/90 text-[#9A8F7C] hover:text-red-500 opacity-0 group-hover:opacity-100 hover:scale-110'}`}>
          {liked ? <FiHeart size={14} className="fill-white" /> : <FiHeart size={14} />}
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
      <div className="p-4">
        <p className="text-[10px] text-[#3C5241] font-bold tracking-wider uppercase mb-1 transition-colors duration-300 group-hover:text-[#C4822D]">{product.category?.name || 'Handloom'}</p>
        <h3 className="font-medium text-[#2A2520] text-sm mb-2 line-clamp-2 group-hover:text-[#3C5241] transition-colors duration-300 leading-snug">{product.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-[#2A2520]">₹{price.toLocaleString('en-IN')}</span>
          {hasDiscount && <span className="text-xs text-[#9A8F7C] line-through">₹{product.price.toLocaleString('en-IN')}</span>}
        </div>
      </div>
    </Link>
  );
};

export default Home;
