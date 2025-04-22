'use client';

import { cn } from '@/lib/shadcn';
import { useDetectIsScrolled } from '@/hooks/use-detect-is-scrolled';
import BackButton from './variants/back-button';
import Default from './variants/default';
import WithProfile from './variants/with-profile';

type HeaderVariants = 'backButton' | 'default' | 'withProfile';

type HeaderProps = {
  variant?: HeaderVariants; // ❗️여기 optional로 바꿔주기
};

const Header = ({ variant = 'default' }: HeaderProps) => {
  const isScrolled = useDetectIsScrolled();

  const renderVariant = () => {
    switch (variant) {
      case 'backButton':
        return <BackButton />;
      case 'default':
        return <Default />;
      case 'withProfile':
        return <WithProfile />;
      default:
        return <Default />;
    }
  };

  return (
    <header
      className={cn(
        'temp-layout fixed left-0 right-0 top-0 z-layout flex h-16 w-full items-center justify-between px-4 py-3',
        isScrolled ? 'bg-purple-10/[0.94] backdrop-blur-[20px]' : 'bg-transparent'
      )}
    >
      {renderVariant()}
    </header>
  );
};

export default Header;
