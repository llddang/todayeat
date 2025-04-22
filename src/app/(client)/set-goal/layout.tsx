import { Suspense } from 'react';
import Header from '@/components/layouts/header/variants/header-default';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="layout-container">
      <Header />
      <div className="desktop-width mx-auto pt-layout xl:py-[5.62rem]">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
};

export default Layout;
