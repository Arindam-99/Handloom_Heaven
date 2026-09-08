import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../store/slices/authSlice';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import Logo from '../../components/ui/Logo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      const role = result.payload.user.role;
      if (role === 'admin') navigate('/admin');
      else if (role === 'seller') navigate('/seller');
      else navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FAF7F2]">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3C5241] via-[#2E3F32] to-[#1F2B22]" />
        <div className="absolute inset-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=1200&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <Link to="/" className="flex items-center gap-3 mb-12">
            <Logo size={50} />
            <div><h1 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Handloom Haven</h1><p className="text-xs text-[#ADC48D] tracking-wider uppercase">Artisanal & Ethical Weaves</p></div>
          </Link>
          <h2 className="text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Welcome Back to<br /><span className="text-[#ADC48D]">Heritage Craft</span></h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-md">Sign in to explore authentic handloom, jewellery and handcrafted treasures from Arunachal Pradesh.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <Logo size={36} />
            <span className="font-bold text-[#2A2520]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Handloom Haven</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#2A2520] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Sign In</h1>
            <p className="text-[#7D7162]">Enter your credentials to access your account</p>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl mb-6 text-sm font-medium flex items-center gap-2"><FiAlertCircle size={16} />{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#2A2520] mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A8F7C]" size={18} />
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); dispatch(clearError()); }} className="w-full pl-12 pr-4 py-3.5 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] focus:ring-2 focus:ring-[#3C5241]/10 transition-all bg-white" placeholder="you@example.com" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2A2520] mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A8F7C]" size={18} />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-12 py-3.5 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] focus:ring-2 focus:ring-[#3C5241]/10 transition-all bg-white" placeholder="Enter your password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A8F7C] hover:text-[#4D4440]">{showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}</button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#3C5241] text-white py-4 rounded-full font-medium hover:bg-[#2E3F32] transition-all disabled:opacity-50 text-sm">{loading ? 'Signing in...' : 'Sign In'}</button>
          </form>

          <p className="text-center text-sm text-[#7D7162] mt-8">Don't have an account? <Link to="/register" className="text-[#3C5241] font-bold hover:underline">Create one here</Link></p>

          <div className="mt-6 p-4 bg-[#F4F7F0] rounded-xl border border-[#E8E4DC]">
            <p className="text-xs font-bold text-[#7D7162] uppercase tracking-wider mb-2">Demo Credentials</p>
            <div className="text-xs text-[#4D4440] space-y-1">
              <p><strong>Admin:</strong> admin@arunachal.com / admin123</p>
              <p><strong>Seller:</strong> seller@arunachal.com / seller123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
