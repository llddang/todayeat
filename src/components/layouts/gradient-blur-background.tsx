import { ReactNode } from 'react';

type GradientBlurBackgroundProps = {
  children: ReactNode;
};

const GradientBlurBackground = ({ children }: GradientBlurBackgroundProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="bg-gradient-main absolute inset-0 z-background h-full w-full" />
      {children}
    </div>
  );
};

export default GradientBlurBackground;
