import Header from '@/components/layouts/header';
import Footer from '@/components/commons/footer';
import GlobalNavigationBar from '@/components/layouts/global-navigation-bar';
import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  viewportFit: 'cover'
};

export const metadata: Metadata = {
  title: '식사 정보 | 투데잇',
  description:
    '투데잇에서 제공하는 식사 정보를 확인하세요. 건강한 식습관을 위한 맞춤형 식사 정보와 영양 성분을 제공합니다.'
};

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="layout-container">
      <Header variant="withProfile" />
      <div className="mx-auto py-layout pt-20 desktop-width">
        <main>{children}</main>
        <Footer />
      </div>
      <GlobalNavigationBar />
    </div>
  );
};

export default Layout;
