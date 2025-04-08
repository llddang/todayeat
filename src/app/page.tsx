import ErrorHandler from '@/components/commons/error-handler';
import Header from '@/components/layouts/header';
import MenuBar from '@/components/layouts/menu-bar';
import { Suspense } from 'react';

const HomePage = () => {
  return (
    <div>
      <Suspense>
        <ErrorHandler />
      </Suspense>
      <Header />
      Home Page
      <MenuBar />
    </div>
  );
};

export default HomePage;
