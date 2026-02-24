'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

const PRICE_FILTERS = [20000, 50000, 100000, 200000, 500000, 1000000];

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API}/products`).then(r => r.json()).then(setProducts).catch(() => {});
    fetch(`${API}/categories`).then(r => r.json()).then(setCategories).catch(() => {});
  }, []);

  const featured = products.slice(0, 8);
  const bestsellers = products.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">

      {/* Hero Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl p-8 text-white flex flex-col justify-center min-h-[200px]">
          <h1 className="text-3xl font-bold mb-2">Phần mềm bản quyền</h1>
          <p className="text-blue-100 mb-4">Giá tốt nhất – Kích hoạt ngay lập tức</p>
          <Link href="/products" className="bg-white text-blue-600 font-bold px-6 py-2 rounded-full w-fit hover:bg-blue-50 transition">
            Mua ngay →
          </Link>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl p-6 text-white flex flex-col justify-center">
          <div className="text-4xl mb-2">🌐</div>
          <h2 className="text-xl font-bold">eSIM Du Lịch</h2>
          <p className="text-sm text-purple-100 mt-1">Kết nối mọi nơi trên thế giới</p>
        </div>
      </div>

      {/* Category Pills */}
      {categories.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-3">Danh mục nổi bật</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat: any) => (
              <Link key={cat.id} href={`/products?category=${cat.slug}`}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition shadow-sm">
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured Products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">⭐ Sản phẩm nổi bật</h2>
          <Link href="/products" className="text-blue-600 text-sm hover:underline">Khám phá →</Link>
        </div>
        {featured.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white rounded-xl">
            <div className="text-4xl mb-2">📦</div>
            <p>Chưa có sản phẩm</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((p: any) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        )}
      </div>

      {/* Bestsellers */}
      <div className="bg-gray-900 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">🔥 #Sản phẩm bán chạy nhất</h2>
          <Link href="/products?sort=bestseller" className="text-blue-400 text-sm hover:underline">Khám phá →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {bestsellers.map((p: any) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-3">💰 Giá phù hợp</h2>
        <div className="flex flex-wrap gap-3">
          {PRICE_FILTERS.map(price => (
            <Link key={price} href={`/products?maxPrice=${price}`}
              className="px-5 py-2 rounded-lg border border-gray-300 text-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition bg-white font-medium">
              {price.toLocaleString('vi-VN')}đ
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
