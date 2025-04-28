import { Suspense } from 'react';
import Header from '@/components/layouts/header';
import Footer from '@/components/commons/footer';
import { Metadata } from 'next';
import GlobalNavigationBar from '@/components/layouts/global-navigation-bar';

export const metadata: Metadata = {
  title: '온보딩 | 투데잇',
  description:
    '투데잇의 주요 기능과 AI 분석 서비스를 빠르게 확인해보시고, 투데잇과 함께 식단 기록을 쉽고 간편하게 시작해보세요.'
};

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-white layout-container">
      <Header variant="withProfile" />
      <div className="mx-auto pb-36 pt-layout bg-gradient-onboarding xl:p-20">
        <Suspense>{children}</Suspense>
        <Footer />
        <GlobalNavigationBar />
      </div>
    </div>
  );
};

export default Layout;
