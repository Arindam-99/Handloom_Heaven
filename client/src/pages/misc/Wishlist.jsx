import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useSelector } from 'react-redux';
import { FiHeart, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const { user } = useSelector((state) => state.auth);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const { data } = await api.get('/wishlist');
      setWishlist(data.wishlist);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async (productId) => {
    try {
      const { data } = await api.post(`/wishlist/${productId}`);
      setWishlist(data.wishlist);
      toast.success(data.added ? 'Added to wishlist' : 'Removed from wishlist');
    } catch (error) {
      toast.error('Please login first');
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <FiHeart size={48} className="mx-auto text-stone-300 mb-4" />
        <h1 className="text-2xl font-bold text-stone-800 mb-2">Your Wishlist</h1>
        <p className="text-stone-500 mb-6">Please login to view your wishlist</p>
        <Link to="/login" className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700">Login</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-800 mb-8">My Wishlist ({wishlist.length})</h1>
      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <FiHeart size={48} className="mx-auto text-stone-300 mb-4" />
          <p className="text-stone-500 mb-4">Your wishlist is empty</p>
          <Link to="/shop" className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product._id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-stone-100">
              <Link to={`/product/${product.slug}`} className="aspect-square bg-stone-100 block overflow-hidden">
                {product.images?.length > 0 ? (
                  <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">🧵</div>
                )}
              </Link>
              <div className="p-4">
                <Link to={`/product/${product.slug}`} className="font-semibold text-stone-800 text-sm line-clamp-2 hover:text-primary-600">{product.name}</Link>
                <p className="font-bold text-stone-800 mt-2">₹{(product.discountPrice || product.price).toLocaleString('en-IN')}</p>
                <button
                  onClick={() => toggleWishlist(product._id)}
                  className="mt-2 text-accent-500 text-sm font-medium hover:text-accent-600 inline-flex items-center gap-1"
                >
                  <FiTrash2 size={14} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
