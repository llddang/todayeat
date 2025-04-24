import Header from '@/components/layouts/header';
import Footer from '@/components/commons/footer';
import GlobalNavigationBar from '@/components/layouts/global-navigation-bar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '식단 리포트 | 투데잇',
  description: '나의 식단 기록을 분석한 리포트를 확인하고 더 건강한 식습관을 만들어 보세요',
  keywords: ['식단 분석', '영양소 리포트', '식습관 분석', '건강 리포트']
};

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="layout-container">
      <Header variant="withProfile" />
      <div className="py-layout">
        <main>{children}</main>
        <Footer />
      </div>
      <GlobalNavigationBar />
    </div>
  );
};

export default Layout;
