'use client';

import SignUpFunnel from '@/app/(auth)/sign-up/components/sign-up-funnel';
import GlassBackground from '@/components/commons/glass-background';
import { getPercentage } from '@/utils/nutrition-calculator.util';
import { SignUpFunnelStep } from '@/app/(auth)/sign-up/types/funnel-type';
import { useSearchParams } from 'next/navigation';
import FunnelProgressSection from '@/components/commons/funnel-progress-section';
import { cn } from '@/lib/shadcn';

const SIGN_UP_LAST_STEP = 3;

const SignUpPage = () => {
  const params = useSearchParams();
  const currentStep = (params.get('step') || 'step1') as SignUpFunnelStep;

  const isInStep = currentStep !== 'complete';

  const currentOrder = Number(currentStep.replace(/step/, ''));
  const progressPercent = getPercentage(currentOrder, SIGN_UP_LAST_STEP);

  const content = (
    <>
      {isInStep && <FunnelProgressSection percent={progressPercent} />}
      <SignUpFunnel />
    </>
  );

  if (isInStep) {
    return (
      <GlassBackground
        className={cn(
          'flex flex-col gap-6 px-5 pb-6 pt-7',
          'desktop-width xl:h-fit xl:min-h-0 xl:rounded-[2rem] xl:p-10'
        )}
      >
        {content}
      </GlassBackground>
    );
  }

  return <div className="flex flex-col gap-6 px-5 pb-6 pt-7">{content}</div>;
};
export default SignUpPage;
