import Header from '@/components/layouts/header/variants/header-default';
import { Suspense } from 'react';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="temp-layout">
      <Header />
      <main className="py-layout">
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
};

export default Layout;
