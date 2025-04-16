import Header from '@/components/layouts/header';
import { Suspense } from 'react';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {/* TODO: Header 변경하기 */}
      <Header />
      <Suspense>{children}</Suspense>
    </>
  );
};

export default Layout;
