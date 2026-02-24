'use client';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, remove, update, total } = useCart();

  if (items.length === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
      <h2 className="text-xl font-bold text-gray-700 mb-2">Giỏ hàng trống</h2>
      <p className="text-gray-500 mb-6">Thêm sản phẩm vào giỏ để tiếp tục</p>
      <Link href="/products" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">Tiếp tục mua sắm</Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">🛒 Giỏ hàng ({items.length} sản phẩm)</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-xl p-4 flex items-center gap-4 border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{item.name}</p>
                <p className="text-blue-600 font-bold">{item.price.toLocaleString('vi-VN')}đ</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => update(item.id, item.quantity - 1)} className="w-7 h-7 rounded-lg border flex items-center justify-center hover:bg-gray-50"><Minus size={14} /></button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button onClick={() => update(item.id, item.quantity + 1)} className="w-7 h-7 rounded-lg border flex items-center justify-center hover:bg-gray-50"><Plus size={14} /></button>
              </div>
              <p className="font-bold text-gray-800 w-24 text-right">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
              <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-600 p-1"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm h-fit sticky top-28">
          <h3 className="font-bold text-gray-800 mb-4">📋 Tóm tắt đơn hàng</h3>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between text-gray-600"><span>Tạm tính</span><span>{total.toLocaleString('vi-VN')}đ</span></div>
            <div className="flex justify-between text-green-600"><span>Giảm giá</span><span>-0đ</span></div>
            <hr />
            <div className="flex justify-between font-bold text-base"><span>Tổng cộng</span><span className="text-blue-600">{total.toLocaleString('vi-VN')}đ</span></div>
          </div>
          <Link href="/checkout" className="block w-full bg-blue-600 text-white text-center font-bold py-3 rounded-xl hover:bg-blue-700 transition">
            Tiến hành thanh toán →
          </Link>
          <Link href="/products" className="block w-full text-center text-sm text-gray-500 mt-3 hover:text-blue-600">← Tiếp tục mua sắm</Link>
        </div>
      </div>
    </div>
  );
}
