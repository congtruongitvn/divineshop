'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard, Package, Tag, ShoppingBag,
  Users, BarChart2, Settings, LogOut, ChevronRight
} from 'lucide-react';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { href: '/admin/products', label: 'Sản phẩm', icon: <Package size={18} /> },
  { href: '/admin/categories', label: 'Danh mục', icon: <Tag size={18} /> },
  { href: '/admin/orders', label: 'Đơn hàng', icon: <ShoppingBag size={18} /> },
  { href: '/admin/users', label: 'Người dùng', icon: <Users size={18} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (!u || JSON.parse(u).role !== 'admin') router.push('/auth/login');
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-gray-700">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-black">D</div>
            <div>
              <div className="font-bold text-sm">Divine Shop</div>
              <div className="text-xs text-gray-400">Quản trị viên</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV.map(item => {
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                {item.icon}
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-700">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-sm">{user.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{user.name}</div>
                <div className="text-xs text-gray-400 truncate">{user.email}</div>
              </div>
            </div>
          )}
          <button onClick={() => { logout(); router.push('/'); }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition text-sm w-full">
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
