import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';

const SellerAddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subCategory: '',
    price: '',
    discountPrice: '',
    description: '',
    material: '',
    colors: '',
    sizes: '',
    stock: '',
    origin: 'Arunachal Pradesh',
    tribe: '',
    craftingMethod: '',
    storyBehindProduct: '',
    weight: '',
    artisanName: '',
    artisanLocation: '',
    artisanExperience: '',
    artisanBio: '',
    tags: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data.categories);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.price) {
      toast.error('Please fill required fields');
      return;
    }

    setLoading(true);
    try {
      const submitData = {
        ...formData,
        price: Number(formData.price),
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : 0,
        stock: Number(formData.stock) || 0,
        colors: formData.colors ? formData.colors.split(',').map(c => c.trim()) : [],
        sizes: formData.sizes ? formData.sizes.split(',').map(s => s.trim()) : [],
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : []
      };

      await api.post('/products', submitData);
      toast.success('Product added! Awaiting admin approval.');
      navigate('/seller/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = categories.find(c => c._id === formData.category);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-stone-600 hover:text-primary-600 mb-6 text-sm font-medium">
        <FiArrowLeft size={16} /> Back
      </button>

      <h1 className="text-2xl font-bold text-stone-800 mb-8">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl p-6 border border-stone-100">
          <h2 className="font-bold text-stone-800 mb-4">Basic Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1">Product Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" placeholder="e.g., Traditional Handwoven Shawl" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Category *</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 bg-white" required>
                <option value="">Select category</option>
                {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Sub Category</label>
              <select name="subCategory" value={formData.subCategory} onChange={handleChange} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 bg-white">
                <option value="">Select sub category</option>
                {selectedCategory?.subCategories?.map(sub => (
                  <option key={sub.slug} value={sub.name}>{sub.name}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 resize-none" placeholder="Describe your product..." />
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="bg-white rounded-xl p-6 border border-stone-100">
          <h2 className="font-bold text-stone-800 mb-4">Pricing & Stock</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Price (₹) *</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" required min="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Discount Price (₹)</label>
              <input type="number" name="discountPrice" value={formData.discountPrice} onChange={handleChange} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" min="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Stock</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" min="0" />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-xl p-6 border border-stone-100">
          <h2 className="font-bold text-stone-800 mb-4">Product Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Material</label>
              <input type="text" name="material" value={formData.material} onChange={handleChange} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" placeholder="e.g., Handwoven Cotton" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Weight</label>
              <input type="text" name="weight" value={formData.weight} onChange={handleChange} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" placeholder="e.g., 250g" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Colors (comma separated)</label>
              <input type="text" name="colors" value={formData.colors} onChange={handleChange} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" placeholder="Red, Black, Maroon" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Sizes (comma separated)</label>
              <input type="text" name="sizes" value={formData.sizes} onChange={handleChange} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" placeholder="S, M, L, XL" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Origin</label>
              <input type="text" name="origin" value={formData.origin} onChange={handleChange} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Tribe / Community</label>
              <input type="text" name="tribe" value={formData.tribe} onChange={handleChange} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" placeholder="e.g., Monpa" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1">Crafting Method</label>
              <input type="text" name="craftingMethod" value={formData.craftingMethod} onChange={handleChange} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" placeholder="e.g., Backstrap loom weaving" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1">Story Behind the Product</label>
              <textarea name="storyBehindProduct" value={formData.storyBehindProduct} onChange={handleChange} rows={3} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 resize-none" placeholder="Tell the story of this product..." />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1">Tags (comma separated)</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" placeholder="handloom, traditional, women" />
            </div>
          </div>
        </div>

        {/* Artisan Info */}
        <div className="bg-white rounded-xl p-6 border border-stone-100">
          <h2 className="font-bold text-stone-800 mb-4">Artisan Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Artisan Name</label>
              <input type="text" name="artisanName" value={formData.artisanName} onChange={handleChange} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Artisan Location</label>
              <input type="text" name="artisanLocation" value={formData.artisanLocation} onChange={handleChange} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" placeholder="e.g., Tawang, Arunachal Pradesh" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Experience</label>
              <input type="text" name="artisanExperience" value={formData.artisanExperience} onChange={handleChange} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" placeholder="e.g., 15 years" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Artisan Bio</label>
              <input type="text" name="artisanBio" value={formData.artisanBio} onChange={handleChange} className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default SellerAddProduct;
