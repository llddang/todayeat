import Header from '@/components/layouts/header';
import { Suspense } from 'react';
import TabVisibilityHandler from './_components/tab-visibility-handler';
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
    <div className="layout-container xl:flex xl:h-screen xl:items-center xl:justify-center">
      <Header />
      <main className="pt-layout desktop-width xl:pt-0">
        <Suspense>{children}</Suspense>
        <TabVisibilityHandler />
      </main>
    </div>
  );
};

export default Layout;
