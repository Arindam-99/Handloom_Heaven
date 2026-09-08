import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FiPackage, FiShoppingBag, FiDollarSign, FiClock, FiPlus, FiBarChart2, FiUsers } from 'react-icons/fi';

const SellerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get('/sellers/dashboard');
      setStats(data.stats);
      setRecentOrders(data.recentOrders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    placed: 'bg-blue-100 text-blue-700',
    confirmed: 'bg-blue-100 text-blue-700',
    processing: 'bg-amber-100 text-amber-700',
    packed: 'bg-amber-100 text-amber-700',
    shipped: 'bg-purple-100 text-purple-700',
    out_for_delivery: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700'
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Seller Dashboard</h1>
          <p className="text-sm text-stone-500">Welcome back! Here's your store overview.</p>
        </div>
        <Link
          to="/seller/products/add"
          className="bg-primary-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-primary-700 inline-flex items-center gap-2"
        >
          <FiPlus size={16} /> Add Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Products', value: stats?.totalProducts || 0, icon: <FiPackage />, color: 'bg-primary-100 text-primary-600' },
          { label: 'Total Orders', value: stats?.totalOrders || 0, icon: <FiShoppingBag />, color: 'bg-secondary-100 text-secondary-600' },
          { label: 'Pending Orders', value: stats?.pendingOrders || 0, icon: <FiClock />, color: 'bg-amber-100 text-amber-600' },
          { label: 'Total Sales', value: `₹${(stats?.totalSales || 0).toLocaleString('en-IN')}`, icon: <FiDollarSign />, color: 'bg-green-100 text-green-600' }
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 border border-stone-100">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-800">{stat.value}</p>
                <p className="text-xs text-stone-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Link to="/seller/products" className="bg-white rounded-xl p-5 border border-stone-100 hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center"><FiPackage size={20} /></div>
          <div>
            <p className="font-bold text-stone-800">My Products</p>
            <p className="text-xs text-stone-500">Manage your products</p>
          </div>
        </Link>
        <Link to="/seller/orders" className="bg-white rounded-xl p-5 border border-stone-100 hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-lg flex items-center justify-center"><FiShoppingBag size={20} /></div>
          <div>
            <p className="font-bold text-stone-800">My Orders</p>
            <p className="text-xs text-stone-500">View & manage orders</p>
          </div>
        </Link>
        <Link to="/seller/products/add" className="bg-white rounded-xl p-5 border border-stone-100 hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center"><FiPlus size={20} /></div>
          <div>
            <p className="font-bold text-stone-800">Add Product</p>
            <p className="text-xs text-stone-500">List a new product</p>
          </div>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-stone-100">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-bold text-stone-800">Recent Orders</h2>
          <Link to="/seller/orders" className="text-primary-600 text-sm font-medium hover:text-primary-700">View All</Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-10 text-center text-stone-500 text-sm">No orders yet</div>
        ) : (
          <div className="divide-y divide-stone-50">
            {recentOrders.map((order) => (
              <div key={order._id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-800">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-stone-500">{order.user?.name || 'Customer'} · {new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusColors[order.status] || ''}`}>
                    {order.status.replace('_', ' ')}
                  </span>
                  <p className="font-bold text-stone-800 text-sm">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
