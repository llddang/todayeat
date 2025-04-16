'use client';

import { cn } from '@/lib/utils';
import { useDetectScroll } from '@/lib/hooks/use-detect-scroll';
import { useRouter } from 'next/navigation';

const HeaderBackButton = () => {
  const isScrolled = useDetectScroll();
  const router = useRouter();

  return (
    <header
      className={cn(
        'z-layout fixed left-0 top-0 flex h-16 w-full items-center px-4 py-3',
        isScrolled ? 'bg-purple-10/94 backdrop-blur-[20px]' : 'bg-transparent'
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
