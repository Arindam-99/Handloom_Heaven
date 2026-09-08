import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductBySlug, clearProduct } from '../../store/slices/productSlice';
import { addToCart } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';
import { FiStar, FiHeart, FiTruck, FiShield, FiChevronRight, FiMinus, FiPlus, FiPackage, FiFacebook, FiTwitter, FiLinkedin, FiCopy, FiCamera, FiCheck } from 'react-icons/fi';
import api from '../../services/api';

const defaultImage = "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=600&fit=crop";

const ProductDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, reviews, relatedProducts, loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 0, title: '', comment: '', images: [] });
  const [hoverRating, setHoverRating] = useState(0);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => { dispatch(fetchProductBySlug(slug)); return () => dispatch(clearProduct()); }, [dispatch, slug]);
  useEffect(() => { if (product?.sizes?.length) setSelectedSize(product.sizes[0]); if (product?.colors?.length) setSelectedColor(product.colors[0]); }, [product]);

  const handleAddToCart = () => {
    if (!user) { toast.error('Please sign in to add items to cart'); return; }
    dispatch(addToCart({ productId: product._id, quantity, size: selectedSize, color: selectedColor }));
    toast.success('Added to cart!');
  };

  const handleBuyNow = async () => {
    if (!user) { toast.error('Please sign in to buy'); return; }
    await dispatch(addToCart({ productId: product._id, quantity, size: selectedSize, color: selectedColor }));
    navigate('/checkout');
  };

  const handleReviewImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        const { data } = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        setReviewForm(prev => ({ ...prev, images: [...prev.images, data.url || data.imageUrl] }));
      } catch (err) {
        toast.error('Failed to upload image');
      }
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please sign in to review'); return; }
    if (reviewForm.rating === 0) { toast.error('Please select a rating'); return; }
    setSubmittingReview(true);
    try {
      await api.post('/reviews', {
        productId: product._id,
        rating: reviewForm.rating,
        title: reviewForm.title,
        comment: reviewForm.comment,
        images: reviewForm.images,
      });
      toast.success('Review submitted!');
      setReviewForm({ rating: 0, title: '', comment: '', images: [] });
      dispatch(fetchProductBySlug(slug));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading || !product) return <div className="flex items-center justify-center py-32"><div className="w-10 h-10 border-4 border-[#3C5241] border-t-transparent rounded-full animate-spin" /></div>;

  const price = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const allImages = product.images?.length > 0 ? product.images : [{ url: defaultImage }];
  const thumbnailImages = allImages.length >= 4 ? allImages : [...allImages, ...Array(4 - allImages.length).fill(null).map(() => ({ url: product.images?.[0]?.url || defaultImage }))];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 bg-[#FAF7F2] min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#9A8F7C] mb-6">
        <Link to="/" className="hover:text-[#3C5241] transition-colors">Home</Link><FiChevronRight size={14} />
        <Link to="/shop" className="hover:text-[#3C5241] transition-colors">Shop</Link><FiChevronRight size={14} />
        {product.category && <><Link to={`/shop?category=${product.category._id}`} className="hover:text-[#3C5241] transition-colors">{product.category.name}</Link><FiChevronRight size={14} /></>}
        <span className="text-[#2A2520] font-medium truncate">{product.name}</span>
      </div>

      {/* Main Product Section */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {/* Left: Image Gallery */}
        <div>
          <div className="aspect-square bg-[#E5EDDB] rounded-2xl overflow-hidden mb-4 border border-[#E8E4DC]">
            <img src={allImages[selectedImage]?.url || defaultImage} alt={product.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = defaultImage; }} />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {thumbnailImages.slice(0, 4).map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)} className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-[#3C5241] ring-2 ring-[#3C5241]/20' : 'border-[#E8E4DC] hover:border-[#B8B0A0] opacity-70 hover:opacity-100'}`}>
                <img src={img.url} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.src = defaultImage; }} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div>
          <span className="inline-block bg-[#F4F7F0] text-[#3C5241] text-xs font-bold px-3 py-1.5 rounded-full mb-3 tracking-wider uppercase border border-[#E8E4DC]">{product.category?.name || 'Category'}</span>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#2A2520] mb-3 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <FiStar key={i} size={18} className={i < Math.round(product.rating) ? 'fill-[#C4822D] text-[#C4822D]' : 'text-[#E8E4DC]'} />)}</div>
            <span className="text-sm text-[#7D7162] font-medium">{product.rating?.toFixed(1)} ({product.numReviews || 0} reviews)</span>
          </div>

          <div className="flex items-center gap-4 mb-5">
            <span className="text-3xl font-bold text-[#2A2520]">₹{price.toLocaleString('en-IN')}</span>
            {hasDiscount && (
              <>
                <span className="text-lg text-[#9A8F7C] line-through">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="bg-[#C4822D] text-white text-sm font-bold px-3 py-1 rounded-full">{Math.round((1 - product.discountPrice / product.price) * 100)}% OFF</span>
              </>
            )}
          </div>

          <p className={`text-sm font-medium mb-5 ${product.stock > 0 ? 'text-[#3C5241]' : 'text-red-500'}`}>
            {product.stock > 0 ? `✓ In Stock (${product.stock} available)` : '✗ Out of Stock'}
          </p>

          <p className="text-[#7D7162] leading-relaxed mb-5">{product.description}</p>

          {/* Size Selector */}
          {product.sizes?.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-[#2A2520] mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`px-5 py-2.5 border-2 rounded-xl text-sm font-medium transition-all ${selectedSize === size ? 'border-[#3C5241] bg-[#F4F7F0] text-[#3C5241]' : 'border-[#E8E4DC] text-[#4D4440] hover:border-[#B8B0A0]'}`}>{size}</button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selector */}
          {product.colors?.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-[#2A2520] mb-2">Color</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button key={color} onClick={() => setSelectedColor(color)} className={`px-5 py-2.5 border-2 rounded-xl text-sm font-medium transition-all ${selectedColor === color ? 'border-[#3C5241] bg-[#F4F7F0] text-[#3C5241]' : 'border-[#E8E4DC] text-[#4D4440] hover:border-[#B8B0A0]'}`}>{color}</button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-5">
            <p className="text-sm font-medium text-[#2A2520] mb-2">Quantity</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center border-2 border-[#E8E4DC] rounded-xl">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2.5 hover:bg-[#F4F7F0] rounded-l-xl transition-colors"><FiMinus size={16} /></button>
                <span className="px-5 py-2.5 font-bold text-[#2A2520] min-w-[52px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2.5 hover:bg-[#F4F7F0] rounded-r-xl transition-colors"><FiPlus size={16} /></button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-5">
            <button onClick={handleAddToCart} disabled={product.stock === 0} className="flex-1 bg-[#3C5241] text-white py-4 rounded-full font-medium hover:bg-[#2E3F32] transition-all disabled:opacity-50 text-sm">ADD TO CART</button>
            <button onClick={handleBuyNow} disabled={product.stock === 0} className="flex-1 bg-[#2A2520] text-white py-4 rounded-full font-medium hover:bg-[#1f1a17] transition-all disabled:opacity-50 text-sm">BUY NOW</button>
          </div>

          {/* Wishlist & Compare */}
          <div className="flex gap-3 mb-5">
            <button onClick={() => { setIsWishlisted(!isWishlisted); toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist'); }} className={`flex items-center gap-2 px-5 py-3 border-2 rounded-xl text-sm font-medium transition-all ${isWishlisted ? 'border-red-300 bg-red-50 text-red-600' : 'border-[#E8E4DC] text-[#4D4440] hover:border-red-200 hover:text-red-500'}`}>
              <FiHeart size={16} className={isWishlisted ? 'fill-red-500' : ''} /> Wishlist
            </button>
            <button className="flex items-center gap-2 px-5 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm font-medium text-[#4D4440] hover:border-[#B8B0A0] transition-all">🏷️ Add to compare</button>
          </div>

          {/* Categories & Material */}
          <div className="flex items-center gap-3 text-xs text-[#9A8F7C] mb-3">
            <span><span className="font-bold text-[#7D7162]">Categories:</span> {product.category?.name}{product.subCategory ? `, ${product.subCategory}` : ''}</span>
          </div>
          {product.material && <div className="text-xs text-[#9A8F7C] mb-3"><span className="font-bold text-[#7D7162]">Material:</span> {product.material}</div>}

          {/* Share */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xs font-bold text-[#7D7162]">Share:</span>
            {[FiFacebook, FiTwitter, FiLinkedin].map((Icon, i) => (
              <button key={i} className="w-8 h-8 bg-white border border-[#E8E4DC] hover:bg-[#F4F7F0] text-[#9A8F7C] hover:text-[#3C5241] rounded-lg flex items-center justify-center transition-all"><Icon size={14} /></button>
            ))}
            <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }} className="w-8 h-8 bg-white border border-[#E8E4DC] hover:bg-[#F4F7F0] text-[#9A8F7C] hover:text-[#3C5241] rounded-lg flex items-center justify-center transition-all"><FiCopy size={14} /></button>
          </div>

          {/* Trust badges */}
          <div className="border border-[#E8E4DC] rounded-2xl divide-y divide-[#E8E4DC] bg-white">
            {[
              { icon: <FiTruck />, text: "Free shipping on orders above ₹500" },
              { icon: <FiShield />, text: "100% authentic handcrafted product" },
              { icon: <FiPackage />, text: "Carefully packed & shipped from Arunachal" }
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 px-5 py-3.5">
                <span className="text-[#3C5241]">{item.icon}</span>
                <span className="text-sm text-[#7D7162] font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-12">
        <div className="flex gap-1 bg-[#E8E4DC] rounded-xl p-1 w-fit mb-6">
          {['description', 'details', 'story'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-white text-[#2A2520] shadow-sm' : 'text-[#7D7162] hover:text-[#4D4440]'}`}>
              {tab === 'story' ? 'Story Behind' : tab}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div className="bg-white rounded-2xl p-8 border border-[#E8E4DC]">
            <p className="text-[#7D7162] leading-relaxed text-lg">{product.description || 'No description available.'}</p>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="bg-white rounded-2xl p-8 border border-[#E8E4DC]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Material', value: product.material },
                { label: 'Origin', value: product.origin },
                { label: 'Crafting Method', value: product.craftingMethod },
                { label: 'Weight', value: product.weight },
                { label: 'Community', value: product.tribe },
                { label: 'Sub Category', value: product.subCategory },
                { label: 'Artisan', value: product.artisanName },
                { label: 'Experience', value: product.artisanExperience },
              ].filter(d => d.value).map((d) => (
                <div key={d.label} className="bg-[#FAF7F2] px-5 py-4 rounded-xl border border-[#E8E4DC]">
                  <p className="text-[10px] text-[#9A8F7C] font-bold uppercase tracking-wider mb-1">{d.label}</p>
                  <p className="font-bold text-[#2A2520] text-sm">{d.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'story' && product.storyBehindProduct && (
          <div className="bg-[#F4F7F0] rounded-2xl p-8 border border-[#E8E4DC]">
            <h2 className="text-2xl font-bold text-[#2A2520] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>✨ Story Behind the Product</h2>
            <p className="text-[#7D7162] leading-relaxed text-lg mb-8">{product.storyBehindProduct}</p>
            {product.artisanName && (
              <div className="bg-white rounded-xl p-6 flex items-center gap-4 border border-[#E8E4DC]">
                <div className="w-14 h-14 bg-[#3C5241] rounded-full flex items-center justify-center text-white font-bold text-xl">{product.artisanName.charAt(0)}</div>
                <div>
                  <p className="font-bold text-[#2A2520] text-lg" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{product.artisanName}</p>
                  <p className="text-sm text-[#7D7162]">{product.artisanLocation || 'Arunachal Pradesh'}</p>
                  {product.artisanExperience && <p className="text-sm text-[#3C5241] font-medium mt-1">Experience: {product.artisanExperience}</p>}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reviews */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#2A2520] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Customer Reviews</h2>

        {/* Review Summary */}
        {reviews.length > 0 && (
          <div className="bg-white rounded-2xl p-8 border border-[#E8E4DC] mb-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="text-center">
                <p className="text-5xl font-bold text-[#2A2520]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{product.rating?.toFixed(1)}</p>
                <div className="flex gap-0.5 justify-center my-2">{[...Array(5)].map((_, i) => <FiStar key={i} size={18} className={i < Math.round(product.rating) ? 'fill-[#C4822D] text-[#C4822D]' : 'text-[#E8E4DC]'} />)}</div>
                <p className="text-sm text-[#7D7162]">{reviews.length} reviews</p>
              </div>
              <div className="flex-1 w-full space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter(r => r.rating === star).length;
                  const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#7D7162] w-8">{star} ★</span>
                      <div className="flex-1 h-2.5 bg-[#E8E4DC] rounded-full overflow-hidden">
                        <div className="h-full bg-[#C4822D] rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-[#9A8F7C] w-8 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Write Review Form */}
        {user && (
          <div className="bg-white rounded-2xl p-8 border border-[#E8E4DC] mb-6">
            <h3 className="text-lg font-bold text-[#2A2520] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Write a Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <p className="text-sm font-medium text-[#4D4440] mb-2">Your Rating *</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} onClick={() => setReviewForm({ ...reviewForm, rating: star })} className="p-0.5 transition-transform hover:scale-125">
                      <FiStar size={28} className={`transition-colors ${(hoverRating || reviewForm.rating) >= star ? 'fill-[#C4822D] text-[#C4822D]' : 'text-[#E8E4DC]'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4D4440] mb-2">Review Title</label>
                <input type="text" value={reviewForm.title} onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })} className="w-full px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] bg-[#FAF7F2]" placeholder="e.g. Beautiful craftsmanship!" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4D4440] mb-2">Your Review *</label>
                <textarea value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })} rows={4} className="w-full px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] bg-[#FAF7F2] resize-none" placeholder="Tell us about your experience with this product..." required />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4D4440] mb-2">Add Photos (optional)</label>
                <div className="flex flex-wrap gap-3">
                  {reviewForm.images.map((img, i) => (
                    <div key={i} className="w-20 h-20 rounded-xl overflow-hidden border-2 border-[#E8E4DC]">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <label className="w-20 h-20 rounded-xl border-2 border-dashed border-[#E8E4DC] flex flex-col items-center justify-center cursor-pointer hover:border-[#3C5241] hover:bg-[#F4F7F0] transition-all">
                    <FiCamera size={18} className="text-[#9A8F7C]" />
                    <span className="text-[9px] text-[#9A8F7C] mt-0.5">Upload</span>
                    <input type="file" accept="image/*" multiple onChange={handleReviewImageUpload} className="hidden" />
                  </label>
                </div>
              </div>
              <button type="submit" disabled={submittingReview} className="bg-[#3C5241] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#2E3F32] transition-all disabled:opacity-50">
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        )}

        {!user && (
          <div className="bg-white rounded-2xl p-8 border border-[#E8E4DC] mb-6 text-center">
            <p className="text-[#7D7162] mb-3">Sign in to write a review</p>
            <Link to="/login" className="inline-block bg-[#3C5241] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#2E3F32] transition-all">Sign In</Link>
          </div>
        )}

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 border border-[#E8E4DC] text-center">
            <p className="text-[#9A8F7C] text-lg mb-1">No reviews yet</p>
            <p className="text-[#7D7162] text-sm">Be the first to review this product</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white rounded-2xl p-6 border border-[#E8E4DC] hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#3C5241] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                    {review.user?.avatar ? <img src={review.user.avatar} alt="" className="w-full h-full rounded-full object-cover" /> : review.user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-bold text-[#2A2520] text-sm">{review.user?.name || 'User'}</p>
                      {review.isVerifiedPurchase && (
                        <span className="flex items-center gap-1 text-[10px] text-[#3C5241] bg-[#F4F7F0] px-2 py-0.5 rounded-full font-bold border border-[#E8E4DC]">
                          <FiCheck size={10} /> Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <FiStar key={i} size={13} className={i < review.rating ? 'fill-[#C4822D] text-[#C4822D]' : 'text-[#E8E4DC]'} />)}</div>
                      <span className="text-[10px] text-[#9A8F7C]">{new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    {review.title && <p className="font-bold text-[#2A2520] text-sm mb-1">{review.title}</p>}
                    <p className="text-[#7D7162] text-sm leading-relaxed">{review.comment}</p>
                    {review.images?.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {review.images.map((img, i) => (
                          <div key={i} className="w-20 h-20 rounded-xl overflow-hidden border border-[#E8E4DC]">
                            <img src={img} alt="Review" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#2A2520] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <Link key={p._id} to={`/product/${p.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-[#E8E4DC] hover:shadow-lg transition-all duration-500">
                <div className="aspect-square bg-[#F4F7F0] overflow-hidden">
                  <img src={p.images?.[0]?.url || defaultImage} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { e.target.src = defaultImage; }} />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-[#2A2520] text-sm line-clamp-2 group-hover:text-[#3C5241] transition-colors leading-snug">{p.name}</h3>
                  <p className="font-bold text-[#2A2520] mt-2">₹{(p.discountPrice || p.price).toLocaleString('en-IN')}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
