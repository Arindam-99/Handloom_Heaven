import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItem, removeFromCart } from '../../store/slices/cartSlice';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';

const defaultImage = "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=200&h=200&fit=crop";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => { if (user) dispatch(fetchCart()); }, [dispatch, user]);

  const subtotal = items.reduce((acc, item) => {
    const p = item.product;
    if (!p) return acc;
    return acc + (p.discountPrice || p.price) * item.quantity;
  }, 0);
  const shipping = subtotal >= 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-stone-100 rounded-3xl flex items-center justify-center mx-auto mb-6"><FiShoppingBag size={32} className="text-stone-300" /></div>
        <h1 className="text-3xl font-black text-stone-800 mb-3">Your Cart</h1>
        <p className="text-stone-500 mb-8">Please sign in to view your cart</p>
        <Link to="/login" className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-200 inline-flex items-center gap-2">Sign In <FiArrowRight /></Link>
      </div>
    );
  }

  if (loading) return <div className="flex items-center justify-center py-32"><div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>;

  if (!items || items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-stone-100 rounded-3xl flex items-center justify-center mx-auto mb-6"><FiShoppingBag size={32} className="text-stone-300" /></div>
        <h1 className="text-3xl font-black text-stone-800 mb-3">Your Cart is Empty</h1>
        <p className="text-stone-500 mb-8">Discover authentic Arunachal products</p>
        <Link to="/shop" className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-200 inline-flex items-center gap-2">Start Shopping <FiArrowRight /></Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <h1 className="text-3xl font-black text-stone-800 mb-8">Shopping Cart <span className="text-stone-400 text-xl">({items.length} items)</span></h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const p = item.product;
            if (!p) return null;
            const price = p.discountPrice || p.price;
            return (
              <div key={item._id} className="bg-white rounded-2xl p-5 border border-stone-100 flex gap-5 hover:shadow-lg transition-shadow">
                <Link to={`/product/${p.slug}`} className="w-28 h-28 bg-stone-100 rounded-xl overflow-hidden shrink-0">
                  <img src={p.images?.[0]?.url || defaultImage} alt={p.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = defaultImage; }} />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${p.slug}`} className="font-bold text-stone-800 hover:text-emerald-600 line-clamp-1">{p.name}</Link>
                  <div className="flex items-center gap-2 mt-1.5">
                    {item.size && <span className="text-xs bg-stone-100 px-2.5 py-1 rounded-lg text-stone-600 font-medium">Size: {item.size}</span>}
                    {item.color && <span className="text-xs bg-stone-100 px-2.5 py-1 rounded-lg text-stone-600 font-medium">Color: {item.color}</span>}
                  </div>
                  <p className="font-black text-stone-800 mt-3 text-lg">₹{price.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => dispatch(removeFromCart(item._id))} className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><FiTrash2 size={16} /></button>
                  <div className="flex items-center border-2 border-stone-200 rounded-xl">
                    <button onClick={() => dispatch(updateCartItem({ itemId: item._id, quantity: item.quantity - 1 }))} className="px-3 py-1.5 hover:bg-stone-50 rounded-l-xl"><FiMinus size={14} /></button>
                    <span className="px-4 py-1.5 text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => dispatch(updateCartItem({ itemId: item._id, quantity: item.quantity + 1 }))} className="px-3 py-1.5 hover:bg-stone-50 rounded-r-xl"><FiPlus size={14} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <div className="bg-white rounded-3xl p-7 border border-stone-100 sticky top-28 shadow-sm">
            <h2 className="font-black text-stone-800 text-xl mb-6">Order Summary</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between"><span className="text-stone-500">Subtotal</span><span className="font-bold text-stone-800">₹{subtotal.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span className="text-stone-500">Shipping</span><span className={`font-bold ${shipping === 0 ? 'text-emerald-600' : 'text-stone-800'}`}>{shipping === 0 ? 'Free ✨' : `₹${shipping}`}</span></div>
              {shipping > 0 && <p className="text-xs text-stone-400">Add ₹{(500 - subtotal).toLocaleString('en-IN')} more for free shipping</p>}
              <hr className="border-stone-100" />
              <div className="flex justify-between text-xl"><span className="font-black text-stone-800">Total</span><span className="font-black text-stone-800">₹{total.toLocaleString('en-IN')}</span></div>
            </div>
            <Link to="/checkout" className="block w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-2xl font-bold text-center mt-7 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-200">Proceed to Checkout</Link>
            <Link to="/shop" className="block text-center text-emerald-600 text-sm font-bold mt-4 hover:text-emerald-700">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
