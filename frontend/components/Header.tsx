'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';

export default function Header() {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="bg-blue-600 text-white text-xs py-1 px-4 flex justify-between items-center">
        <span>📞 Nhận diện cuộc gọi lừa đảo</span>
        <div className="flex gap-4">
          <span>Hướng dẫn mua hàng</span>
          <span>Ưu đãi khách hàng</span>
          <span>Thông tin liên hệ</span>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-bold text-blue-600 text-lg">Divine Shop</span>
          </Link>

          {/* Search */}
          <div className="flex-1 flex items-center border-2 border-blue-500 rounded-lg overflow-hidden">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="flex-1 px-4 py-2 text-sm outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              <Search size={18} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/auth/login" className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
              <User size={18} />
              <span className="hidden md:block">Đăng nhập</span>
            </Link>
            <Link href="/cart" className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 relative">
              <ShoppingCart size={18} />
              <span className="hidden md:block">Giỏ hàng</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </Link>
          </div>
        </div>

        {/* Nav links */}
        <div className="bg-blue-600 text-white text-sm">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 py-2 overflow-x-auto">
            <button className="flex items-center gap-1 whitespace-nowrap font-medium">
              <Menu size={16} /> Danh mục sản phẩm
            </button>
            <Link href="/products?tab=tips" className="whitespace-nowrap hover:text-yellow-300">🎁 Thủ thuật & Tin Tức</Link>
            <Link href="/products?tab=sale" className="whitespace-nowrap hover:text-yellow-300">🔥 Sản Sale - Mã Giảm Giá</Link>
            <Link href="/products?tab=mail" className="whitespace-nowrap hover:text-yellow-300">✉️ Sản phẩm mail</Link>
            <Link href="/products?tab=esim" className="whitespace-nowrap hover:text-yellow-300">📶 eSIM</Link>
          </div>
        </div>
      </header>
    </>
  );
}
