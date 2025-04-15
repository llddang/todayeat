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
      <Suspense>{children}</Suspense>
    </>
  );
};

export default Layout;
