import { Suspense } from 'react';
import Header from '@/components/layouts/header';
import Footer from '@/components/commons/footer';

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
        <Footer />
      </div>
    </>
  );
};

export default Layout;
