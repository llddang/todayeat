import { Suspense } from 'react';
import Header from '@/components/layouts/header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '건강 목표 설정 | 투데잇',
  description: '개인 맞춤형 영양 목표를 설정하고 더 건강한 식습관을 만들어 보세요',
  keywords: ['건강 목표', '영양 목표', '칼로리 설정', '식단 관리']
};

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="layout-container">
      <Header />
      <div className="desktop-width mx-auto pt-layout xl:py-[5.62rem]">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
};

export default Layout;
