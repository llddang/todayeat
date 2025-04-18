import Header from '@/components/layouts/header/header';
import GlobalNavigationBar from '@/components/layouts/global-navigation-bar/global-navigation-bar';

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
