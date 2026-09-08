import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiGrid, FiMessageSquare, FiStar, FiDollarSign, FiArrowLeft, FiChevronRight, FiSettings, FiUsers, FiMail, FiLink, FiPhone, FiPackage, FiShoppingBag, FiTag, FiHome, FiEye, FiSliders, FiUserCheck, FiSend, FiMessageCircle, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import Logo from '../../components/ui/Logo';

const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      storeName: 'Handloom Haven Store',
      storeDescription: 'Authentic Arunachal Pradesh handloom and handicraft products',
      currency: 'INR',
      timezone: 'Asia/Kolkata',
    },
    selling: {
      newVendorUpload: true,
      commissionType: 'percentage',
      adminCommission: 10,
      orderStatusChange: true,
      disableProductPopup: false,
      disableWelcomeWizard: false,
      categorySelection: true,
    },
    withdrawal: {
      minWithdrawal: 500,
      withdrawalMethods: ['bank', 'upi'],
      autoWithdrawal: false,
    },
    appearance: {
      theme: 'light',
      primaryColor: '#3C5241',
      showFooter: true,
      showBreadcrumbs: true,
    },
  });

  const toggleSetting = (section, key) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: !prev[section][key] }
    }));
  };

  const mainMenu = [
    { id: 'general', label: 'General', icon: <FiSettings size={16} /> },
    { id: 'selling', label: 'Selling Options', icon: <FiShoppingBag size={16} /> },
    { id: 'withdrawal', label: 'Withdraw Options', icon: <FiDollarSign size={16} /> },
    { id: 'page', label: 'Page Settings', icon: <FiHome size={16} /> },
    { id: 'appearance', label: 'Appearance', icon: <FiEye size={16} /> },
    { id: 'verification', label: 'Seller Verification', icon: <FiUserCheck size={16} /> },
    { id: 'sms', label: 'Verification SMS Gateways', icon: <FiSend size={16} /> },
    { id: 'email', label: 'Email Verification', icon: <FiMail size={16} /> },
    { id: 'social', label: 'Social API', icon: <FiLink size={16} /> },
    { id: 'contact', label: 'Vendor Contact Form', icon: <FiMessageCircle size={16} /> },
  ];

  const salesMenu = [
    { id: 'products', label: 'Product', icon: <FiPackage size={16} /> },
    { id: 'orders', label: 'Orders', icon: <FiTag size={16} /> },
    { id: 'coupons', label: 'Coupons', icon: <FiTag size={16} /> },
  ];

  const ToggleSwitch = ({ enabled, onToggle }) => (
    <button onClick={onToggle} className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${enabled ? 'bg-[#3C5241]' : 'bg-[#E8E4DC]'}`}>
      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${enabled ? 'translate-x-[26px]' : 'translate-x-0.5'}`} />
    </button>
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <div className="bg-[#2A2520] text-white py-4 px-6 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Logo size={32} />
          <span className="font-bold text-sm" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Handloom Haven</span>
        </Link>
        <div className="flex-1" />
        <span className="text-xs text-white/60">Seller Dashboard</span>
      </div>

      <div className="flex min-h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <div className="w-64 bg-[#1E2A23] text-white shrink-0 flex flex-col">
          {/* Main Menu */}
          <div className="p-4">
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-3 px-4">Main Menu</p>
            <div className="space-y-0.5">
              <Link to="/seller" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white transition-all">
                <FiGrid size={16} /> Dashboard
              </Link>
              <Link to="/seller/products" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white transition-all">
                <FiPackage size={16} /> Products
              </Link>
              <Link to="/seller/orders" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white transition-all">
                <FiTag size={16} /> Orders
              </Link>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white transition-all">
                <FiMessageSquare size={16} /> Request Quotes
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white transition-all">
                <FiStar size={16} /> Reviews
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white transition-all">
                <FiDollarSign size={16} /> Withdraw
              </button>
            </div>
          </div>

          {/* Settings Menu */}
          <div className="p-4 border-t border-white/10">
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-3 px-4">Settings</p>
            <div className="space-y-0.5">
              {mainMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
                    activeSection === item.id
                      ? 'bg-[#3C5241] text-white'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sales Menu */}
          <div className="p-4 border-t border-white/10">
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-3 px-4">Sales & Fulfillments</p>
            <div className="space-y-0.5">
              {salesMenu.map((item) => (
                <button key={item.id} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white transition-all">
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          {/* General Settings */}
          {activeSection === 'general' && (
            <div className="animate-in">
              <h2 className="text-2xl font-bold text-[#2A2520] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>General Settings</h2>
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#4D4440] uppercase tracking-wider mb-2">Store Name</label>
                  <input type="text" value={settings.general.storeName} onChange={(e) => setSettings({ ...settings, general: { ...settings.general, storeName: e.target.value } })} className="w-full px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] bg-[#FAF7F2]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4D4440] uppercase tracking-wider mb-2">Store Description</label>
                  <textarea value={settings.general.storeDescription} onChange={(e) => setSettings({ ...settings, general: { ...settings.general, storeDescription: e.target.value } })} rows={3} className="w-full px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] bg-[#FAF7F2] resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4D4440] uppercase tracking-wider mb-2">Currency</label>
                    <select value={settings.general.currency} onChange={(e) => setSettings({ ...settings, general: { ...settings.general, currency: e.target.value } })} className="w-full px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] bg-[#FAF7F2]">
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4D4440] uppercase tracking-wider mb-2">Timezone</label>
                    <select value={settings.general.timezone} onChange={(e) => setSettings({ ...settings, general: { ...settings.general, timezone: e.target.value } })} className="w-full px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] bg-[#FAF7F2]">
                      <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    </select>
                  </div>
                </div>
                <button className="bg-[#3C5241] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#2E3F32] transition-all">Save Changes</button>
              </div>
            </div>
          )}

          {/* Selling Options */}
          {activeSection === 'selling' && (
            <div className="animate-in">
              <h2 className="text-2xl font-bold text-[#2A2520] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Selling Options</h2>
              <div className="bg-white rounded-2xl border border-[#E8E4DC] divide-y divide-[#E8E4DC]">
                {[
                  { key: 'newVendorUpload', label: 'New vendor product upload', desc: 'Allow vendors to upload new products' },
                  { key: 'orderStatusChange', label: 'Order status change', desc: 'Allow vendors to change order status' },
                  { key: 'disableProductPopup', label: 'Disable product popup', desc: 'Disable quick view popup on products' },
                  { key: 'disableWelcomeWizard', label: 'Disable welcome wizard', desc: 'Skip welcome wizard for new vendors' },
                  { key: 'categorySelection', label: 'Category selection', desc: 'Allow vendors to select product categories' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between px-8 py-5 hover:bg-[#FAF7F2] transition-colors">
                    <div>
                      <p className="font-bold text-[#2A2520] text-sm">{item.label}</p>
                      <p className="text-xs text-[#7D7162] mt-0.5">{item.desc}</p>
                    </div>
                    <ToggleSwitch enabled={settings.selling[item.key]} onToggle={() => toggleSetting('selling', item.key)} />
                  </div>
                ))}
                <div className="px-8 py-5 hover:bg-[#FAF7F2] transition-colors">
                  <p className="font-bold text-[#2A2520] text-sm mb-2">Commission type</p>
                  <select value={settings.selling.commissionType} onChange={(e) => setSettings({ ...settings, selling: { ...settings.selling, commissionType: e.target.value } })} className="px-4 py-2 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] bg-white">
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div className="px-8 py-5 hover:bg-[#FAF7F2] transition-colors">
                  <p className="font-bold text-[#2A2520] text-sm mb-2">Admin commission (%)</p>
                  <input type="number" value={settings.selling.adminCommission} onChange={(e) => setSettings({ ...settings, selling: { ...settings.selling, adminCommission: Number(e.target.value) } })} className="w-32 px-4 py-2 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] bg-white" min={0} max={100} />
                </div>
              </div>
            </div>
          )}

          {/* Withdraw Options */}
          {activeSection === 'withdrawal' && (
            <div className="animate-in">
              <h2 className="text-2xl font-bold text-[#2A2520] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Withdraw Options</h2>
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#4D4440] uppercase tracking-wider mb-2">Minimum Withdrawal Amount (₹)</label>
                  <input type="number" value={settings.withdrawal.minWithdrawal} onChange={(e) => setSettings({ ...settings, withdrawal: { ...settings.withdrawal, minWithdrawal: Number(e.target.value) } })} className="w-48 px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] bg-[#FAF7F2]" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#2A2520] text-sm">Auto Withdrawal</p>
                    <p className="text-xs text-[#7D7162]">Automatically process withdrawals weekly</p>
                  </div>
                  <ToggleSwitch enabled={settings.withdrawal.autoWithdrawal} onToggle={() => toggleSetting('withdrawal', 'autoWithdrawal')} />
                </div>
                <button className="bg-[#3C5241] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#2E3F32] transition-all">Save Changes</button>
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeSection === 'appearance' && (
            <div className="animate-in">
              <h2 className="text-2xl font-bold text-[#2A2520] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Appearance</h2>
              <div className="bg-white rounded-2xl border border-[#E8E4DC] divide-y divide-[#E8E4DC]">
                <div className="px-8 py-5">
                  <p className="font-bold text-[#2A2520] text-sm mb-3">Theme</p>
                  <div className="flex gap-3">
                    {['light', 'dark', 'auto'].map((theme) => (
                      <button key={theme} onClick={() => setSettings({ ...settings, appearance: { ...settings.appearance, theme } })} className={`px-5 py-2.5 rounded-xl text-sm font-medium border-2 transition-all capitalize ${settings.appearance.theme === theme ? 'border-[#3C5241] bg-[#F4F7F0] text-[#3C5241]' : 'border-[#E8E4DC] text-[#7D7162] hover:border-[#B8B0A0]'}`}>
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="px-8 py-5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#2A2520] text-sm">Show Footer</p>
                    <p className="text-xs text-[#7D7162]">Display footer on store pages</p>
                  </div>
                  <ToggleSwitch enabled={settings.appearance.showFooter} onToggle={() => toggleSetting('appearance', 'showFooter')} />
                </div>
                <div className="px-8 py-5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#2A2520] text-sm">Show Breadcrumbs</p>
                    <p className="text-xs text-[#7D7162]">Display navigation breadcrumbs</p>
                  </div>
                  <ToggleSwitch enabled={settings.appearance.showBreadcrumbs} onToggle={() => toggleSetting('appearance', 'showBreadcrumbs')} />
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other sections */}
          {!['general', 'selling', 'withdrawal', 'appearance'].includes(activeSection) && (
            <div className="animate-in">
              <h2 className="text-2xl font-bold text-[#2A2520] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {mainMenu.find(m => m.id === activeSection)?.label || 'Settings'}
              </h2>
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-10 text-center">
                <FiSettings size={48} className="mx-auto text-[#E8E4DC] mb-4" />
                <p className="text-[#7D7162] text-lg mb-2">Coming Soon</p>
                <p className="text-sm text-[#9A8F7C]">This settings section is under development</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
