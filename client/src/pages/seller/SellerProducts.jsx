import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products/my-products');
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
      toast.success('Product deleted');
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-stone-800">My Products ({products.length})</h1>
        <Link
          to="/seller/products/add"
          className="bg-primary-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-primary-700 inline-flex items-center gap-2"
        >
          <FiPlus size={16} /> Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-stone-500 mb-4">You haven't added any products yet</p>
          <Link to="/seller/products/add" className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700">
            Add Your First Product
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50">
                <tr>
                  <th className="text-left px-5 py-3 font-medium text-stone-600">Product</th>
                  <th className="text-left px-5 py-3 font-medium text-stone-600">Price</th>
                  <th className="text-left px-5 py-3 font-medium text-stone-600">Stock</th>
                  <th className="text-left px-5 py-3 font-medium text-stone-600">Status</th>
                  <th className="text-right px-5 py-3 font-medium text-stone-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-stone-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                          {product.images?.length > 0 ? (
                            <img src={product.images[0].url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xl">🧵</div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-stone-800 line-clamp-1">{product.name}</p>
                          <p className="text-xs text-stone-500">{product.category?.name || 'Category'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-stone-800">₹{(product.discountPrice || product.price).toLocaleString('en-IN')}</p>
                      {product.discountPrice && <p className="text-xs text-stone-400 line-through">₹{product.price.toLocaleString('en-IN')}</p>}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${product.isApproved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {product.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/product/${product.slug}`} className="p-2 text-stone-400 hover:text-primary-600">
                          <FiEye size={16} />
                        </Link>
                        <button onClick={() => handleDelete(product._id)} className="p-2 text-stone-400 hover:text-accent-500">
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

export default SellerProducts;
