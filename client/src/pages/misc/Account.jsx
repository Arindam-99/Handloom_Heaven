import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../store/slices/authSlice';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FiUser, FiPackage, FiMapPin, FiCreditCard, FiLock, FiLogOut, FiCamera, FiChevronRight, FiTruck, FiShield, FiHeadphones, FiHome, FiEdit2, FiTrash2, FiSettings } from 'react-icons/fi';
import Logo from '../../components/ui/Logo';

const Account = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [profile, setProfile] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || '',
  });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [newAddress, setNewAddress] = useState({ name: user?.name || '', phone: '', street: '', city: '', state: 'Arunachal Pradesh', pincode: '' });
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const [uploading, setUploading] = useState(false);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const avatarUrl = data.url || data.imageUrl;
      await dispatch(updateProfile({ avatar: avatarUrl })).unwrap();
      toast.success('Profile photo updated!');
    } catch (error) {
      toast.error('Failed to upload photo');
      setAvatarPreview(user?.avatar || '');
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const name = `${profile.firstName} ${profile.lastName}`.trim();
    const result = await dispatch(updateProfile({ name, phone: profile.phone, gender: profile.gender }));
    if (updateProfile.fulfilled.match(result)) toast.success('Profile updated!');
    else toast.error('Update failed');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await api.put('/auth/change-password', {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
      toast.success('Password changed!');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/address', newAddress);
      setAddresses(data.addresses);
      setNewAddress({ name: user?.name || '', phone: '', street: '', city: '', state: 'Arunachal Pradesh', pincode: '' });
      toast.success('Address added!');
    } catch (error) {
      toast.error('Failed to add address');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const { data } = await api.delete(`/auth/address/${addressId}`);
      setAddresses(data.addresses);
      toast.success('Address removed');
    } catch (error) {
      toast.error('Failed to delete address');
    }
  };

  const sidebarTabs = [
    { id: 'personal', label: 'Personal Information', icon: <FiUser size={18} /> },
    { id: 'orders', label: 'My Orders', icon: <FiPackage size={18} /> },
    { id: 'addresses', label: 'Manage Address', icon: <FiMapPin size={18} /> },
    { id: 'payment', label: 'Payment Method', icon: <FiCreditCard size={18} /> },
    { id: 'password', label: 'Password Manager', icon: <FiLock size={18} /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E8E4DC] py-10">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2A2520] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>My Account</h1>
          <p className="text-[#7D7162] text-sm flex items-center gap-2">
            <Link to="/" className="hover:text-[#3C5241] transition-colors">Home</Link>
            <FiChevronRight size={14} />
            <span className="text-[#3C5241] font-medium">My Account</span>
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-72 shrink-0">
            <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
              {/* Profile Card */}
              <div className="p-6 text-center border-b border-[#E8E4DC] bg-gradient-to-b from-[#F4F7F0] to-white">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Profile" className="w-20 h-20 rounded-full object-cover border-3 border-[#3C5241]" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#3C5241] text-white flex items-center justify-center text-2xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 w-7 h-7 bg-[#C4822D] text-white rounded-full flex items-center justify-center hover:bg-[#A86824] transition-colors shadow-md">
                    <FiCamera size={12} />
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                </div>
                <h3 className="font-bold text-[#2A2520] text-lg" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{user?.name}</h3>
                <p className="text-xs text-[#7D7162]">{user?.email}</p>
                {uploading && <p className="text-xs text-[#C4822D] mt-1 font-medium">Uploading...</p>}
              </div>

              {/* Menu Items */}
              <div className="p-3">
                {sidebarTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (tab.id === 'orders') { window.location.href = '/account/orders'; return; }
                      if (tab.id === 'settings') { window.location.href = '/account/settings'; return; }
                      setActiveTab(tab.id);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-[#3C5241] text-white shadow-md shadow-[#3C5241]/20'
                        : 'text-[#4D4440] hover:bg-[#F4F7F0] hover:text-[#3C5241]'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
                <div className="border-t border-[#E8E4DC] my-2" />
                <Link to="/" onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href = '/'; }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-300">
                  <FiLogOut size={18} />
                  Logout
                </Link>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {/* Personal Information */}
            {activeTab === 'personal' && (
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 animate-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#2A2520]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Personal Information</h2>
                  <div className="lg:hidden relative">
                    <img src={avatarPreview || ''} alt="" className="w-16 h-16 rounded-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                    {!avatarPreview && <div className="w-16 h-16 rounded-full bg-[#3C5241] text-white flex items-center justify-center text-xl font-bold">{user?.name?.charAt(0)}</div>}
                    <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#C4822D] text-white rounded-full flex items-center justify-center"><FiCamera size={10} /></button>
                  </div>
                </div>
                <form onSubmit={handleUpdateProfile} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#4D4440] uppercase tracking-wider mb-2">First Name *</label>
                      <input type="text" value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} className="w-full px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm text-[#2A2520] focus:outline-none focus:border-[#3C5241] transition-colors bg-[#FAF7F2]" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#4D4440] uppercase tracking-wider mb-2">Last Name *</label>
                      <input type="text" value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} className="w-full px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm text-[#2A2520] focus:outline-none focus:border-[#3C5241] transition-colors bg-[#FAF7F2]" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4D4440] uppercase tracking-wider mb-2">Email *</label>
                    <input type="email" value={profile.email} disabled className="w-full px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm bg-[#F4F7F0] text-[#7D7162] cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4D4440] uppercase tracking-wider mb-2">Phone *</label>
                    <input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm text-[#2A2520] focus:outline-none focus:border-[#3C5241] transition-colors bg-[#FAF7F2]" placeholder="+91-XXXXX-XXXXX" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4D4440] uppercase tracking-wider mb-2">Gender *</label>
                    <select value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })} className="w-full px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm text-[#2A2520] focus:outline-none focus:border-[#3C5241] transition-colors bg-[#FAF7F2] appearance-none cursor-pointer">
                      <option value="">Select Gender</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button type="submit" className="bg-[#3C5241] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#2E3F32] transition-all duration-300 hover:shadow-lg hover:shadow-[#3C5241]/20 active:scale-95">
                    Update Changes
                  </button>
                </form>
              </div>
            )}

            {/* Addresses */}
            {activeTab === 'addresses' && (
              <div className="space-y-6 animate-in">
                <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8">
                  <h2 className="text-2xl font-bold text-[#2A2520] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Add New Address</h2>
                  <form onSubmit={handleAddAddress} className="grid sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name" value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} className="px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] bg-[#FAF7F2]" required />
                    <input type="tel" placeholder="Phone" value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} className="px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] bg-[#FAF7F2]" required />
                    <input type="text" placeholder="Street Address" value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} className="sm:col-span-2 px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] bg-[#FAF7F2]" required />
                    <input type="text" placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} className="px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] bg-[#FAF7F2]" required />
                    <input type="text" placeholder="Pincode" value={newAddress.pincode} onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })} className="px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] bg-[#FAF7F2]" required />
                    <button type="submit" className="bg-[#3C5241] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#2E3F32] transition-all sm:col-span-2 w-fit">Add Address</button>
                  </form>
                </div>
                <div className="space-y-4">
                  {addresses.map((addr, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-[#E8E4DC] hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-[#2A2520]">{addr.name}</p>
                            {addr.isDefault && <span className="text-[10px] bg-[#3C5241] text-white px-2 py-0.5 rounded-full font-bold">DEFAULT</span>}
                          </div>
                          <p className="text-sm text-[#7D7162]">{addr.street}, {addr.city}, {addr.state} - {addr.pincode}</p>
                          <p className="text-sm text-[#7D7162] mt-1">Phone: {addr.phone}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-[#9A8F7C] hover:text-[#3C5241] hover:bg-[#F4F7F0] rounded-lg transition-all"><FiEdit2 size={14} /></button>
                          <button onClick={() => handleDeleteAddress(addr._id)} className="p-2 text-[#9A8F7C] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><FiTrash2 size={14} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {addresses.length === 0 && (
                    <div className="bg-white rounded-2xl p-10 border border-[#E8E4DC] text-center">
                      <FiMapPin size={40} className="mx-auto text-[#E8E4DC] mb-3" />
                      <p className="text-[#7D7162]">No addresses saved yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Payment Methods */}
            {activeTab === 'payment' && (
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 animate-in">
                <h2 className="text-2xl font-bold text-[#2A2520] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Payment Methods</h2>
                <div className="space-y-4">
                  {[
                    { name: 'UPI', desc: 'Google Pay, PhonePe, Paytm', icon: '💳', color: 'bg-purple-50 text-purple-600' },
                    { name: 'Credit / Debit Card', desc: 'Visa, Mastercard, Rupay', icon: '💳', color: 'bg-blue-50 text-blue-600' },
                    { name: 'Net Banking', desc: 'All major banks supported', icon: '🏦', color: 'bg-green-50 text-green-600' },
                    { name: 'Cash on Delivery', desc: 'Pay when you receive', icon: '📦', color: 'bg-amber-50 text-amber-600' },
                  ].map((method) => (
                    <div key={method.name} className="flex items-center gap-4 p-5 border-2 border-[#E8E4DC] rounded-xl hover:border-[#3C5241] hover:shadow-md transition-all cursor-pointer group">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${method.color}`}>{method.icon}</div>
                      <div className="flex-1">
                        <p className="font-bold text-[#2A2520] text-sm">{method.name}</p>
                        <p className="text-xs text-[#7D7162]">{method.desc}</p>
                      </div>
                      <FiChevronRight size={18} className="text-[#9A8F7C] group-hover:text-[#3C5241] group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Password Manager */}
            {activeTab === 'password' && (
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 animate-in">
                <h2 className="text-2xl font-bold text-[#2A2520] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Password Manager</h2>
                <form onSubmit={handleChangePassword} className="space-y-5 max-w-md">
                  <div>
                    <label className="block text-xs font-bold text-[#4D4440] uppercase tracking-wider mb-2">Current Password</label>
                    <input type="password" value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} className="w-full px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] bg-[#FAF7F2]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4D4440] uppercase tracking-wider mb-2">New Password</label>
                    <input type="password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} className="w-full px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] bg-[#FAF7F2]" required minLength={6} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4D4440] uppercase tracking-wider mb-2">Confirm New Password</label>
                    <input type="password" value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} className="w-full px-4 py-3 border-2 border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#3C5241] bg-[#FAF7F2]" required />
                  </div>
                  <button type="submit" className="bg-[#3C5241] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#2E3F32] transition-all duration-300 hover:shadow-lg active:scale-95">
                    Change Password
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <FiTruck size={28} />, title: 'Free Shipping', desc: 'Free shipping for orders above ₹500' },
            { icon: <FiCreditCard size={28} />, title: 'Flexible Payment', desc: 'Multiple secure payment options' },
            { icon: <FiHeadphones size={28} />, title: '24×7 Support', desc: 'We support online all days' },
          ].map((badge) => (
            <div key={badge.title} className="bg-white rounded-2xl p-6 border border-[#E8E4DC] text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 mx-auto bg-[#F4F7F0] text-[#3C5241] rounded-2xl flex items-center justify-center mb-3">{badge.icon}</div>
              <h3 className="font-bold text-[#2A2520] mb-1">{badge.title}</h3>
              <p className="text-xs text-[#7D7162]">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;
