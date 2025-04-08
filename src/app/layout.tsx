import type { Metadata } from 'next';
import './globals.css';
import { Suspense } from 'react';
import ErrorHandler from '@/components/commons/error-handler';

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
      <body className="antialiased">
        <Suspense>
          <ErrorHandler />
        </Suspense>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
