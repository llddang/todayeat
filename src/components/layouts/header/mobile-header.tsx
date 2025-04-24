'use client';

import { cn } from '@/lib/shadcn';
import { useDetectIsScrolled } from '@/hooks/use-detect-is-scrolled';
import BackButton from './variants/back-button';
import Default from './variants/default';
import WithProfile from './variants/with-profile';

export type MobileHeaderProps = {
  variant?: 'backButton' | 'default' | 'withProfile';
};

const MobileHeader = ({ variant = 'default' }: MobileHeaderProps) => {
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
        'fixed left-0 right-0 top-0 z-layout flex h-16 w-full items-center justify-between px-4 py-3 layout-container',
        isScrolled ? 'bg-purple-10/[0.94] backdrop-blur-[20px]' : 'bg-transparent'
      )}
    >
      {renderVariant()}
    </header>
  );
};

export default MobileHeader;
