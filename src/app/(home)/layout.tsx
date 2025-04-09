import Header from '@/components/layouts/header';
import MenuBar from '@/components/layouts/menu-bar';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      {children}
      <MenuBar />
    </>
  );
};

export default Layout;
