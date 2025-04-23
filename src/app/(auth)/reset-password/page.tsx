'use client';

import { useSearchParams } from 'next/navigation';
import GlassBackground from '@/components/commons/glass-background';
import ResetPasswordFunnel from './components/reset-password-funnel';
import { ResetPasswordFunnelStep } from './types/funnel-type';

const ResetPasswordPage = () => {
  const params = useSearchParams();
  const currentStep = (params.get('step') || 'step1') as ResetPasswordFunnelStep;

  const isInStep = currentStep !== 'complete';

  if (isInStep) {
    return (
      <GlassBackground className="px-5 pb-6 pt-7 xl:min-h-0 xl:rounded-[2rem] xl:p-10">
        <ResetPasswordFunnel />
      </GlassBackground>
    );
  }

  return (
    <div className="flex flex-col gap-9 px-4">
      <ResetPasswordFunnel />
    </div>
  );
};
export default ResetPasswordPage;
