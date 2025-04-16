'use client';

import { cn } from '@/lib/utils';
import { useDetectIsScrolled } from '@/lib/hooks/use-detect-is-scrolled';
import { useRouter } from 'next/navigation';

const HeaderBackButton = () => {
  const isScrolled = useDetectIsScrolled();
  const router = useRouter();

  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-layout flex h-16 w-full items-center py-3 pl-2 pr-4',
        isScrolled ? 'bg-purple-10/94 backdrop-blur-[20px]' : 'bg-transparent',
        'temp-layout left-1/2 -translate-x-1/2'
      )}
    >
      <button
        onClick={() => router.back()}
        aria-label="뒤로가기"
        className="h-10 w-10 bg-back-line-icon bg-contain bg-center bg-no-repeat"
      />
    </header>
  );
};

export default HeaderBackButton;
