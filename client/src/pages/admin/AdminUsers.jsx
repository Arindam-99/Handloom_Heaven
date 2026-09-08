import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FiSearch, FiUserCheck, FiUserX } from 'react-icons/fi';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const fetchUsers = async () => {
    try {
      const params = {};
      if (roleFilter) params.role = roleFilter;
      if (search) params.search = search;
      const { data } = await api.get('/admin/users', { params });
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUser = async (id) => {
    try {
      const { data } = await api.put(`/admin/users/${id}/toggle`);
      setUsers(users.map(u => u._id === id ? data.user : u));
      toast.success('User status updated');
    } catch (error) {
      toast.error('Failed to update user');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
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
      <h1 className="text-2xl font-bold text-stone-800 mb-6">Manage Users</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex flex-1">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="flex-1 px-4 py-2 border border-stone-200 rounded-l-lg text-sm focus:outline-none focus:border-primary-400" />
          <button type="submit" className="bg-primary-600 text-white px-4 rounded-r-lg"><FiSearch size={18} /></button>
        </form>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="px-4 py-2 border border-stone-200 rounded-lg text-sm bg-white focus:outline-none focus:border-primary-400">
          <option value="">All Roles</option>
          <option value="user">Users</option>
          <option value="seller">Sellers</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-stone-600">User</th>
                <th className="text-left px-5 py-3 font-medium text-stone-600">Role</th>
                <th className="text-left px-5 py-3 font-medium text-stone-600">Joined</th>
                <th className="text-left px-5 py-3 font-medium text-stone-600">Status</th>
                <th className="text-right px-5 py-3 font-medium text-stone-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-stone-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold">{user.name?.charAt(0)}</div>
                      <div>
                        <p className="font-medium text-stone-800">{user.name}</p>
                        <p className="text-xs text-stone-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                      user.role === 'admin' ? 'bg-red-100 text-red-700' :
                      user.role === 'seller' ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{user.role}</span>
                  </td>
                  <td className="px-5 py-4 text-xs text-stone-500">{new Date(user.createdAt).toLocaleDateString('en-IN')}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button onClick={() => toggleUser(user._id)} className={`p-2 rounded-lg ${user.isActive ? 'text-red-500 hover:bg-red-50' : 'text-green-500 hover:bg-green-50'}`}>
                      {user.isActive ? <FiUserX size={16} /> : <FiUserCheck size={16} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length === 0 && <p className="text-center py-10 text-stone-500 text-sm">No users found</p>}
      </div>
    </div>
  );
};

export default AdminUsers;
