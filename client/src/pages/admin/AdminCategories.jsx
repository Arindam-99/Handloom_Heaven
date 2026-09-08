import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data.categories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.name) { toast.error('Name is required'); return; }
    try {
      await api.post('/categories', formData);
      toast.success('Category created');
      setFormData({ name: '', description: '' });
      setShowForm(false);
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await api.delete(`/categories/${id}`);
      toast.success('Category deleted');
      fetchCategories();
    } catch (error) {
      toast.error('Failed to delete');
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-800">Manage Categories</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-primary-700 inline-flex items-center gap-2"
        >
          <FiPlus size={16} /> Add Category
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl p-5 border border-stone-100 mb-6">
          <div className="flex gap-3">
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Category name" className="flex-1 px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" required />
            <input type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description (optional)" className="flex-1 px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-primary-400" />
            <button type="submit" className="bg-primary-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-700">Create</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-stone-600">Name</th>
                <th className="text-left px-5 py-3 font-medium text-stone-600">Slug</th>
                <th className="text-left px-5 py-3 font-medium text-stone-600">Sub-categories</th>
                <th className="text-left px-5 py-3 font-medium text-stone-600">Status</th>
                <th className="text-right px-5 py-3 font-medium text-stone-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {categories.map((cat) => (
                <tr key={cat._id} className="hover:bg-stone-50">
                  <td className="px-5 py-4 font-medium text-stone-800">{cat.name}</td>
                  <td className="px-5 py-4 text-stone-500 text-xs">{cat.slug}</td>
                  <td className="px-5 py-4 text-stone-600 text-xs">{cat.subCategories?.length || 0}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${cat.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {cat.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button onClick={() => handleDelete(cat._id)} className="p-2 text-stone-400 hover:text-accent-500 rounded-lg">
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
