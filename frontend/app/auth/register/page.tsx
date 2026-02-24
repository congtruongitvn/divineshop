'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setError('Mật khẩu xác nhận không khớp');
    setLoading(true); setError('');
    try {
      const data = await api.post('/auth/register', { name: form.name, email: form.email, password: form.password });
      if (data.token) { login(data.token, data.user); router.push('/'); }
      else setError(data.message || 'Đăng ký thất bại');
    } catch { setError('Lỗi kết nối'); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-black text-2xl">D</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Đăng ký</h1>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-sm mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Họ và tên', key: 'name', type: 'text', placeholder: 'Nguyễn Văn A' },
              { label: 'Email', key: 'email', type: 'email', placeholder: 'email@example.com' },
              { label: 'Mật khẩu', key: 'password', type: 'password', placeholder: '••••••••' },
              { label: 'Xác nhận mật khẩu', key: 'confirm', type: 'password', placeholder: '••••••••' },
            ].map(field => (
              <div key={field.key}>
                <label className="text-sm font-medium text-gray-700 block mb-1">{field.label}</label>
                <input type={field.type} value={(form as any)[field.key]}
                  onChange={e => setForm({...form, [field.key]: e.target.value})}
                  className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm outline-none transition"
                  placeholder={field.placeholder} required />
              </div>
            ))}
            <button type="submit" disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition disabled:opacity-60">
              {loading ? 'Đang xử lý...' : 'Tạo tài khoản'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Đã có tài khoản?{' '}
            <Link href="/auth/login" className="text-blue-600 font-semibold hover:underline">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
