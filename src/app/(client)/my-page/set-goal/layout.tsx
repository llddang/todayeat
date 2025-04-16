import { Suspense } from 'react';
import Header from '@/components/layouts/header';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <div className="pt-layout">
        <Suspense>{children}</Suspense>
      </div>
    </>
  );
};

export default Layout;
