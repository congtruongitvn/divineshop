'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Plus, Pencil, Trash2, Search, X, Upload } from 'lucide-react';

const EMPTY = { name: '', description: '', price: '', originalPrice: '', image: '', categoryId: '', stock: '', isActive: true, isFeatured: false, slug: '' };

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<any>(EMPTY);
  const [editing, setEditing] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  const load = () => {
    api.get('/products', token).then(d => setProducts(Array.isArray(d) ? d : []));
    api.get('/categories', token).then(d => setCategories(Array.isArray(d) ? d : []));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(EMPTY); setEditing(null); setShowModal(true); setMsg(''); };
  const openEdit = (p: any) => {
    setForm({ ...p, price: String(p.price), originalPrice: String(p.originalPrice || ''), stock: String(p.stock || '') });
    setEditing(p.id); setShowModal(true); setMsg('');
  };

  const handleSave = async () => {
    setLoading(true);
    const body = { ...form, price: Number(form.price), originalPrice: form.originalPrice ? Number(form.originalPrice) : null, stock: Number(form.stock || 0) };
    if (!body.slug) body.slug = body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now();
    try {
      if (editing) await api.put(`/admin/products/${editing}`, body, token);
      else await api.post('/admin/products', body, token);
      setMsg('✅ Lưu thành công!');
      load();
      setTimeout(() => { setShowModal(false); setMsg(''); }, 800);
    } catch { setMsg('❌ Lỗi, thử lại'); }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Xác nhận xóa sản phẩm này?')) return;
    await api.delete(`/admin/products/${id}`, token);
    load();
  };

  const filtered = products.filter(p => !search || p.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📦 Quản lý sản phẩm</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} sản phẩm</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition">
          <Plus size={18} /> Thêm sản phẩm
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
        <div className="flex items-center gap-3 border-2 border-gray-200 focus-within:border-blue-500 rounded-xl overflow-hidden px-3">
          <Search size={16} className="text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm sản phẩm..."
            className="flex-1 py-2.5 text-sm outline-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>{['Sản phẩm', 'Danh mục', 'Giá', 'Kho', 'Trạng thái', 'Thao tác'].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-gray-400">Không có sản phẩm nào</td></tr>
              ) : filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                        {p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">📦</div>}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 max-w-[200px] truncate">{p.name}</div>
                        <div className="text-xs text-gray-400">#{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{p.Category?.name || '—'}</td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-blue-600">{Number(p.price).toLocaleString('vi-VN')}đ</div>
                    {p.originalPrice && <div className="text-xs text-gray-400 line-through">{Number(p.originalPrice).toLocaleString('vi-VN')}đ</div>}
                  </td>
                  <td className="px-5 py-4">{p.stock ?? '∞'}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.isActive ? 'Hiển thị' : 'Ẩn'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Pencil size={15} /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold">{editing ? '✏️ Sửa sản phẩm' : '➕ Thêm sản phẩm'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Tên sản phẩm *', key: 'name', type: 'text', full: true },
                { label: 'Giá bán (đ) *', key: 'price', type: 'number' },
                { label: 'Giá gốc (đ)', key: 'originalPrice', type: 'number' },
                { label: 'Số lượng kho', key: 'stock', type: 'number' },
                { label: 'Slug URL', key: 'slug', type: 'text' },
                { label: 'Link ảnh', key: 'image', type: 'text' },
              ].map(f => (
                <div key={f.key} className={f.full ? 'md:col-span-2' : ''}>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5 uppercase">{f.label}</label>
                  <input type={f.type} value={form[f.key]}
                    onChange={e => setForm({...form, [f.key]: e.target.value})}
                    className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-xl px-3 py-2.5 text-sm outline-none transition" />
                </div>
              ))}

              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5 uppercase">Danh mục</label>
                <select value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})}
                  className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-xl px-3 py-2.5 text-sm outline-none">
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})}
                    className="w-4 h-4 accent-blue-600" />
                  <span className="text-sm font-medium">Hiển thị</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({...form, isFeatured: e.target.checked})}
                    className="w-4 h-4 accent-yellow-500" />
                  <span className="text-sm font-medium">Nổi bật ⭐</span>
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-600 block mb-1.5 uppercase">Mô tả</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={4}
                  className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-xl px-3 py-2.5 text-sm outline-none resize-none transition" />
              </div>

              {/* Preview image */}
              {form.image && (
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5 uppercase">Preview ảnh</label>
                  <img src={form.image} alt="preview" className="h-32 rounded-xl object-cover border" onError={e => (e.currentTarget.style.display='none')} />
                </div>
              )}
            </div>

            {msg && <div className="mx-6 mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl text-sm">{msg}</div>}

            <div className="flex gap-3 p-6 pt-0">
              <button onClick={() => setShowModal(false)} className="flex-1 border-2 border-gray-200 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">Hủy</button>
              <button onClick={handleSave} disabled={loading} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-60">
                {loading ? 'Đang lưu...' : editing ? 'Cập nhật' : 'Thêm sản phẩm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
