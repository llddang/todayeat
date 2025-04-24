import Header from '@/components/layouts/header';
import Footer from '@/components/commons/footer';
import GlobalNavigationBar from '@/components/layouts/global-navigation-bar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '비밀번호 찾기 | 투데잇',
  description: '투데잇 계정의 비밀번호를 재설정해 보세요',
  robots: 'noindex'
};

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="temp-layout">
      <Header variant="withProfile" />
      <div className="p-layout">
        <main>{children}</main>
        <Footer />
      </div>
      <GlobalNavigationBar />
    </div>
  );
};

export default Layout;
