import Header from '@/components/layouts/header';
import GlobalNavigationBar from '@/components/commons/global-navigation-bar';

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
