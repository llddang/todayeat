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
      <main className="mx-auto max-w-[73.75rem] border border-red-900 xl:mb-5 xl:flex xl:max-h-[calc(100vh-11rem)] xl:gap-5">
        {children}
      </main>
      <Footer />
      <GlobalNavigationBar />
    </div>
  );
};

export default Layout;
