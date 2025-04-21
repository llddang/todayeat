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
      <main className="pt-layout">
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
};

export default Layout;
