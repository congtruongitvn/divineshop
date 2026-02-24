import Link from 'next/link';

interface Props {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  slug?: string;
  badge?: string;
}

export default function ProductCard({ id, name, price, originalPrice, image, slug, badge }: Props) {
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;

  return (
    <Link href={`/products/${slug || id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition hover:-translate-y-1 cursor-pointer border border-gray-100">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-gray-100">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">📦</div>
          )}
          {badge && (
            <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded">
              {badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
              -{discount}%
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-sm text-gray-800 font-medium line-clamp-2 min-h-[40px]">{name}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-blue-600 font-bold text-base">
              {price.toLocaleString('vi-VN')}đ
            </span>
            {originalPrice && (
              <span className="text-gray-400 text-xs line-through">
                {originalPrice.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
