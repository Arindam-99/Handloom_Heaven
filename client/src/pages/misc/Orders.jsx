import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FiPackage, FiChevronRight } from 'react-icons/fi';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders');
      setOrders(data.orders);
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-800 mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <FiPackage size={48} className="mx-auto text-stone-300 mb-4" />
          <p className="text-stone-500 mb-4">No orders yet</p>
          <Link to="/shop" className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order._id}
              to={`/account/orders/${order._id}`}
              className="block bg-white rounded-xl p-5 border border-stone-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-stone-500">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-stone-400">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusColors[order.status] || 'bg-stone-100 text-stone-600'}`}>
                  {order.status.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {order.items.slice(0, 3).map((item, i) => (
                  <div key={i} className="w-12 h-12 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                    {item.image ? (
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg">🧵</div>
                    )}
                  </div>
                ))}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-stone-600 line-clamp-1">
                    {order.items.map(item => item.name).join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-stone-800">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                  <FiChevronRight className="text-stone-400 ml-auto mt-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
