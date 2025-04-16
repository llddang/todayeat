import { cn } from '@/lib/utils';
import React, { HTMLAttributes, ReactNode } from 'react';

type GlassBackgroundProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const GlassBackground = ({ children, className, ...props }: GlassBackgroundProps) => {
  return (
    <div
      className={cn(
        'relative min-h-[calc(100vh-60px)] rounded-t-[2rem] border-[1px] border-white bg-white/50 px-5 pb-6 pt-4 backdrop-blur-[50px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassBackground;
