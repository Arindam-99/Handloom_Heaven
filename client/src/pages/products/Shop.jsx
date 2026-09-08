import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories } from '../../store/slices/productSlice';
import { addToCart } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';
import { FiSearch, FiStar, FiHeart, FiShoppingCart, FiFilter, FiX, FiChevronDown, FiTruck, FiShield, FiUsers, FiAward } from 'react-icons/fi';
import { FiHeart as FiHeartFill } from 'react-icons/fi';

const defaultImage = "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop";

const categoryIconImages = {
  "All": 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=120&h=120&fit=crop',
  "Handloom": 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=120&h=120&fit=crop',
  "Women's Traditional Wear": 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=120&h=120&fit=crop',
  "Men's Traditional Wear": 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=120&h=120&fit=crop',
  "Jewellery": 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=120&h=120&fit=crop',
  "Handicrafts": 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=120&h=120&fit=crop',
  "Bags": 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=120&h=120&fit=crop'
};

const Shop = () => {
  const dispatch = useDispatch();
  const { items: products, categories, pagination, loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: '',
    page: 1
  });

  // Sync filters with URL search params when they change
  useEffect(() => {
    const urlCategory = searchParams.get('category') || '';
    const urlSearch = searchParams.get('search') || '';
    setFilters(prev => {
      if (prev.category !== urlCategory || prev.search !== urlSearch) {
        return { ...prev, category: urlCategory, search: urlSearch, page: 1 };
      }
      return prev;
    });
  }, [searchParams]);

  useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);
  useEffect(() => {
    const params = {};
    Object.entries(filters).forEach(([key, val]) => { if (val) params[key] = val; });
    dispatch(fetchProducts(params));
  }, [dispatch, filters]);

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  }, []);

  const clearFilters = () => setFilters({ category: '', search: '', minPrice: '', maxPrice: '', sort: '', page: 1 });

  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wishlist') || '[]'); } catch { return []; }
  });

  const toggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    const id = product._id;
    const updated = wishlist.includes(id)
      ? wishlist.filter(w => w !== id)
      : [...wishlist, id];
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
      {/* Page Header */}
      <div className="bg-white border-b border-[#E8E4DC] py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2A2520] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {filters.search ? <>Results for "<span className="text-[#3C5241]">{filters.search}</span>"</> : 'Our Collection'}
          </h1>
          <p className="text-[#7D7162] text-lg max-w-2xl mx-auto">
            {filters.search ? `${pagination?.total || 0} products found` : 'Authentic handloom, jewellery & handcrafted treasures from Arunachal Pradesh'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {/* Category Row */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#2A2520]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Shop by Category</h2>
            <button onClick={clearFilters} className="text-sm text-[#3C5241] font-medium hover:underline">View All</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button onClick={() => updateFilter('category', '')} className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all shrink-0 w-24 ${!filters.category ? 'border-[#3C5241] bg-[#F4F7F0]' : 'border-[#E8E4DC] bg-white hover:border-[#B8B0A0]'}`}>
              <div className="w-16 h-16 rounded-xl overflow-hidden">
                <img src={categoryIconImages['All']} alt="All" className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-medium text-[#4D4440] text-center leading-tight">All</span>
            </button>
            {categories.map((cat) => (
              <button key={cat._id} onClick={() => updateFilter('category', cat._id)} className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all shrink-0 w-24 ${filters.category === cat._id ? 'border-[#3C5241] bg-[#F4F7F0]' : 'border-[#E8E4DC] bg-white hover:border-[#B8B0A0]'}`}>
                <div className="w-16 h-16 rounded-xl overflow-hidden">
                  <img src={categoryIconImages[cat.name] || categoryIconImages['All']} alt={cat.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
                <span className="text-[10px] font-medium text-[#4D4440] text-center leading-tight">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort & Filter Bar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8E4DC]">
          <p className="text-sm text-[#7D7162] font-medium">{pagination?.total || 0} products</p>
          <div className="flex items-center gap-3">
            <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); updateFilter('sort', e.target.value); }} className="px-4 py-2 border-2 border-[#E8E4DC] rounded-xl text-sm font-medium focus:outline-none focus:border-[#3C5241] bg-white text-[#2A2520]">
              <option value="">Latest</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="popular">Popular</option>
            </select>
            <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden p-2 border-2 border-[#E8E4DC] rounded-xl hover:bg-[#F4F7F0]"><FiFilter size={18} /></button>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20"><div className="w-10 h-10 border-4 border-[#3C5241] border-t-transparent rounded-full animate-spin" /></div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#E8E4DC]"><p className="text-[#7D7162] text-lg mb-4">No products found</p><button onClick={clearFilters} className="text-[#3C5241] font-medium hover:underline">Clear filters</button></div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
              {products.map((product, index) => (
                <div key={product._id} className="group bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden card-lift animate-in" style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}>
                  <Link to={`/product/${product.slug}`} className="block relative aspect-square bg-[#F4F7F0] overflow-hidden">
                    <img src={product.images?.[0]?.url || defaultImage} alt={product.name} className="w-full h-full object-cover img-zoom" onError={(e) => { e.target.src = defaultImage; }} />
                    {product.discountPrice && product.discountPrice < product.price && (
                      <span className="absolute top-3 left-3 bg-[#C4822D] text-white text-[10px] font-bold px-2.5 py-1 rounded-full animate-in">
                        -{Math.round((1 - product.discountPrice / product.price) * 100)}%
                      </span>
                    )}
                    <button onClick={(e) => toggleWishlist(e, product)} className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 ${wishlist.includes(product._id) ? 'bg-red-500 text-white opacity-100 scale-110' : 'bg-white/90 text-[#9A8F7C] hover:text-red-500 opacity-0 group-hover:opacity-100 hover:scale-110'}`}>
                      {wishlist.includes(product._id) ? <FiHeartFill size={14} className="fill-white" /> : <FiHeart size={14} />}
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </Link>
                  <div className="p-4">
                    <p className="text-[10px] text-[#3C5241] font-bold tracking-wider uppercase mb-1 transition-colors duration-300 group-hover:text-[#C4822D]">{product.category?.name || 'Handloom'}</p>
                    <Link to={`/product/${product.slug}`} className="block">
                      <h3 className="font-medium text-[#2A2520] text-sm mb-2 line-clamp-2 group-hover:text-[#3C5241] transition-colors duration-300 leading-snug">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => <FiStar key={i} size={11} className={i < Math.round(product.rating || 4.5) ? 'fill-[#C4822D] text-[#C4822D]' : 'text-[#E8E4DC]'} />)}
                      <span className="text-[10px] text-[#9A8F7C] ml-1">{(product.rating || 4.5).toFixed(1)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-[#2A2520]">₹{(product.discountPrice || product.price).toLocaleString('en-IN')}</span>
                        {product.discountPrice && product.discountPrice < product.price && <span className="text-xs text-[#9A8F7C] line-through">₹{product.price.toLocaleString('en-IN')}</span>}
                      </div>
                      <button onClick={(e) => { e.preventDefault(); handleAddToCart(product); }} className="w-9 h-9 bg-[#F4F7F0] text-[#3C5241] rounded-lg flex items-center justify-center hover:bg-[#3C5241] hover:text-white hover:scale-110 hover:rotate-3 transition-all duration-300">
                        <FiShoppingCart size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {[...Array(pagination.pages)].map((_, i) => (
                  <button key={i} onClick={() => updateFilter('page', i + 1)} className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${pagination.page === i + 1 ? 'bg-[#3C5241] text-white' : 'bg-white border border-[#E8E4DC] text-[#4D4440] hover:border-[#3C5241]'}`}>{i + 1}</button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Trust Section */}
        <div className="mt-16 bg-white rounded-2xl p-10 border border-[#E8E4DC]">
          <h3 className="text-2xl font-bold text-[#2A2520] text-center mb-8" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Why Shop With Us?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <FiTruck />, title: "Free Shipping", desc: "On orders above ₹500" },
              { icon: <FiShield />, title: "100% Authentic", desc: "Direct from artisans" },
              { icon: <FiUsers />, title: "Support Artisans", desc: "Fair trade prices" },
              { icon: <FiAward />, title: "Quality Assured", desc: "Handpicked items" }
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 mx-auto bg-[#F4F7F0] text-[#3C5241] rounded-xl flex items-center justify-center mb-3">{item.icon}</div>
                <h4 className="font-bold text-[#2A2520] text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-[#9A8F7C]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-[#3C5241] rounded-2xl p-10 text-center">
          <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Stay Connected</h3>
          <p className="text-white/70 mb-6">Get updates on new arrivals & exclusive offers</p>
          <div className="flex max-w-lg mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-3.5 rounded-l-xl text-[#2A2520] text-sm focus:outline-none font-medium" />
            <button className="bg-[#C4822D] text-white px-8 py-3.5 rounded-r-xl font-medium text-sm hover:bg-[#A86824] transition-colors">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
