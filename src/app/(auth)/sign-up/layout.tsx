import { Suspense } from 'react';
import Header from '@/components/layouts/header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 | 투데잇',
  description: '투데잇 서비스에 가입하고 AI 기반 식단 분석 서비스를 이용해 보세요',
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
      <main className="pt-layout xl:flex xl:min-h-screen xl:items-center xl:justify-center xl:pt-0">
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
};

export default Layout;
