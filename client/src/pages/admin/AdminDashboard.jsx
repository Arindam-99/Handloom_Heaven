import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FiUsers, FiShoppingBag, FiPackage, FiDollarSign, FiClock, FiArrowRight } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [latestOrders, setLatestOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get('/admin/dashboard');
      setStats(data.stats);
      setLatestOrders(data.latestOrders);
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
    shipped: 'bg-purple-100 text-purple-700',
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
      <h1 className="text-2xl font-bold text-stone-800 mb-2">Admin Dashboard</h1>
      <p className="text-sm text-stone-500 mb-8">Overview of your marketplace</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: 'Users', value: stats?.totalUsers || 0, icon: <FiUsers />, color: 'bg-blue-100 text-blue-600' },
          { label: 'Sellers', value: stats?.totalSellers || 0, icon: <FiUsers />, color: 'bg-purple-100 text-purple-600' },
          { label: 'Products', value: stats?.totalProducts || 0, icon: <FiPackage />, color: 'bg-green-100 text-green-600' },
          { label: 'Pending Products', value: stats?.pendingProducts || 0, icon: <FiClock />, color: 'bg-amber-100 text-amber-600' },
          { label: 'Orders', value: stats?.totalOrders || 0, icon: <FiShoppingBag />, color: 'bg-pink-100 text-pink-600' },
          { label: 'Revenue', value: `₹${((stats?.totalRevenue || 0) / 1000).toFixed(0)}K`, icon: <FiDollarSign />, color: 'bg-emerald-100 text-emerald-600' }
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4 border border-stone-100">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${stat.color}`}>{stat.icon}</div>
            <p className="text-xl font-bold text-stone-800">{stat.value}</p>
            <p className="text-xs text-stone-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Manage Users', to: '/admin/users', color: 'bg-blue-100 text-blue-600' },
          { label: 'Pending Products', to: '/admin/products', color: 'bg-amber-100 text-amber-600' },
          { label: 'All Products', to: '/admin/products', color: 'bg-green-100 text-green-600' },
          { label: 'Manage Orders', to: '/admin/orders', color: 'bg-pink-100 text-pink-600' },
          { label: 'Categories', to: '/admin/categories', color: 'bg-purple-100 text-purple-600' }
        ].map((link) => (
          <Link key={link.label} to={link.to} className="bg-white rounded-xl p-4 border border-stone-100 hover:shadow-md transition-shadow text-center">
            <p className="font-medium text-stone-800 text-sm">{link.label}</p>
            <FiArrowRight className="mx-auto mt-2 text-stone-400" />
          </Link>
        ))}
      </div>

      {/* Latest Orders */}
      <div className="bg-white rounded-xl border border-stone-100">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-bold text-stone-800">Latest Orders</h2>
          <Link to="/admin/orders" className="text-primary-600 text-sm font-medium hover:text-primary-700">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-stone-600">Order</th>
                <th className="text-left px-5 py-3 font-medium text-stone-600">Customer</th>
                <th className="text-left px-5 py-3 font-medium text-stone-600">Status</th>
                <th className="text-left px-5 py-3 font-medium text-stone-600">Date</th>
                <th className="text-right px-5 py-3 font-medium text-stone-600">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {latestOrders.map((order) => (
                <tr key={order._id} className="hover:bg-stone-50">
                  <td className="px-5 py-3 font-medium text-stone-800">#{order._id.slice(-8).toUpperCase()}</td>
                  <td className="px-5 py-3 text-stone-600">{order.user?.name || 'N/A'}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusColors[order.status] || ''}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-stone-500 text-xs">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                  <td className="px-5 py-3 text-right font-bold text-stone-800">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
