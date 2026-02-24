'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Eye, X } from 'lucide-react';

const STATUS_COLORS: any = {
  pending: 'bg-yellow-100 text-yellow-700',
  paid: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};
const STATUS_LABELS: any = { pending: 'Chờ TT', paid: 'Đã TT', processing: 'Xử lý', completed: 'Hoàn thành', cancelled: 'Đã hủy' };

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [filter, setFilter] = useState('all');
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  const load = () => api.get('/admin/orders', token).then(d => setOrders(Array.isArray(d) ? d : []));
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: number, status: string) => {
    await api.put(`/admin/orders/${id}`, { status }, token);
    load();
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🛒 Quản lý đơn hàng</h1>
          <p className="text-gray-500 text-sm mt-1">{orders.length} đơn hàng</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {['all', 'pending', 'paid', 'processing', 'completed', 'cancelled'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${filter === s ? 'bg-blue-600 text-white' : 'bg-white border text-gray-600 hover:bg-gray-50'}`}>
            {s === 'all' ? 'Tất cả' : STATUS_LABELS[s]}
            <span className="ml-1.5 text-xs opacity-70">({s === 'all' ? orders.length : orders.filter(o => o.status === s).length})</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>{['Mã đơn', 'Khách hàng', 'Sản phẩm', 'Tổng tiền', 'Thanh toán', 'Trạng thái', 'Ngày', 'Chi tiết'].map(h => (
                <th key={h} className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-12 text-gray-400">Không có đơn hàng</td></tr>
              ) : filtered.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3.5 font-mono text-blue-600 font-medium">#{order.id}</td>
                  <td className="px-4 py-3.5">{order.User?.name || 'N/A'}<div className="text-xs text-gray-400">{order.User?.email}</div></td>
                  <td className="px-4 py-3.5 text-gray-500">{order.OrderItems?.length || 0} SP</td>
                  <td className="px-4 py-3.5 font-semibold">{Number(order.totalAmount).toLocaleString('vi-VN')}đ</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {order.paymentStatus === 'paid' ? 'Đã TT' : 'Chưa TT'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <select value={order.status} onChange={e => updateStatus(order.id, e.target.value)}
                      className={`text-xs font-medium px-2 py-1 rounded-lg border-0 outline-none cursor-pointer ${STATUS_COLORS[order.status]}`}>
                      {Object.entries(STATUS_LABELS).map(([val, label]) => (
                        <option key={val} value={val}>{label as string}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3.5 text-gray-500 text-xs">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => setSelected(order)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Eye size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h2 className="font-bold text-lg">📋 Chi tiết đơn #{selected.id}</h2>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 rounded-xl p-3"><div className="text-xs text-gray-500 mb-1">Khách hàng</div><div className="font-medium">{selected.User?.name}</div></div>
                <div className="bg-gray-50 rounded-xl p-3"><div className="text-xs text-gray-500 mb-1">Email</div><div className="font-medium truncate">{selected.User?.email}</div></div>
                <div className="bg-gray-50 rounded-xl p-3"><div className="text-xs text-gray-500 mb-1">Tổng tiền</div><div className="font-bold text-blue-600">{Number(selected.totalAmount).toLocaleString('vi-VN')}đ</div></div>
                <div className="bg-gray-50 rounded-xl p-3"><div className="text-xs text-gray-500 mb-1">Thanh toán</div><div className="font-medium">{selected.paymentMethod || 'N/A'}</div></div>
              </div>
              {selected.OrderItems?.length > 0 && (
                <div>
                  <div className="font-semibold mb-2">Sản phẩm đã mua</div>
                  {selected.OrderItems.map((item: any) => (
                    <div key={item.id} className="flex justify-between py-2 border-b text-sm">
                      <span className="text-gray-700">{item.Product?.name} × {item.quantity}</span>
                      <span className="font-medium">{(Number(item.price) * item.quantity).toLocaleString('vi-VN')}đ</span>
                    </div>
                  ))}
                </div>
              )}
              {selected.notes && <div className="bg-yellow-50 rounded-xl p-3 text-sm"><div className="text-xs text-gray-500 mb-1">Ghi chú</div>{selected.notes}</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
