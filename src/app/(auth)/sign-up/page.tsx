'use client';

import AuthSignUpFunnel from '@/components/_auth/_sign-up/auth-sign-up-funnel';
import AuthSignUpProgressBar from '@/components/_auth/_sign-up/auth-sign-up-progress-bar';
import GlassBackground from '@/components/commons/glass-background';
import { STEP_UI_CONFIG } from '@/constants/set-goal.constant';
import { getPercentage } from '@/lib/utils/nutrition-calculator.util';
import { SignUpFunnelStep } from '@/types/sign-up-funnel-type';
import { useSearchParams } from 'next/navigation';

const SIGN_UP_LAST_STEP = 3;

const SignUpPage = () => {
  const params = useSearchParams();
  const currentStep = (params.get('step') || 'step1') as SignUpFunnelStep;

  const currentOrder = STEP_UI_CONFIG[currentStep].stepOrder;
  const progressPercent = Math.min(getPercentage(currentOrder, SIGN_UP_LAST_STEP), 100);

  const { hasGlassBackground, hasProgressBar } = STEP_UI_CONFIG[currentStep];

  const content = (
    <>
      {hasProgressBar && <AuthSignUpProgressBar percent={progressPercent} />}
      <AuthSignUpFunnel />
    </>
  );

  if (hasGlassBackground) {
    return <GlassBackground className="flex flex-col gap-6 px-5 pb-6 pt-7">{content}</GlassBackground>;
  }

  return <div className="flex flex-col gap-6 px-5 pb-6 pt-7">{content}</div>;
};
export default SignUpPage;
