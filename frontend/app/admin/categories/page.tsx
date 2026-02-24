'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', slug: '', image: '', isActive: true });
  const [editing, setEditing] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  const load = () => api.get('/categories', token).then(d => setCategories(Array.isArray(d) ? d : []));
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm({ name: '', description: '', slug: '', image: '', isActive: true }); setEditing(null); setShowModal(true); };
  const openEdit = (c: any) => { setForm(c); setEditing(c.id); setShowModal(true); };

  const handleSave = async () => {
    setLoading(true);
    const body = { ...form, slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-') };
    if (editing) await api.put(`/admin/categories/${editing}`, body, token);
    else await api.post('/admin/categories', body, token);
    load(); setShowModal(false); setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Xóa danh mục này?')) return;
    await api.delete(`/admin/categories/${id}`, token); load();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🏷️ Quản lý danh mục</h1>
          <p className="text-gray-500 text-sm mt-1">{categories.length} danh mục</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition">
          <Plus size={18} /> Thêm danh mục
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
              {cat.image ? <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-xl" /> : '📂'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-gray-900 truncate">{cat.name}</div>
              <div className="text-xs text-gray-400 truncate">{cat.description || cat.slug}</div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => openEdit(cat)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={14} /></button>
              <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-lg">{editing ? 'Sửa danh mục' : 'Thêm danh mục'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              {[{ label: 'Tên danh mục *', key: 'name' }, { label: 'Slug', key: 'slug' }, { label: 'Link ảnh', key: 'image' }, { label: 'Mô tả', key: 'description' }].map(f => (
                <div key={f.key}>
                  <label className="text-xs font-semibold text-gray-600 uppercase block mb-1.5">{f.label}</label>
                  <input value={(form as any)[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})}
                    className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-xl px-3 py-2.5 text-sm outline-none" />
                </div>
              ))}
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} className="w-4 h-4 accent-blue-600" />
                <span className="text-sm">Hiển thị</span>
              </label>
            </div>
            <div className="flex gap-3 p-6 pt-0">
              <button onClick={() => setShowModal(false)} className="flex-1 border-2 border-gray-200 py-3 rounded-xl font-semibold hover:bg-gray-50">Hủy</button>
              <button onClick={handleSave} disabled={loading} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60">
                {loading ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
