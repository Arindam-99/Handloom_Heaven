import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      const params = filter ? { status: filter } : {};
      const { data } = await api.get('/admin/orders', { params });
      setOrders(data.orders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status });
      toast.success('Status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update');
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-800 mb-6">Manage Orders</h1>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button onClick={() => setFilter('')} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${!filter ? 'bg-primary-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
          All
        </button>
        {['placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap ${filter === s ? 'bg-primary-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
            {s.replace('_', ' ')}
          </button>
        ))}
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-stone-500">No orders found</div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50">
                <tr>
                  <th className="text-left px-5 py-3 font-medium text-stone-600">Order</th>
                  <th className="text-left px-5 py-3 font-medium text-stone-600">Customer</th>
                  <th className="text-left px-5 py-3 font-medium text-stone-600">Items</th>
                  <th className="text-left px-5 py-3 font-medium text-stone-600">Amount</th>
                  <th className="text-left px-5 py-3 font-medium text-stone-600">Status</th>
                  <th className="text-left px-5 py-3 font-medium text-stone-600">Date</th>
                  <th className="text-right px-5 py-3 font-medium text-stone-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-stone-50">
                    <td className="px-5 py-3 font-medium text-stone-800">#{order._id.slice(-8).toUpperCase()}</td>
                    <td className="px-5 py-3 text-stone-600">{order.user?.name || 'N/A'}</td>
                    <td className="px-5 py-3 text-stone-600 text-xs">{order.items?.length} items</td>
                    <td className="px-5 py-3 font-bold text-stone-800">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusColors[order.status] || ''}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-stone-500">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="px-5 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className="px-3 py-1.5 border border-stone-200 rounded-lg text-xs bg-white focus:outline-none focus:border-primary-400"
                      >
                        {['placed', 'confirmed', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'].map((s) => (
                          <option key={s} value={s}>{s.replace('_', ' ')}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
