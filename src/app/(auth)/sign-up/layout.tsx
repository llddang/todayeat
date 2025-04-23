import { Suspense } from 'react';
import Header from '@/components/layouts/header';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="layout-container">
      <Header />
      <main className="pt-layout xl:flex xl:min-h-screen xl:items-center xl:pt-0">
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
};

export default Layout;
