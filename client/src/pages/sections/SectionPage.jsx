import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories } from '../../store/slices/productSlice';
import { addToCart } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';
import { FiStar, FiHeart, FiShoppingCart, FiTruck, FiShield, FiArrowRight } from 'react-icons/fi';

const defaultImage = "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop";

const sectionConfig = {
  handloom: {
    title: "Handloom Collection",
    subtitle: "Authentic handwoven textiles, shawls, scarves, and fabrics from Arunachal Pradesh",
    heroImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&h=400&fit=crop",
    categoryName: "Handloom",
  },
  jewellery: {
    title: "Jewellery Collection",
    subtitle: "Handcrafted traditional jewellery — necklaces, earrings, bracelets & tribal ornaments",
    heroImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&h=400&fit=crop",
    categoryName: "Jewellery",
  },
  handicrafts: {
    title: "Handicrafts Collection",
    subtitle: "Bamboo, cane, and handcrafted decorative products from local artisans",
    heroImage: "https://images.unsplash.com/photo-1528396518501-b53b655eb9b3?w=1200&h=400&fit=crop",
    categoryName: "Handicrafts",
  },
  collections: {
    title: "Our Collections",
    subtitle: "Curated sets of authentic Arunachal Pradesh products — perfect gifts and home décor",
    heroImage: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&h=400&fit=crop",
    categoryName: null,
  },
};

const SectionPage = ({ sectionKey }) => {
  const dispatch = useDispatch();
  const { items: products, categories, pagination, loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [sortBy, setSortBy] = useState('');
  const [searchParams] = useSearchParams();

  const config = sectionConfig[sectionKey] || sectionConfig.collections;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    // Find category ID by name if needed
    const categoryId = config.categoryName
      ? categories.find(c => c.name === config.categoryName)?._id
      : '';

    const params = { limit: 20 };
    if (categoryId) params.category = categoryId;
    if (sortBy) params.sort = sortBy;

    dispatch(fetchProducts(params));
  }, [dispatch, categories, config.categoryName, sortBy]);

  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wishlist') || '[]'); } catch { return []; }
  });

  const toggleWishlist = (id) => {
    const updated = wishlist.includes(id) ? wishlist.filter(w => w !== id) : [...wishlist, id];
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    if (wishlist.includes(id)) {
      toast('Removed from wishlist', { icon: '💔' });
    } else {
      toast('Added to wishlist ❤️');
    }
  };

  const handleAddToCart = (product) => {
    if (!user) { toast.error('Please sign in first'); return; }
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
    toast.success('Added to cart!');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Hero Banner */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img src={config.heroImage} alt={config.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A2520]/80 via-[#2A2520]/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 w-full">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{config.title}</h1>
            <p className="text-white/80 text-sm md:text-lg max-w-xl">{config.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
        {/* Sort Bar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-[#7D7162] font-medium">{pagination?.total || products.length} products</p>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 border-2 border-[#E8E4DC] rounded-xl text-sm font-medium focus:outline-none focus:border-[#3C5241] bg-white text-[#2A2520]">
            <option value="">Latest</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
            <option value="popular">Popular</option>
          </select>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#3C5241] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#E8E4DC]">
            <p className="text-[#7D7162] text-lg mb-4">No products found in this collection</p>
            <Link to="/shop" className="text-[#3C5241] font-medium hover:underline">Browse all products →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {products.map((product) => (
              <div key={product._id} className="group bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden hover:shadow-lg transition-all duration-500">
                <Link to={`/product/${product.slug}`} className="block relative aspect-square bg-[#F4F7F0] overflow-hidden">
                  <img src={product.images?.[0]?.url || defaultImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { e.target.src = defaultImage; }} />
                  {product.discountPrice && product.discountPrice < product.price && (
                    <span className="absolute top-3 left-3 bg-[#C4822D] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      -{Math.round((1 - product.discountPrice / product.price) * 100)}%
                    </span>
                  )}
                  <button onClick={(e) => { e.preventDefault(); toggleWishlist(product._id); }} className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${wishlist.includes(product._id) ? 'bg-red-500 text-white opacity-100' : 'bg-white/90 text-[#9A8F7C] hover:text-[#C4822D] opacity-0 group-hover:opacity-100'}`}>
                    <FiHeart size={14} className={wishlist.includes(product._id) ? 'fill-white' : ''} />
                  </button>
                </Link>
                <div className="p-4">
                  <p className="text-[10px] text-[#3C5241] font-bold tracking-wider uppercase mb-1">{product.category?.name || 'Handloom'}</p>
                  <Link to={`/product/${product.slug}`} className="block">
                    <h3 className="font-medium text-[#2A2520] text-sm mb-2 line-clamp-2 group-hover:text-[#3C5241] transition-colors leading-snug">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => <FiStar key={i} size={11} className={i < Math.round(product.rating || 4.5) ? 'fill-[#C4822D] text-[#C4822D]' : 'text-[#E8E4DC]'} />)}
                    <span className="text-[10px] text-[#9A8F7C] ml-1">{(product.rating || 4.5).toFixed(1)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-[#2A2520]">₹{(product.discountPrice || product.price).toLocaleString('en-IN')}</span>
                      {product.discountPrice && product.discountPrice < product.price && <span className="text-xs text-[#9A8F7C] line-through">₹{product.price.toLocaleString('en-IN')}</span>}
                    </div>
                    <button onClick={(e) => { e.preventDefault(); handleAddToCart(product); }} className="w-9 h-9 bg-[#F4F7F0] text-[#3C5241] rounded-lg flex items-center justify-center hover:bg-[#3C5241] hover:text-white transition-all">
                      <FiShoppingCart size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trust Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-[#E8E4DC]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <FiTruck />, title: "Free Shipping", desc: "On orders above ₹500" },
              { icon: <FiShield />, title: "100% Authentic", desc: "Direct from artisans" },
              { icon: <FiHeart />, title: "Support Artisans", desc: "Fair trade prices" },
              { icon: <FiStar />, title: "Quality Assured", desc: "Handpicked items" }
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 mx-auto bg-[#F4F7F0] text-[#3C5241] rounded-xl flex items-center justify-center mb-3">{item.icon}</div>
                <h4 className="font-bold text-[#2A2520] text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-[#9A8F7C]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link to="/shop" className="inline-flex items-center gap-2 bg-[#3C5241] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[#2E3F32] transition-all text-sm">
            Browse All Products <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SectionPage;
