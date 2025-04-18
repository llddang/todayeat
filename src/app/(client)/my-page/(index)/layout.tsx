import { Suspense } from 'react';
import Header from '@/components/layouts/header/variants/header-default';
import Footer from '@/components/commons/footer';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="temp-layout">
      <Header />
      <div className="pt-layout">
        <Suspense>{children}</Suspense>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
