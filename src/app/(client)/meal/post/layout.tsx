import Header from '@/components/layouts/header';
import Footer from '@/components/commons/footer';
import GlobalNavigationBar from '@/components/layouts/global-navigation-bar';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="py-layout layout-container xl:pb-0 xl:pt-20">
      <Header variant="withProfile" />
      <div className="mx-auto flex min-h-screen flex-col desktop-width">
        <main> {children}</main>
        <Footer />
      </div>
      <GlobalNavigationBar />
    </div>
  );
};

export default Layout;
