import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FiCheck, FiTrash2, FiEye } from 'react-icons/fi';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('pending');

  useEffect(() => {
    fetchProducts();
  }, [tab]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      if (tab === 'pending') {
        const { data } = await api.get('/admin/products/pending');
        setProducts(data.products);
      } else {
        const { data } = await api.get('/products', { params: { limit: 100 } });
        setProducts(data.products);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const approveProduct = async (id) => {
    try {
      await api.put(`/admin/products/${id}/approve`);
      toast.success('Product approved');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to approve product');
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-800 mb-6">Manage Products</h1>

      <div className="flex gap-2 mb-6">
        {['pending', 'all'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${tab === t ? 'bg-primary-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
          >
            {t === 'pending' ? 'Pending Approval' : 'All Products'}
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-stone-500">No products found</div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50">
                <tr>
                  <th className="text-left px-5 py-3 font-medium text-stone-600">Product</th>
                  <th className="text-left px-5 py-3 font-medium text-stone-600">Seller</th>
                  <th className="text-left px-5 py-3 font-medium text-stone-600">Price</th>
                  <th className="text-left px-5 py-3 font-medium text-stone-600">Status</th>
                  <th className="text-right px-5 py-3 font-medium text-stone-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-stone-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                          {product.images?.length > 0 ? (
                            <img src={product.images[0].url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">🧵</div>
                          )}
                        </div>
                        <p className="font-medium text-stone-800 line-clamp-1">{product.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-stone-600 text-xs">{product.seller?.name || 'N/A'}</td>
                    <td className="px-5 py-4 font-medium">₹{(product.discountPrice || product.price).toLocaleString('en-IN')}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${product.isApproved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {product.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {!product.isApproved && (
                          <button onClick={() => approveProduct(product._id)} className="p-2 text-green-500 hover:bg-green-50 rounded-lg" title="Approve">
                            <FiCheck size={16} />
                          </button>
                        )}
                        <Link to={`/product/${product.slug}`} className="p-2 text-stone-400 hover:text-primary-600 rounded-lg">
                          <FiEye size={16} />
                        </Link>
                        <button onClick={() => deleteProduct(product._id)} className="p-2 text-stone-400 hover:text-accent-500 rounded-lg">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
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

export default AdminProducts;
