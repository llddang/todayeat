import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Todayeat',
  description: '사진을 찍기만 하면 음식을 자동으로 인식하고 영양 정보를 기록해주는 웹 애플리케이션.'
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
};

export default RootLayout;
