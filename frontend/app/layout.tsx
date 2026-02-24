import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Divine Shop - Phần mềm bản quyền',
  description: 'Mua phần mềm bản quyền giá tốt nhất',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
