export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0f0f1a] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-black mb-4">
          Divine<span className="text-violet-400">Shop</span>
        </h1>
        <p className="text-white/50 text-xl mb-8">Phần mềm bản quyền giá tốt nhất</p>
        <a href="/products" className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all">Mua ngay</a>
      </div>
    </main>
  );
}
