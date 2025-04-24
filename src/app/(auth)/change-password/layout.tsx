import Header from '@/components/layouts/header';
import { Suspense } from 'react';

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
      </main>
    </div>
  );
};

export default Layout;
