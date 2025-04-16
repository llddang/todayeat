import Footer from '@/components/commons/footer';
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
      <div className="py-layout">
        <main>{children}</main>
        <Footer />
      </div>
      <GlobalNavigationBar />
    </>
  );
};

export default Layout;
