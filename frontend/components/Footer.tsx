import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">Divine Shop</h3>
          <p className="text-sm text-gray-400">Phần mềm bản quyền giá tốt nhất Việt Nam.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Hỗ trợ</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/help" className="hover:text-white">Hướng dẫn mua hàng</Link></li>
            <li><Link href="/faq" className="hover:text-white">Câu hỏi thường gặp</Link></li>
            <li><Link href="/contact" className="hover:text-white">Liên hệ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Chính sách</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/policy/privacy" className="hover:text-white">Chính sách bảo mật</Link></li>
            <li><Link href="/policy/refund" className="hover:text-white">Chính sách hoàn tiền</Link></li>
            <li><Link href="/terms" className="hover:text-white">Điều khoản sử dụng</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Kết nối</h4>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-500">f</a>
            <a href="#" className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-500">▶</a>
            <a href="#" className="w-9 h-9 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-300">t</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 text-center text-xs text-gray-500 py-4">
        © 2026 Divine Shop. All rights reserved.
      </div>
    </footer>
  );
}
