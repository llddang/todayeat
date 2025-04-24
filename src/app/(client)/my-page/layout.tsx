import { Suspense } from 'react';
import Header from '@/components/layouts/header';
import Footer from '@/components/commons/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이 페이지 | 투데잇',
  description: '내 프로필 관리 및 건강 목표를 설정하고 관리해 보세요',
  robots: 'noindex'
};

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="layout-container">
      <Header />
      <div className="desktop-width mx-auto pt-layout xl:pt-20">
        <Suspense>{children}</Suspense>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
