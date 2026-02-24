'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { api } from '@/lib/api';

const PRICES = [20000, 50000, 100000, 200000, 500000, 1000000];

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    api.get('/products').then(d => setProducts(Array.isArray(d) ? d : [])).catch(() => {});
    api.get('/categories').then(d => setCategories(Array.isArray(d) ? d : [])).catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">

      {/* Hero */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white min-h-[180px] flex flex-col justify-center">
          <h1 className="text-3xl font-black mb-2">Phần mềm bản quyền 🔑</h1>
          <p className="text-blue-100 mb-5">Giá tốt nhất – Kích hoạt ngay lập tức – Hỗ trợ 24/7</p>
          <Link href="/products" className="bg-white text-blue-600 font-bold px-6 py-2.5 rounded-full w-fit hover:bg-yellow-300 hover:text-blue-800 transition text-sm">
            🛒 Mua ngay
          </Link>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 p-6 text-white flex flex-col justify-center">
          <div className="text-5xl mb-3">🌐</div>
          <h2 className="text-xl font-bold">eSIM Du Lịch</h2>
          <p className="text-purple-100 text-sm mt-1">Kết nối mọi nơi trên thế giới</p>
          <Link href="/products?tab=esim" className="mt-3 text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full w-fit">Khám phá →</Link>
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">📂 Danh mục sản phẩm</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/products" className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white shadow-sm">Tất cả</Link>
            {categories.map((c: any) => (
              <Link key={c.id} href={`/products?category=${c.slug || c.id}`}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition shadow-sm">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">⭐ Sản phẩm nổi bật</h2>
          <Link href="/products" className="text-blue-600 text-sm font-medium hover:underline">Xem thêm →</Link>
        </div>
        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl text-gray-400">
            <div className="text-5xl mb-3">📦</div><p>Chưa có sản phẩm nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.slice(0, 8).map((p: any) => <ProductCard key={p.id} {...p} />)}
          </div>
        )}
      </div>

      {/* Bestsellers */}
      {products.length > 0 && (
        <div className="bg-gray-900 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-white">🔥 #Sản phẩm bán chạy nhất</h2>
            <Link href="/products?sort=popular" className="text-blue-400 text-sm hover:underline">Khám phá →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {products.slice(0, 6).map((p: any) => <ProductCard key={p.id} {...p} />)}
          </div>
        </div>
      )}

      {/* Price Filter */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">💰 Giá phù hợp</h2>
        <div className="flex flex-wrap gap-3">
          {PRICES.map(p => (
            <Link key={p} href={`/products?maxPrice=${p}`}
              className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-semibold bg-white hover:bg-blue-600 hover:text-white hover:border-blue-600 transition">
              {p.toLocaleString('vi-VN')}đ
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
