import Header from '@/components/layouts/header';
import Footer from '@/components/commons/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인 | 투데잇',
  description: '투데잇 서비스에 로그인하고 당신만의 식단 기록을 시작',
  robots: 'noindex'
};

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="layout-container">
      <Header variant="backButton" />
      <div className="desktop-width mx-auto flex min-h-screen flex-col items-center justify-center pt-layout xl:pt-0">
        <main className="w-full">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
