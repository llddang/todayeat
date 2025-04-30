'use client';

import { useSearchParams } from 'next/navigation';
import GlassBackground from '@/components/commons/glass-background';
import { ChangePasswordFunnelStep } from './_types/funnel-type';
import ChangePasswordFunnel from './_components/change-password-funnel';

const ResetPasswordPage = () => {
  const params = useSearchParams();
  const currentStep = (params.get('step') || 'step1') as ChangePasswordFunnelStep;

  const isInStep = currentStep !== 'complete';

  if (isInStep) {
    return (
      <GlassBackground className="px-5 pb-6 pt-7 xl:min-h-0 xl:rounded-[2rem] xl:p-10">
        <ChangePasswordFunnel />
      </GlassBackground>
    );
  }

  return (
    <div className="flex flex-col gap-9 px-4">
      <ChangePasswordFunnel />
    </div>
  );
};
export default ResetPasswordPage;
