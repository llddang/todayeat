import Footer from '@/components/commons/footer';
import HeaderBackButton from '@/components/layouts/header/variants/header-back-button';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="temp-layout">
      <HeaderBackButton />
      <main className="py-layout">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
