'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ShoppingCart, Zap, Shield, Star } from 'lucide-react';
import { api } from '@/lib/api';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { add } = useCart();
  const router = useRouter();

  useEffect(() => {
    api.get(`/products/${slug}`).then(d => { setProduct(d); setLoading(false); }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-10 text-center"><div className="text-4xl animate-spin">⏳</div></div>;
  if (!product) return <div className="text-center py-20"><div className="text-5xl mb-4">😕</div><p>Không tìm thấy sản phẩm</p></div>;

  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const handleBuyNow = () => {
    add({ id: product.id, name: product.name, price: product.price, image: product.image, slug: product.slug, quantity: 1 });
    router.push('/checkout');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="bg-gray-50 flex items-center justify-center p-8 min-h-[300px]">
            {product.image ? (
              <img src={product.image} alt={product.name} className="max-h-64 object-contain rounded-xl" />
            ) : (
              <div className="text-8xl">📦</div>
            )}
          </div>

          {/* Info */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              {product.Category && <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">{product.Category.name}</span>}
              <h1 className="text-2xl font-bold text-gray-900 mt-3 mb-4">{product.name}</h1>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-black text-blue-600">{product.price?.toLocaleString('vi-VN')}đ</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-gray-400 line-through">{product.originalPrice.toLocaleString('vi-VN')}đ</span>
                    <span className="bg-red-500 text-white text-sm font-bold px-2 py-0.5 rounded-full">-{discount}%</span>
                  </>
                )}
              </div>

              <div className="space-y-2 mb-6">
                {[
                  { icon: <Zap size={14} />, text: 'Kích hoạt ngay sau thanh toán' },
                  { icon: <Shield size={14} />, text: 'Bảo hành theo chính sách' },
                  { icon: <Star size={14} />, text: 'Sản phẩm bản quyền chính hãng' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-green-600">
                    {item.icon} {item.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button onClick={handleBuyNow} className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2">
                <Zap size={18} /> Mua ngay
              </button>
              <button onClick={() => add({ id: product.id, name: product.name, price: product.price, image: product.image, slug: product.slug, quantity: 1 })}
                className="w-full border-2 border-blue-600 text-blue-600 font-bold py-3.5 rounded-xl hover:bg-blue-50 transition flex items-center justify-center gap-2">
                <ShoppingCart size={18} /> Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="border-t p-8">
            <h2 className="text-lg font-bold mb-4">📋 Mô tả sản phẩm</h2>
            <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{product.description}</div>
          </div>
        )}
      </div>
    </div>
  );
}
