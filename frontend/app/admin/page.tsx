'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Package, ShoppingBag, Users, DollarSign, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  useEffect(() => {
    api.get('/products', token).then(d => setStats(s => ({ ...s, products: Array.isArray(d) ? d.length : 0 }))).catch(() => {});
    api.get('/admin/orders', token).then(d => {
      if (Array.isArray(d)) {
        setStats(s => ({
          ...s,
          orders: d.length,
          revenue: d.reduce((sum: number, o: any) => sum + Number(o.totalAmount || 0), 0)
        }));
        setRecentOrders(d.slice(0, 5));
      }
    }).catch(() => {});
    api.get('/admin/users', token).then(d => setStats(s => ({ ...s, users: Array.isArray(d) ? d.length : 0 }))).catch(() => {});
  }, []);

  const cards = [
    { label: 'Sản phẩm', value: stats.products, icon: <Package size={24} />, color: 'bg-blue-500', link: '/admin/products' },
    { label: 'Đơn hàng', value: stats.orders, icon: <ShoppingBag size={24} />, color: 'bg-green-500', link: '/admin/orders' },
    { label: 'Người dùng', value: stats.users, icon: <Users size={24} />, color: 'bg-purple-500', link: '/admin/users' },
    { label: 'Doanh thu', value: stats.revenue.toLocaleString('vi-VN') + 'đ', icon: <DollarSign size={24} />, color: 'bg-orange-500', link: '/admin/orders' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">📊 Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Tổng quan hệ thống Divine Shop</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => (
          <div key={card.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`${card.color} text-white w-12 h-12 rounded-xl flex items-center justify-center`}>{card.icon}</div>
              <ArrowUpRight size={16} className="text-green-500" />
            </div>
            <div className="text-2xl font-black text-gray-900">{card.value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-5 border-b flex items-center justify-between">
          <h2 className="font-bold text-gray-900">📦 Đơn hàng gần đây</h2>
          <a href="/admin/orders" className="text-blue-600 text-sm hover:underline">Xem tất cả</a>
        </div>
        {recentOrders.length === 0 ? (
          <div className="text-center py-10 text-gray-400">Chưa có đơn hàng nào</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>{['Mã đơn', 'Khách hàng', 'Tổng tiền', 'Trạng thái', 'Ngày'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-mono text-blue-600">#{order.id}</td>
                    <td className="px-5 py-3">{order.User?.name || 'N/A'}</td>
                    <td className="px-5 py-3 font-semibold">{Number(order.totalAmount).toLocaleString('vi-VN')}đ</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'completed' ? 'bg-green-100 text-green-700' :
                        order.status === 'paid' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-500">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
