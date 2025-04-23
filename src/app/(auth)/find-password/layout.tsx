import Header from '@/components/layouts/header';
import { Suspense } from 'react';
import TabVisibilityHandler from './components/tab-visibility-handler';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="layout-container xl:flex xl:h-screen xl:items-center xl:justify-center">
      <Header />
      <main className="desktop-width pt-layout xl:pt-0">
        <Suspense>{children}</Suspense>
        <TabVisibilityHandler />
      </main>
    </div>
  );
};

export default Layout;
