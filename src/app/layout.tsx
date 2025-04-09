import { Suspense } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import ErrorHandler from '@/components/commons/error-handler';
import GradientBlurBackground from '@/components/layouts/gradient-blur-background';
import './globals.css';

const wantedSans = localFont({
  src: '../../public/fonts/WantedSansVariable.woff2',
  display: 'swap'
});

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
      <body className={`${wantedSans.className} antialiased`}>
        <Suspense>
          <ErrorHandler />
        </Suspense>
        <GradientBlurBackground>{children}</GradientBlurBackground>
      </body>
    </html>
  );
};

export default RootLayout;
