import { Suspense } from 'react';
import Header from '@/components/layouts/header';
import Footer from '@/components/commons/footer';
import { Metadata } from 'next';
import GlobalNavigationBar from '@/components/layouts/global-navigation-bar';

export const metadata: Metadata = {
  title: '온보딩 | 투데잇',
  description: '수정 필요'
};

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-white layout-container">
      <Header variant="withProfile" />
      <div className="bg-gradient-onboarding mx-auto pb-36 pt-layout xl:pt-20">
        <Suspense>{children}</Suspense>
        <Footer />
        <GlobalNavigationBar />
      </div>
    </div>
  );
};

export default Layout;
