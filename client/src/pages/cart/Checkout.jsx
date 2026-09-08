import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';
import { FiCheck, FiMapPin, FiCreditCard, FiPackage } from 'react-icons/fi';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: '',
    street: '',
    city: '',
    state: 'Arunachal Pradesh',
    pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const subtotal = items.reduce((acc, item) => {
    const product = item.product;
    if (!product) return acc;
    const price = product.discountPrice || product.price;
    return acc + price * item.quantity;
  }, 0);

  const shipping = subtotal >= 500 ? 0 : 50;
  const total = subtotal + shipping;

  const handleProceedToPayment = () => {
    if (!address.name || !address.phone || !address.street || !address.city || !address.pincode) {
      toast.error('Please fill all address fields');
      return;
    }
    // Navigate to the demo payment page with order data
    navigate('/payment', {
      state: {
        orderData: {
          items: items.map((item) => ({
            name: item.product?.name || 'Product',
            quantity: item.quantity,
            price: item.product?.discountPrice || item.product?.price || 0,
          })),
          shippingAddress: address,
          paymentMethod,
          subtotal,
          shipping,
          total,
        }
      }
    });
  };

  if (!items || items.length === 0) {
    navigate('/cart');
    return null;
  }

  const steps = [
    { num: 1, label: 'Address', icon: <FiMapPin /> },
    { num: 2, label: 'Summary', icon: <FiPackage /> },
    { num: 3, label: 'Payment', icon: <FiCreditCard /> }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-black text-stone-800 mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center justify-center gap-4 mb-10">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center">
            <div className={`flex items-center gap-2 ${step >= s.num ? 'text-emerald-600' : 'text-stone-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step > s.num ? 'bg-green-500 text-white' :
                step === s.num ? 'bg-emerald-600 text-white' :
                'bg-stone-200 text-stone-500'
              }`}>
                {step > s.num ? <FiCheck size={16} /> : s.num}
              </div>
              <span className="text-sm font-medium hidden sm:inline">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-12 sm:w-20 h-0.5 mx-2 ${step > s.num ? 'bg-green-500' : 'bg-stone-200'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Address */}
          {step === 1 && (
            <div className="bg-white rounded-3xl p-7 border border-stone-100 shadow-sm">
              <h2 className="font-black text-stone-800 text-lg mb-5">Delivery Address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all font-medium"
                    placeholder="+91"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-stone-700 mb-2">Street Address *</label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all font-medium"
                    placeholder="House no, Street, Locality"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">City *</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">State</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Pincode *</label>
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all font-medium"
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  if (!address.name || !address.phone || !address.street || !address.city || !address.pincode) {
                    toast.error('Please fill all required fields');
                    return;
                  }
                  setStep(2);
                }}
                className="mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-200"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Order Summary */}
          {step === 2 && (
            <div className="bg-white rounded-3xl p-7 border border-stone-100 shadow-sm">
              <h2 className="font-black text-stone-800 text-lg mb-5">Order Summary</h2>
              <div className="space-y-3">
                {items.map((item) => {
                  const product = item.product;
                  if (!product) return null;
                  const price = product.discountPrice || product.price;
                  return (
                    <div key={item._id} className="flex items-center gap-3 py-3 border-b border-stone-50 last:border-0">
                      <div className="w-14 h-14 bg-stone-100 rounded-xl overflow-hidden shrink-0">
                        {product.images?.length > 0 ? (
                          <img src={product.images[0].url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">🧵</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-stone-800 line-clamp-1">{product.name}</p>
                        <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-sm text-stone-800">₹{(price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="px-6 py-3 border-2 border-stone-200 rounded-2xl font-bold text-stone-600 hover:bg-stone-50 transition-all text-sm">
                  Back
                </button>
                <button onClick={() => setStep(3)} className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-200 text-sm">
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment Selection */}
          {step === 3 && (
            <div className="bg-white rounded-3xl p-7 border border-stone-100 shadow-sm">
              <h2 className="font-black text-stone-800 text-lg mb-5">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { id: 'upi', label: 'UPI Payment', desc: 'Google Pay, PhonePe, Paytm, and more' },
                  { id: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
                  { id: 'netbanking', label: 'Net Banking', desc: 'All major banks supported' },
                  { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when you receive your order' }
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${
                      paymentMethod === method.id ? 'border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-100' : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-emerald-600"
                    />
                    <div>
                      <p className="font-bold text-stone-800 text-sm">{method.label}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex gap-3 mt-7">
                <button onClick={() => setStep(2)} className="px-6 py-3.5 border-2 border-stone-200 rounded-2xl font-bold text-stone-600 hover:bg-stone-50 transition-all text-sm">
                  Back
                </button>
                {paymentMethod === 'cod' ? (
                  <button
                    onClick={() => {
                      toast.success('Order placed successfully! (Cash on Delivery)');
                      navigate('/account/orders');
                    }}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-2xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-200 text-sm"
                  >
                    Place Order — ₹{total.toLocaleString('en-IN')}
                  </button>
                ) : (
                  <button
                    onClick={handleProceedToPayment}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-2xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-200 text-sm"
                  >
                    Proceed to Pay ₹{total.toLocaleString('en-IN')}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <div className="bg-white rounded-3xl p-7 border border-stone-100 sticky top-28 shadow-sm">
            <h3 className="font-black text-stone-800 mb-5 text-lg">Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Subtotal ({items.length} items)</span>
                <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Shipping</span>
                <span className={`font-bold ${shipping === 0 ? 'text-emerald-600' : 'text-stone-800'}`}>
                  {shipping === 0 ? 'Free ✨' : `₹${shipping}`}
                </span>
              </div>
              <hr className="border-stone-100" />
              <div className="flex justify-between text-lg">
                <span className="font-black text-stone-800">Total</span>
                <span className="font-black text-stone-800">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
