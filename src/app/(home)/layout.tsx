import GradientBlurBackground from '@/components/layouts/gradient-blur-background';
import Header from '@/components/layouts/header';
import MenuBar from '@/components/layouts/menu-bar';

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <GradientBlurBackground>
      <Header />
      {children}
      <MenuBar />
    </GradientBlurBackground>
  );
};

export default Layout;
