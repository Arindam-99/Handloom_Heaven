import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { FiSearch, FiShoppingCart, FiHeart, FiMenu, FiX, FiUser, FiChevronDown, FiLogOut, FiPackage, FiSettings, FiChevronRight } from 'react-icons/fi';
import Logo from '../ui/Logo';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setUserMenuOpen(false);
    navigate('/');
  };

  const cartCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const navLinks = [
    { to: '/shop', label: 'Shop All' },
    { to: '/handloom', label: 'Handloom' },
    { to: '/jewellery', label: 'Jewellery' },
    { to: '/handicrafts', label: 'Handicrafts' },
    { to: '/collections', label: 'Collections' },
    { to: '/about', label: 'About' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm shadow-stone-200/50' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-18 gap-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Logo size={40} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-[#2A2520] leading-tight tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Handloom Haven</h1>
              <p className="text-[9px] text-[#7D7162] font-medium tracking-[0.15em] uppercase">Artisanal & Ethical Weaves</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <Link key={link.label} to={link.to} className="nav-link px-4 py-2 text-sm font-medium text-[#4D4440] hover:text-[#3C5241]">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <div className={`flex w-full border-2 rounded-full overflow-hidden transition-all duration-300 ${searchFocused ? 'border-[#3C5241] shadow-md shadow-[#3C5241]/10' : 'border-[#E8E4DC]'}`}>
              <div className="relative flex-1">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A8F7C]" size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm text-[#2A2520] placeholder:text-[#9A8F7C] focus:outline-none bg-transparent"
                />
              </div>
              <button type="submit" className="bg-[#3C5241] text-white px-5 hover:bg-[#2E3F32] transition-colors">
                <FiSearch size={16} />
              </button>
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            {/* Mobile search */}
            <Link to="/shop" className="md:hidden p-2.5 text-[#4D4440] hover:text-[#3C5241] hover:bg-[#F4F7F0] rounded-xl transition-all">
              <FiSearch size={20} />
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="p-2.5 text-[#4D4440] hover:text-[#3C5241] hover:bg-[#F4F7F0] rounded-xl transition-all">
              <FiHeart size={20} />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="p-2.5 text-[#4D4440] hover:text-[#3C5241] hover:bg-[#F4F7F0] rounded-xl transition-all relative">
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C4822D] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 pl-2 pr-3 py-1.5 text-[#4D4440] hover:bg-[#F4F7F0] rounded-xl transition-all">
                  <div className="w-8 h-8 bg-[#3C5241] text-white rounded-full flex items-center justify-center text-xs font-bold">{user.name?.charAt(0)?.toUpperCase()}</div>
                  <span className="text-sm font-medium text-[#2A2520] hidden sm:block max-w-[100px] truncate">{user.name?.split(' ')[0]}</span>
                  <FiChevronDown size={14} className={`hidden sm:block text-[#9A8F7C] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-stone-200/80 border border-[#E8E4DC] py-2 z-50 animate-in">
                      <div className="px-5 py-3 border-b border-[#E8E4DC]">
                        <p className="font-bold text-[#2A2520]">{user.name}</p>
                        <p className="text-xs text-[#7D7162] mt-0.5">{user.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F4F7F0] text-[#3C5241]">{user.role}</span>
                      </div>
                      <div className="py-1">
                        <Link to="/account" className="flex items-center gap-3 px-5 py-2.5 text-sm text-[#4D4440] hover:bg-[#F4F7F0] hover:text-[#3C5241] transition-colors" onClick={() => setUserMenuOpen(false)}><FiUser size={15} /> My Account</Link>
                        <Link to="/account/orders" className="flex items-center gap-3 px-5 py-2.5 text-sm text-[#4D4440] hover:bg-[#F4F7F0] hover:text-[#3C5241] transition-colors" onClick={() => setUserMenuOpen(false)}><FiPackage size={15} /> My Orders</Link>
                        {(user.role === 'seller' || user.role === 'admin') && <Link to="/seller" className="flex items-center gap-3 px-5 py-2.5 text-sm text-[#4D4440] hover:bg-[#F4F7F0] hover:text-[#3C5241] transition-colors" onClick={() => setUserMenuOpen(false)}><FiSettings size={15} /> Seller Dashboard</Link>}
                        {user.role === 'admin' && <Link to="/admin" className="flex items-center gap-3 px-5 py-2.5 text-sm text-[#4D4440] hover:bg-[#F4F7F0] hover:text-[#3C5241] transition-colors" onClick={() => setUserMenuOpen(false)}><FiSettings size={15} /> Admin Dashboard</Link>}
                      </div>
                      <div className="border-t border-[#E8E4DC] pt-1">
                        <button onClick={handleLogout} className="flex items-center gap-3 px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors"><FiLogOut size={15} /> Logout</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1.5 bg-[#3C5241] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#2E3F32] transition-all">
                <FiUser size={16} /><span className="hidden sm:inline">Login</span>
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2.5 text-[#4D4440] hover:bg-[#F4F7F0] rounded-xl transition-all">
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-3 flex">
          <div className="flex w-full border-2 border-[#E8E4DC] rounded-full overflow-hidden focus-within:border-[#3C5241] transition-colors">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8F7C]" size={16} />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="w-full pl-9 pr-4 py-2.5 text-sm text-[#2A2520] placeholder:text-[#9A8F7C] focus:outline-none" />
            </div>
            <button type="submit" className="bg-[#3C5241] text-white px-5"><FiSearch size={18} /></button>
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E8E4DC] bg-white shadow-xl animate-in">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.to} className="flex items-center justify-between py-3 px-4 text-[#2A2520] font-medium hover:bg-[#F4F7F0] hover:text-[#3C5241] rounded-xl transition-all" onClick={() => setMobileOpen(false)}>
                {link.label}
                <FiChevronRight size={16} className="text-[#9A8F7C]" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
