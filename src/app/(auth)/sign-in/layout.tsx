import Header from '@/components/layouts/header';
import Footer from '@/components/commons/footer';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="layout-container">
      <Header variant="backButton" />
      <main className="pt-layout">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
