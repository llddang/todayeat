import Header from '@/components/layouts/header';
import Footer from '@/components/commons/footer';
import GlobalNavigationBar from '@/components/layouts/global-navigation-bar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '식사 기록하기 | 투데잇',
  description: '사진을 찍기만 하면 AI가 자동으로 칼로리와 영양소를 계산해주는 식단 기록을 이용해 보세요',
  keywords: ['식단 기록', '음식 분석', 'AI 영양소 계산', '칼로리 기록']
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
        <main className="mx-auto desktop-width">{children}</main>
        <Footer />
      </div>
      <GlobalNavigationBar />
    </div>
  );
};

export default Layout;
