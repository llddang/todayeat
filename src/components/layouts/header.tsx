'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useDetectScroll } from '@/lib/hooks/use-detect-scroll';
import LOGO from '@/../public/logo.svg';

const Header = () => {
  const isScrolled = useDetectScroll();

  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-50 flex h-16 w-full items-center px-4 py-3',
        isScrolled ? 'bg-purple-10/94 backdrop-blur-[20px]' : 'bg-transparent'
      )}
    >
      <Image src={LOGO} alt="투데잇 로고" />
    </header>
  );
};

export default Header;
