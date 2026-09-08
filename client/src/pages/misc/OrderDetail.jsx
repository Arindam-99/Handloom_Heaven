import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import { FiChevronRight, FiPackage, FiTruck, FiCheck, FiClock } from 'react-icons/fi';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/orders/${id}`);
      setOrder(data.order);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = [
    { key: 'placed', label: 'Order Placed', icon: <FiClock /> },
    { key: 'confirmed', label: 'Confirmed', icon: <FiCheck /> },
    { key: 'processing', label: 'Processing', icon: <FiPackage /> },
    { key: 'shipped', label: 'Shipped', icon: <FiTruck /> },
    { key: 'delivered', label: 'Delivered', icon: <FiCheck /> }
  ];

  const getActiveStep = (status) => {
    const order = ['placed', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered'];
    return order.indexOf(status);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-stone-500">Order not found</p>
      </div>
    );
  }

  const activeStep = getActiveStep(order.status);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-stone-500 mb-6">
        <Link to="/account/orders" className="hover:text-primary-600">Orders</Link>
        <FiChevronRight size={14} />
        <span className="text-stone-700">Order #{order._id.slice(-8).toUpperCase()}</span>
      </div>

      <h1 className="text-2xl font-bold text-stone-800 mb-8">Order Details</h1>

      {/* Status Timeline */}
      {order.status !== 'cancelled' && (
        <div className="bg-white rounded-xl p-6 border border-stone-100 mb-8">
          <div className="flex items-center justify-between">
            {statusSteps.map((step, i) => (
              <div key={step.key} className="flex items-center flex-1">
                <div className="text-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    i <= activeStep ? 'bg-primary-600 text-white' : 'bg-stone-200 text-stone-500'
                  }`}>
                    {step.icon}
                  </div>
                  <p className={`text-xs font-medium ${i <= activeStep ? 'text-primary-600' : 'text-stone-400'}`}>
                    {step.label}
                  </p>
                </div>
                {i < statusSteps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${i < activeStep ? 'bg-primary-600' : 'bg-stone-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {order.status === 'cancelled' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
          <p className="text-red-700 font-medium">This order has been cancelled</p>
          {order.cancelReason && <p className="text-red-600 text-sm mt-1">Reason: {order.cancelReason}</p>}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="md:col-span-2 space-y-3">
          <h2 className="font-bold text-stone-800 mb-3">Order Items</h2>
          {order.items.map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-stone-100 flex gap-4">
              <div className="w-16 h-16 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                {item.image ? (
                  <img src={item.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">🧵</div>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-stone-800 text-sm">{item.name}</p>
                <p className="text-xs text-stone-500">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</p>
              </div>
              <p className="font-medium text-stone-800">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
            </div>
          ))}
        </div>

        {/* Order Info */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 border border-stone-100">
            <h3 className="font-bold text-stone-800 mb-3 text-sm">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-stone-500">Subtotal</span><span>₹{order.subtotal.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span className="text-stone-500">Shipping</span><span>{order.shippingCharge === 0 ? 'Free' : `₹${order.shippingCharge}`}</span></div>
              <hr className="border-stone-100" />
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{order.totalAmount.toLocaleString('en-IN')}</span></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-stone-100">
            <h3 className="font-bold text-stone-800 mb-2 text-sm">Shipping Address</h3>
            <p className="text-sm text-stone-600">{order.shippingAddress?.name}</p>
            <p className="text-sm text-stone-500">{order.shippingAddress?.street}</p>
            <p className="text-sm text-stone-500">{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
            <p className="text-sm text-stone-500">Phone: {order.shippingAddress?.phone}</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-stone-100">
            <h3 className="font-bold text-stone-800 mb-2 text-sm">Payment</h3>
            <p className="text-sm text-stone-600 capitalize">Method: {order.paymentMethod}</p>
            <p className={`text-sm font-medium ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-amber-600'}`}>
              Status: {order.paymentStatus}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
