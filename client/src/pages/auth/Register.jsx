import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../store/slices/authSlice';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import Logo from '../../components/ui/Logo';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'user' });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); dispatch(clearError()); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return;
    const result = await dispatch(register({ name: formData.name, email: formData.email, password: formData.password, role: formData.role }));
    if (register.fulfilled.match(result)) navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-[#FAF7F2]">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3C5241] via-[#2E3F32] to-[#1F2B22]" />
        <div className="absolute inset-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528396518501-b53b655eb9b3?w=800&h=1200&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <Link to="/" className="flex items-center gap-3 mb-12">
            <Logo size={50} />
            <div><h1 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Handloom Haven</h1><p className="text-xs text-[#ADC48D] tracking-wider uppercase">Artisanal & Ethical Weaves</p></div>
          </Link>
          <h2 className="text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Join Our<br /><span className="text-[#ADC48D]">Craft Community</span></h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-md">Create an account to buy authentic products or start selling your handcrafted items.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <Logo size={36} />
            <span className="font-bold text-[#2A2520]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Handloom Haven</span>
          </Link>
          <div className="mb-8"><h1 className="text-3xl font-bold text-[#2A2520] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Create Account</h1><p className="text-[#7D7162]">Join our community of artisans & craft lovers</p></div>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl mb-6 text-sm font-medium flex items-center gap-2"><FiAlertCircle size={16} />{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-sm font-medium text-[#2A2520] mb-2">Full Name</label><div className="relative"><FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A8F7C]" size={18} /><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full pl-12 pr-4 py-3.5 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] focus:ring-2 focus:ring-[#3C5241]/10 transition-all bg-white" placeholder="Enter your full name" required /></div></div>
            <div><label className="block text-sm font-medium text-[#2A2520] mb-2">Email Address</label><div className="relative"><FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A8F7C]" size={18} /><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-12 pr-4 py-3.5 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] focus:ring-2 focus:ring-[#3C5241]/10 transition-all bg-white" placeholder="you@example.com" required /></div></div>
            <div><label className="block text-sm font-medium text-[#2A2520] mb-2">I want to</label><div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setFormData({ ...formData, role: 'user' })} className={`py-3.5 rounded-xl text-sm font-medium border-2 transition-all ${formData.role === 'user' ? 'border-[#3C5241] bg-[#F4F7F0] text-[#3C5241]' : 'border-[#E8E4DC] text-[#7D7162] hover:border-[#B8B0A0]'}`}>🛒 Buy Products</button>
              <button type="button" onClick={() => setFormData({ ...formData, role: 'seller' })} className={`py-3.5 rounded-xl text-sm font-medium border-2 transition-all ${formData.role === 'seller' ? 'border-[#3C5241] bg-[#F4F7F0] text-[#3C5241]' : 'border-[#E8E4DC] text-[#7D7162] hover:border-[#B8B0A0]'}`}>🏪 Sell Products</button>
            </div></div>
            <div><label className="block text-sm font-medium text-[#2A2520] mb-2">Password</label><div className="relative"><FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A8F7C]" size={18} /><input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} className="w-full pl-12 pr-12 py-3.5 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] focus:ring-2 focus:ring-[#3C5241]/10 transition-all bg-white" placeholder="Min 6 characters" required minLength={6} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A8F7C] hover:text-[#4D4440]">{showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}</button></div></div>
            <div><label className="block text-sm font-medium text-[#2A2520] mb-2">Confirm Password</label><div className="relative"><FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A8F7C]" size={18} /><input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full pl-12 pr-4 py-3.5 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] focus:ring-2 focus:ring-[#3C5241]/10 transition-all bg-white" placeholder="Confirm your password" required /></div></div>
            <button type="submit" disabled={loading} className="w-full bg-[#3C5241] text-white py-4 rounded-full font-medium hover:bg-[#2E3F32] transition-all disabled:opacity-50 text-sm mt-2">{loading ? 'Creating Account...' : 'Create Account'}</button>
          </form>
          <p className="text-center text-sm text-[#7D7162] mt-8">Already have an account? <Link to="/login" className="text-[#3C5241] font-bold hover:underline">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
