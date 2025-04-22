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
      <div className="desktop-width mx-auto flex flex-col items-center justify-center pt-layout xl:min-h-[100vh] xl:pt-20">
        <main className="w-full">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
