import { Suspense } from 'react';
import Header from '@/components/layouts/header/variants/header-default';
import Footer from '@/components/commons/footer';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="layout-container">
      <Header />
      <div className="desktop-width mx-auto pt-layout xl:pt-20">
        <Suspense>{children}</Suspense>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
