import Footer from '@/components/commons/footer';
import GlobalNavigationBar from '@/components/layouts/global-navigation-bar/global-navigation-bar';
import HeaderWithProfile from '@/components/layouts/header/header-with-profile';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="temp-layout">
      <HeaderWithProfile />
      <div className="py-layout">
        <main>{children}</main>
        <Footer />
      </div>
      <GlobalNavigationBar />
    </div>
  );
};

export default Layout;
