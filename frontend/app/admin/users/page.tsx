'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Shield, User } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  useEffect(() => { api.get('/admin/users', token).then(d => setUsers(Array.isArray(d) ? d : [])); }, []);

  const filtered = users.filter(u => !search || u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">👥 Quản lý người dùng</h1>
          <p className="text-gray-500 text-sm mt-1">{users.length} tài khoản</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Tìm theo tên hoặc email..."
          className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>{['Người dùng', 'Email', 'Vai trò', 'Ngày đăng ký', 'Trạng thái'].map(h => (
              <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(u => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {u.name?.[0]?.toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-900">{u.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-500">{u.email}</td>
                <td className="px-5 py-4">
                  <span className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                    {u.role === 'admin' ? <Shield size={12} /> : <User size={12} />}
                    {u.role === 'admin' ? 'Admin' : 'Khách hàng'}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-500">{new Date(u.createdAt).toLocaleDateString('vi-VN')}</td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${u.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {u.isActive !== false ? 'Hoạt động' : 'Đã khóa'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
