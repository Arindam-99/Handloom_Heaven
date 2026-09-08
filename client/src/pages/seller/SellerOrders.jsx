import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      const params = filter ? { status: filter } : {};
      const { data } = await api.get('/sellers/orders', { params });
      setOrders(data.orders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/sellers/orders/${orderId}/status`, { status });
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update status');
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

  const statusOptions = ['placed', 'confirmed', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered'];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-800 mb-6">My Orders</h1>

      {/* Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${!filter ? 'bg-primary-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
        >
          All
        </button>
        {statusOptions.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap ${filter === s ? 'bg-primary-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
          >
            {s.replace('_', ' ')}
          </button>
        ))}
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-stone-500">No orders found</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl p-5 border border-stone-100">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-stone-800">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-stone-500">{order.user?.name} · {new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusColors[order.status] || ''}`}>
                  {order.status.replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                {order.items.map((item, i) => (
                  <div key={i} className="w-12 h-12 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                    {item.image ? (
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm">🧵</div>
                    )}
                  </div>
                ))}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-stone-600 line-clamp-1">{order.items.map(i => i.name).join(', ')}</p>
                  <p className="text-xs text-stone-400">Shipping: {order.shippingAddress?.city}, {order.shippingAddress?.pincode}</p>
                </div>
                <p className="font-bold text-stone-800">₹{order.totalAmount.toLocaleString('en-IN')}</p>
              </div>

              {order.status !== 'delivered' && order.status !== 'cancelled' && (
                <div className="flex items-center gap-2 pt-3 border-t border-stone-50">
                  <span className="text-xs text-stone-500">Update status:</span>
                  {statusOptions.filter(s => s !== order.status).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(order._id, s)}
                      className="text-xs px-3 py-1 rounded border border-stone-200 text-stone-600 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 capitalize transition-colors"
                    >
                      {s.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerOrders;
