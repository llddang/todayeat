type GradientBlurBackgroundProps = {
  children: React.ReactNode;
};

const GradientBlurBackground = ({ children }: GradientBlurBackgroundProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="bg-gradient-blur absolute inset-0 -z-10 h-full w-full" />
      {children}
    </div>
  );
};

export default GradientBlurBackground;
