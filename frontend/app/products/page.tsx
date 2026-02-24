'use client';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-white text-xl">Đang tải...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Sản phẩm</h1>
      {products.length === 0 ? (
        <p className="text-gray-400">Chưa có sản phẩm nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <div key={p.id} className="bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition">
              {p.image && <img src={p.image} alt={p.name} className="w-full h-48 object-cover rounded-lg mb-3" />}
              <h2 className="text-white font-semibold">{p.name}</h2>
              <p className="text-purple-400 font-bold mt-1">{p.price?.toLocaleString('vi-VN')}đ</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
