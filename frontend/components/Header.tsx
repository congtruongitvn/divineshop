'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, User, Search, LogOut, LayoutDashboard } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [search, setSearch] = useState('');
  const [showUser, setShowUser] = useState(false);
  const { count } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) router.push(`/products?q=${encodeURIComponent(search)}`);
  };

  return (
    <>
      <div className="bg-blue-700 text-white text-xs py-1.5 px-4 flex justify-between">
        <span>🔔 Cảnh báo: Nhận diện cuộc gọi lừa đảo</span>
        <div className="hidden md:flex gap-4">
          <Link href="/help" className="hover:text-yellow-300">Hướng dẫn mua hàng</Link>
          <Link href="/account" className="hover:text-yellow-300">Ưu đãi khách hàng</Link>
          <Link href="/contact" className="hover:text-yellow-300">Thông tin liên hệ</Link>
        </div>
      </div>

      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow">
              <span className="text-white font-black text-lg">D</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-black text-blue-600 text-lg leading-none">Divine</div>
              <div className="font-black text-gray-700 text-lg leading-none">Shop</div>
            </div>
          </Link>

          <form onSubmit={handleSearch} className="flex-1 flex items-center border-2 border-blue-500 rounded-lg overflow-hidden">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="flex-1 px-4 py-2.5 text-sm outline-none"
            />
            <button type="submit" className="bg-blue-600 px-4 py-2.5 text-white hover:bg-blue-700 transition">
              <Search size={18} />
            </button>
          </form>

          <div className="flex items-center gap-3 shrink-0">
            {user ? (
              <div className="relative">
                <button onClick={() => setShowUser(!showUser)} className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">{user.name[0].toUpperCase()}</span>
                  </div>
                  <span className="hidden md:block max-w-[80px] truncate">{user.name}</span>
                </button>
                {showUser && (
                  <div className="absolute right-0 top-10 bg-white border shadow-lg rounded-xl w-48 py-2 z-50">
                    <Link href="/account" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50" onClick={() => setShowUser(false)}>
                      <User size={14} /> Tài khoản
                    </Link>
                    <Link href="/account/orders" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50" onClick={() => setShowUser(false)}>
                      📦 Đơn hàng
                    </Link>
                    {user.role === 'admin' && (
                      <Link href="/admin" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 text-blue-600" onClick={() => setShowUser(false)}>
                        <LayoutDashboard size={14} /> Quản trị
                      </Link>
                    )}
                    <hr className="my-1" />
                    <button onClick={() => { logout(); setShowUser(false); }} className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full text-left">
                      <LogOut size={14} /> Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
                <User size={18} />
                <span className="hidden md:block">Đăng nhập</span>
              </Link>
            )}

            <Link href="/cart" className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 relative">
              <div className="relative">
                <ShoppingCart size={22} />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </div>
              <span className="hidden md:block">Giỏ hàng</span>
            </Link>
          </div>
        </div>

        <nav className="bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto">
            {[
              { label: '🎁 Thủ thuật & Tin Tức', href: '/products?tab=tips' },
              { label: '🔥 Sale - Mã Giảm Giá', href: '/products?tab=sale' },
              { label: '✉️ Sản phẩm Mail', href: '/products?tab=mail' },
              { label: '📶 eSIM', href: '/products?tab=esim' },
              { label: '🤝 Liên hệ hợp tác', href: '/contact' },
              { label: '💼 Tuyển dụng', href: '/careers' },
            ].map(item => (
              <Link key={item.href} href={item.href}
                className="text-white text-sm whitespace-nowrap px-3 py-2.5 hover:bg-blue-700 transition">
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}
