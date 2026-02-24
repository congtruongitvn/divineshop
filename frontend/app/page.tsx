export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#0f0f1a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>
          Divine<span style={{ color: '#7c3aed' }}>Shop</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem', marginBottom: '2rem' }}>
          Phần mềm bản quyền giá tốt nhất
        </p>
        <a href="/products" style={{ background: '#7c3aed', color: '#fff', padding: '12px 32px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600 }}>
          Mua ngay
        </a>
      </div>
    </main>
  );
}
