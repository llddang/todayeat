import { ReactNode } from 'react';

type MainBackgroundProps = {
  children: ReactNode;
};

const MainBackground = ({ children }: MainBackgroundProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-background h-full w-full bg-gradient-main" />
      {children}
    </div>
  );
};

export default MainBackground;
