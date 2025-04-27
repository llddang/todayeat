'use client';

import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/shadcn';
import GlassBackground from '@/components/commons/glass-background';
import FindPasswordFunnel from './components/find-password-funnel';
import { FindPasswordFunnelStep } from './types/funnel-type';

const FindPasswordPage = () => {
  const params = useSearchParams();
  const currentStep = (params.get('step') || 'step1') as FindPasswordFunnelStep;

  const isInStep = currentStep !== 'complete';

  if (isInStep) {
    return (
      <GlassBackground className={cn('px-5 pb-6 pt-7', 'desktop-width xl:h-fit xl:min-h-0 xl:rounded-[2rem] xl:p-10')}>
        <FindPasswordFunnel />
      </GlassBackground>
    );
  }

  return <FindPasswordFunnel />;
};
export default FindPasswordPage;
