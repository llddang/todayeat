import Header from '@/components/layouts/header/variants/header-default';
import GlobalNavigationBar from '@/components/layouts/global-navigation-bar';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      {children}
      <GlobalNavigationBar />
    </>
  );
};

export default Layout;
