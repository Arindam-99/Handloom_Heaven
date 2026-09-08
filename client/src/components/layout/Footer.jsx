import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import Logo from '../ui/Logo';

const Footer = () => {
  return (
    <footer className="bg-[#FAF7F2] border-t border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Logo size={40} />
              <div>
                <h4 className="text-[#2A2520] font-bold text-lg" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Handloom Haven</h4>
              </div>
            </div>
            <p className="text-sm text-[#7D7162] mb-6 leading-relaxed">
              Curating timeless treasures and contemporary stories. Discover pieces to decorate, inspire, and evolve.
            </p>
            <div className="flex gap-3">
              {[FiFacebook, FiInstagram, FiTwitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 border border-[#E8E4DC] rounded-lg flex items-center justify-center text-[#7D7162] hover:bg-[#3C5241] hover:text-white hover:border-[#3C5241] transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-[#2A2520] font-bold text-sm uppercase tracking-wider mb-5">Explore</h4>
            <ul className="space-y-3 text-sm text-[#7D7162]">
              {[
                { to: '/handloom', label: 'Handloom' },
                { to: '/jewellery', label: 'Jewellery' },
                { to: '/handicrafts', label: 'Handicrafts' },
                { to: '/collections', label: 'Collections' },
                { to: '/shop', label: 'All Products' }
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-[#3C5241] transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[#2A2520] font-bold text-sm uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3 text-sm text-[#7D7162]">
              {[
                { to: '/about', label: 'About Us' },
                { label: 'Our Blog' },
                { label: 'Careers' },
                { label: 'Press' },
                { label: 'Contact' }
              ].map((link, i) => (
                <li key={i}>
                  {link.to ? (
                    <Link to={link.to} className="hover:text-[#3C5241] transition-colors">{link.label}</Link>
                  ) : (
                    <span className="cursor-default">{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[#2A2520] font-bold text-sm uppercase tracking-wider mb-5">Support</h4>
            <ul className="space-y-3 text-sm text-[#7D7162]">
              {['Help Center', 'Shipping Info', 'Returns', 'Track Order', 'FAQs'].map((label, i) => (
                <li key={i}><span className="cursor-default hover:text-[#3C5241] transition-colors">{label}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#9A8F7C]">
          <p>© 2026 Made by Ari's Web Creation.in</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[#3C5241] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#3C5241] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#3C5241] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
