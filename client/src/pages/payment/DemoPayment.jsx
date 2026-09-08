import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FiCreditCard, FiSmartphone, FiCheckCircle, FiShield, FiLock, FiArrowLeft, FiClock, FiChevronRight } from 'react-icons/fi';
import Logo from '../../components/ui/Logo';

const DemoPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  const [step, setStep] = useState('method');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [orderId] = useState(() => 'ORD-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase());

  const demoAmount = orderData?.total || 2499;
  const demoItems = orderData?.items || [{ name: 'Traditional Handwoven Shawl', quantity: 1, price: 2499 }];

  useEffect(() => {
    if (step === 'processing') {
      const stages = [{ at: 20, delay: 600 }, { at: 45, delay: 1200 }, { at: 70, delay: 1800 }, { at: 90, delay: 2400 }, { at: 100, delay: 3000 }];
      stages.forEach(({ at, delay }) => setTimeout(() => setProgress(at), delay));
      setTimeout(() => setStep('success'), 3600);
    }
  }, [step]);

  const handlePayment = () => { setStep('processing'); setProgress(0); };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E4DC]">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to={-1} className="flex items-center gap-2 text-[#7D7162] hover:text-[#2A2520] font-medium text-sm">
            <FiArrowLeft size={18} /> Back
          </Link>
          <Logo size={32} />
          <div className="flex items-center gap-1 text-[#3C5241]">
            <FiLock size={14} />
            <span className="text-xs font-bold">SECURE</span>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-2 mb-8">
          {[
            { label: 'Cart', done: true },
            { label: 'Address', done: true },
            { label: 'Payment', done: step === 'success', current: step !== 'success' },
            { label: 'Confirm', done: step === 'success' },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${s.done ? 'bg-[#F4F7F0] text-[#3C5241]' : s.current ? 'bg-[#2A2520] text-white' : 'bg-[#E8E4DC] text-[#9A8F7C]'}`}>
                {s.done ? <FiCheckCircle size={14} /> : <span className="w-4 h-4 flex items-center justify-center">{i + 1}</span>}
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < 3 && <FiChevronRight size={14} className="text-[#E8E4DC] mx-1" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-3">
            {/* STEP: Choose Method */}
            {step === 'method' && (
              <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
                <div className="px-6 py-5 border-b border-[#F4F7F0]">
                  <h2 className="text-xl font-bold text-[#2A2520]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Select Payment Method</h2>
                  <p className="text-sm text-[#9A8F7C] mt-1">Choose how you'd like to pay</p>
                </div>
                <div className="p-6 space-y-3">
                  {[
                    { id: 'upi', name: 'UPI Payment', desc: 'Pay via Google Pay, PhonePe, Paytm', icon: <FiSmartphone size={20} />, color: 'from-purple-500 to-violet-600' },
                    { id: 'card', name: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay', icon: <FiCreditCard size={20} />, color: 'from-blue-500 to-indigo-600' },
                    { id: 'netbanking', name: 'Net Banking', desc: 'All major banks supported', icon: <FiShield size={20} />, color: 'from-emerald-500 to-teal-600' },
                  ].map((m) => (
                    <button key={m.id} onClick={() => { setPaymentMethod(m.id); setStep('details'); }}
                      className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all group ${paymentMethod === m.id ? 'border-[#3C5241] bg-[#F4F7F0]' : 'border-[#E8E4DC] hover:border-[#B8B0A0]'}`}>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} text-white flex items-center justify-center shadow-lg`}>{m.icon}</div>
                      <div className="text-left flex-1">
                        <p className="font-bold text-[#2A2520] text-sm">{m.name}</p>
                        <p className="text-xs text-[#9A8F7C] mt-0.5">{m.desc}</p>
                      </div>
                      <FiChevronRight size={18} className="text-[#9A8F7C] group-hover:text-[#4D4440] transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP: UPI Details */}
            {step === 'details' && paymentMethod === 'upi' && (
              <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
                <div className="px-6 py-5 border-b border-[#F4F7F0] flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#2A2520]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>UPI Payment</h2>
                    <p className="text-sm text-[#9A8F7C] mt-1">Enter your payment details</p>
                  </div>
                  <button onClick={() => setStep('method')} className="text-xs text-[#3C5241] font-bold hover:underline">Change</button>
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#2A2520] mb-2">UPI ID</label>
                    <div className="flex">
                      <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="yourname@upi"
                        className="flex-1 px-4 py-3.5 border-2 border-[#E8E4DC] rounded-l-xl text-sm focus:outline-none focus:border-[#3C5241] transition-all font-medium" />
                      <div className="px-4 py-3.5 bg-[#F4F7F0] border-2 border-[#E8E4DC] border-l-0 rounded-r-xl text-sm font-bold text-[#9A8F7C]">@upi</div>
                    </div>
                  </div>
                  <div className="bg-[#FAF7F2] rounded-xl p-5">
                    <p className="text-xs font-bold text-[#9A8F7C] uppercase tracking-wider mb-3">Or pay via apps</p>
                    <div className="grid grid-cols-3 gap-3">
                      {['Google Pay', 'PhonePe', 'Paytm'].map((app) => (
                        <button key={app} onClick={() => handlePayment()} className="p-4 bg-white border border-[#E8E4DC] rounded-xl text-center hover:border-[#3C5241] hover:shadow-md transition-all">
                          <div className="w-10 h-10 mx-auto bg-[#F4F7F0] rounded-xl flex items-center justify-center text-lg mb-2">💸</div>
                          <p className="text-xs font-bold text-[#4D4440]">{app}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <button onClick={handlePayment} className="w-full bg-[#3C5241] text-white py-4 rounded-xl font-bold hover:bg-[#2E3F32] transition-all text-sm">
                    Pay ₹{demoAmount.toLocaleString('en-IN')} via UPI
                  </button>
                </div>
              </div>
            )}

            {/* STEP: Card Details */}
            {step === 'details' && paymentMethod === 'card' && (
              <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
                <div className="px-6 py-5 border-b border-[#F4F7F0] flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#2A2520]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Credit / Debit Card</h2>
                    <p className="text-sm text-[#9A8F7C] mt-1">Enter your card details</p>
                  </div>
                  <button onClick={() => setStep('method')} className="text-xs text-[#3C5241] font-bold hover:underline">Change</button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-[#FAF7F2] border border-[#E8E4DC] rounded-xl p-4">
                    <p className="text-xs font-bold text-[#7D7162] mb-1">💡 Demo Mode</p>
                    <p className="text-xs text-[#9A8F7C]">Enter any card details — no real charges will be made.</p>
                  </div>
                  <div><label className="block text-sm font-medium text-[#2A2520] mb-2">Card Number</label><input type="text" placeholder="1234 5678 9012 3456" maxLength={19} className="w-full px-4 py-3.5 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] transition-all font-medium tracking-wider" /></div>
                  <div><label className="block text-sm font-medium text-[#2A2520] mb-2">Name on Card</label><input type="text" placeholder="Cardholder name" className="w-full px-4 py-3.5 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] transition-all font-medium" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-[#2A2520] mb-2">Expiry</label><input type="text" placeholder="MM/YY" maxLength={5} className="w-full px-4 py-3.5 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] transition-all font-medium" /></div>
                    <div><label className="block text-sm font-medium text-[#2A2520] mb-2">CVV</label><input type="password" placeholder="•••" maxLength={4} className="w-full px-4 py-3.5 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] transition-all font-medium" /></div>
                  </div>
                  <button onClick={handlePayment} className="w-full bg-[#3C5241] text-white py-4 rounded-xl font-bold hover:bg-[#2E3F32] transition-all text-sm">Pay ₹{demoAmount.toLocaleString('en-IN')} via Card</button>
                </div>
              </div>
            )}

            {/* STEP: Net Banking */}
            {step === 'details' && paymentMethod === 'netbanking' && (
              <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
                <div className="px-6 py-5 border-b border-[#F4F7F0] flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#2A2520]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Net Banking</h2>
                    <p className="text-sm text-[#9A8F7C] mt-1">Select your bank</p>
                  </div>
                  <button onClick={() => setStep('method')} className="text-xs text-[#3C5241] font-bold hover:underline">Change</button>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-3">
                    {['SBI', 'HDFC', 'ICICI', 'Axis', 'PNB', 'Kotak'].map((bank) => (
                      <button key={bank} onClick={handlePayment} className="flex items-center gap-3 p-4 border-2 border-[#E8E4DC] rounded-xl hover:border-[#3C5241] hover:bg-[#F4F7F0] transition-all">
                        <div className="w-10 h-10 bg-[#F4F7F0] rounded-lg flex items-center justify-center text-lg">🏦</div>
                        <span className="font-bold text-[#4D4440] text-sm">{bank}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP: Processing */}
            {step === 'processing' && (
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 relative">
                  <div className="absolute inset-0 border-4 border-[#E8E4DC] rounded-full" />
                  <div className="absolute inset-0 border-4 border-[#3C5241] border-t-transparent rounded-full animate-spin" />
                  <div className="absolute inset-3 bg-[#F4F7F0] rounded-full flex items-center justify-center"><FiLock size={24} className="text-[#3C5241]" /></div>
                </div>
                <h2 className="text-2xl font-bold text-[#2A2520] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Processing Payment</h2>
                <p className="text-[#9A8F7C] text-sm mb-8">Please don't close this page...</p>
                <div className="max-w-xs mx-auto">
                  <div className="h-2 bg-[#E8E4DC] rounded-full overflow-hidden">
                    <div className="h-full bg-[#3C5241] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex justify-between mt-3 text-xs text-[#9A8F7C]"><span>Verifying</span><span>{progress}%</span><span>Complete</span></div>
                </div>
              </div>
            )}

            {/* STEP: Success */}
            {step === 'success' && (
              <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
                <div className="bg-[#F4F7F0] p-10 text-center border-b border-[#E8E4DC]">
                  <div className="w-20 h-20 mx-auto mb-5 bg-[#E5EDDB] rounded-full flex items-center justify-center"><FiCheckCircle size={40} className="text-[#3C5241]" /></div>
                  <h2 className="text-3xl font-bold text-[#2A2520] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Payment Successful! 🎉</h2>
                  <p className="text-[#7D7162]">Your order has been confirmed</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-[#FAF7F2] rounded-xl p-5 space-y-2">
                    {[['Order ID', orderId], ['Amount Paid', `₹${demoAmount.toLocaleString('en-IN')}`], ['Payment Method', paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'card' ? 'Card' : 'Net Banking']].map(([label, value]) => (
                      <div key={label} className="flex justify-between text-sm"><span className="text-[#9A8F7C]">{label}</span><span className="font-bold text-[#2A2520]">{value}</span></div>
                    ))}
                  </div>
                  <div className="bg-[#F4F7F0] border border-[#E8E4DC] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-1"><FiClock size={16} className="text-[#3C5241]" /><p className="font-bold text-[#3C5241] text-sm">Estimated Delivery</p></div>
                    <p className="text-[#2A2520] font-bold text-sm">{new Date(Date.now() + 5 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Link to="/account/orders" className="flex-1 text-center py-3.5 border-2 border-[#E8E4DC] rounded-xl font-bold text-[#4D4440] hover:bg-[#F4F7F0] transition-all text-sm">Track Order</Link>
                    <Link to="/shop" className="flex-1 text-center py-3.5 bg-[#3C5241] text-white rounded-xl font-bold hover:bg-[#2E3F32] transition-all text-sm">Continue Shopping</Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 sticky top-6">
              <h3 className="font-bold text-[#2A2520] text-lg mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Order Summary</h3>
              <div className="space-y-3 mb-5">
                {demoItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#F4F7F0] rounded-lg flex items-center justify-center text-xl shrink-0 border border-[#E8E4DC]">🧵</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#2A2520] line-clamp-1">{item.name}</p>
                      <p className="text-xs text-[#9A8F7C]">Qty: {item.quantity || 1}</p>
                    </div>
                    <p className="font-bold text-sm text-[#2A2520]">₹{(item.price || demoAmount).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#E8E4DC] pt-4 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-[#9A8F7C]">Subtotal</span><span className="font-medium">₹{demoAmount.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span className="text-[#9A8F7C]">Shipping</span><span className="font-medium text-[#3C5241]">Free ✨</span></div>
                <div className="flex justify-between"><span className="text-[#9A8F7C]">Tax (GST)</span><span className="font-medium">₹0</span></div>
                <div className="border-t border-[#E8E4DC] pt-3 flex justify-between text-lg"><span className="font-bold text-[#2A2520]">Total</span><span className="font-bold text-[#2A2520]">₹{demoAmount.toLocaleString('en-IN')}</span></div>
              </div>
              <div className="mt-5 p-4 bg-[#FAF7F2] rounded-xl space-y-2">
                {[
                  ['🛡️', '100% secure payment — 256-bit SSL encryption'],
                  ['✅', '7-day return policy on all products'],
                  ['🔒', 'Your payment info is never stored']
                ].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-[#7D7162]">
                    <span>{icon}</span><span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPayment;
