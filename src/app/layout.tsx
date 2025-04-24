import { Suspense } from 'react';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import ErrorHandler from '@/components/commons/error-handler';
import './globals.css';
import MainBackground from '@/components/layouts/main-background';
import UserInitialize from '@/components/commons/user-initializer';
import { ENV } from '@/constants/env.constant';

const wantedSans = localFont({
  src: '../../public/fonts/WantedSansVariable.woff2',
  display: 'swap'
});

export const metadata: Metadata = {
  title: '투데잇 | todayeat',
  description: '먹기 전에 찰칵! 사진 한 장으로 내 식단을 똑똑하게 분석해주는 스마트 식단 관리 서비스',
  keywords: ['식단 기록', '영양 분석', 'AI 식단', '칼로리 계산', '투데잇'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: ENV.PROJECT_URL,
    title: '투데잇 | todayeat',
    description: '먹기 전에 찰칵! 사진 한 장으로 내 식단을 똑똑하게 분석해주는 스마트 식단 관리 서비스',
    siteName: '투데잇',
    images: {
      url: '/site-thumbnail.svg',
      width: 1521,
      height: 1080,
      alt: '투데잇 서비스 설명 이미지'
    }
  }
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
