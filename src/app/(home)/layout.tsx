import GlobalNavigationBar from '@/components/layouts/global-navigation-bar';
import HeaderWithProfile from '@/components/layouts/header-with-profile';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <HeaderWithProfile />
      <main className="my-16">{children}</main>
      <GlobalNavigationBar />
    </>
  );
};

export default Layout;
