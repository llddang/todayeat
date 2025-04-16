'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useDetectIsScrolled } from '@/lib/hooks/use-detect-is-scrolled';
import LOGO from '@/../public/logo.svg';

const Header = () => {
  const isScrolled = useDetectIsScrolled();

  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-layout flex h-16 w-full items-center px-4 py-3',
        isScrolled ? 'bg-purple-10/94 backdrop-blur-[20px]' : 'bg-transparent',
        'temp-layout left-1/2 -translate-x-1/2'
      )}
    >
      <Image src={LOGO} alt="투데잇 로고" />
    </header>
  );
};

export default Header;
