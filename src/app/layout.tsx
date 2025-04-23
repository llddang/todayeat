import { Suspense } from 'react';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import ErrorHandler from '@/components/commons/error-handler';
import './globals.css';
import MainBackground from '@/components/layouts/main-background';
import UserInitialize from '@/components/commons/user-initializer';

const wantedSans = localFont({
  src: '../../public/fonts/WantedSansVariable.woff2',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Todayeat',
  description: '사진을 찍기만 하면 음식을 자동으로 인식하고 영양 정보를 기록해주는 웹 애플리케이션.'
};

export const viewport: Viewport = {
  viewportFit: 'cover'
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body className={`${wantedSans.className} text-gray-900 antialiased`}>
        <Suspense>
          <ErrorHandler />
        </Suspense>
        <MainBackground>{children}</MainBackground>
        <UserInitialize />
      </body>
    </html>
  );
};

export default RootLayout;
