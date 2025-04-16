import Footer from '@/components/commons/footer';
import Header from '@/components/layouts/header';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {/* TODO: Header 변경하기 */}
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
