'use client';

import { cn } from '@/lib/utils';
import { useDetectIsScrolled } from '@/hooks/use-detect-is-scrolled';
import { ReactNode } from 'react';

const HeaderLayer = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const isScrolled = useDetectIsScrolled();

  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-layout flex h-16 w-full items-center justify-between px-4 py-3',
        isScrolled ? 'bg-purple-10/94 backdrop-blur-[20px]' : 'bg-transparent',
        'left-1/2 -translate-x-1/2 temp-layout'
      )}
    >
      {children}
    </header>
  );
};

export default HeaderLayer;
