import ErrorHandler from '@/components/commons/error-handler';
import { Suspense } from 'react';

const HomePage = () => {
  return (
    <div>
      <Suspense>
        <ErrorHandler />
      </Suspense>
      Home Page
    </div>
  );
};

export default HomePage;
