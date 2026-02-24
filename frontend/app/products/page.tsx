'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { api } from '@/lib/api';
import { Search, Filter } from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [selectedCat, setSelectedCat] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState('newest');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  useEffect(() => {
    api.get('/products').then(d => { setProducts(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
    api.get('/categories').then(d => setCategories(Array.isArray(d) ? d : [])).catch(() => {});
  }, []);

  const filtered = products
    .filter(p => !search || p.name?.toLowerCase().includes(search.toLowerCase()))
    .filter(p => !selectedCat || p.Category?.slug === selectedCat || String(p.categoryId) === selectedCat)
    .filter(p => !maxPrice || p.price <= Number(maxPrice))
    .sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : b.id - a.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">

        {/* Sidebar */}
        <aside className="w-full md:w-56 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-28">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Filter size={16} /> Bộ lọc</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Danh mục</label>
                <div className="space-y-1">
                  <button onClick={() => setSelectedCat('')} className={`w-full text-left text-sm px-3 py-1.5 rounded-lg ${!selectedCat ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}`}>Tất cả</button>
                  {categories.map((c: any) => (
                    <button key={c.id} onClick={() => setSelectedCat(c.slug || String(c.id))}
                      className={`w-full text-left text-sm px-3 py-1.5 rounded-lg ${selectedCat === (c.slug || String(c.id)) ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}`}>
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Giá tối đa</label>
                <select value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full text-sm border rounded-lg p-2 outline-none focus:border-blue-500">
                  <option value="">Tất cả giá</option>
                  {[20000,50000,100000,200000,500000,1000000].map(p => (
                    <option key={p} value={p}>{p.toLocaleString('vi-VN')}đ</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Sắp xếp</label>
                <select value={sort} onChange={e => setSort(e.target.value)} className="w-full text-sm border rounded-lg p-2 outline-none focus:border-blue-500">
                  <option value="newest">Mới nhất</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                </select>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 flex items-center border-2 border-gray-200 focus-within:border-blue-500 rounded-xl overflow-hidden bg-white">
              <Search size={16} className="ml-3 text-gray-400 shrink-0" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm sản phẩm..." className="flex-1 px-3 py-2.5 text-sm outline-none" />
            </div>
            <span className="text-sm text-gray-500 shrink-0">{filtered.length} sản phẩm</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => <div key={i} className="bg-gray-200 rounded-xl h-64 animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-lg">Không tìm thấy sản phẩm nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((p: any) => <ProductCard key={p.id} {...p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return <Suspense><ProductsContent /></Suspense>;
}
