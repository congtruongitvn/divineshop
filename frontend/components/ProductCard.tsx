'use client';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface Props {
  id: number; name: string; price: number; originalPrice?: number;
  image?: string; slug?: string; badge?: string; isFeatured?: boolean;
}

export default function ProductCard({ id, name, price, originalPrice, image, slug, badge }: Props) {
  const { add } = useCart();
  const discount = originalPrice && originalPrice > price ? Math.round((1 - price / originalPrice) * 100) : 0;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 border border-gray-100 group">
      <Link href={`/products/${slug || id}`}>
        <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">📦</div>
          )}
          {badge && <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">{badge}</span>}
          {discount > 0 && <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">-{discount}%</span>}
        </div>
      </Link>
      <div className="p-3">
        <Link href={`/products/${slug || id}`}>
          <p className="text-sm text-gray-800 font-medium line-clamp-2 min-h-[40px] hover:text-blue-600">{name}</p>
        </Link>
        <div className="mt-2 flex items-end justify-between gap-2">
          <div>
            <span className="text-blue-600 font-bold">{price?.toLocaleString('vi-VN')}đ</span>
            {originalPrice && originalPrice > price && (
              <div className="text-gray-400 text-xs line-through">{originalPrice.toLocaleString('vi-VN')}đ</div>
            )}
          </div>
          <button
            onClick={() => add({ id, name, price, image, slug, quantity: 1 })}
            className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shrink-0"
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
