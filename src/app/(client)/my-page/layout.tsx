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
      <div className="layout-xl mx-auto pt-layout xl:pt-[5.25rem]">
        <Suspense>{children}</Suspense>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
