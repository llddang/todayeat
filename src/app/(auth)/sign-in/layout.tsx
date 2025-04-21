import Header from '@/components/layouts/header';
import Footer from '@/components/commons/footer';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="temp-layout">
      <Header variant="backButton" />
      <main className="py-layout">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
