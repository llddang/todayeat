'use client';

import GlassBackground from '@/components/commons/glass-background';
import { useSearchParams } from 'next/navigation';
import { getPercentage } from '@/utils/nutrition-calculator.util';
import { useUserStore } from '@/store/user-store';
import SetGoalFunnel from './components/set-goal-funnel';
import { LAST_STEP_FOR_USER_INPUT, STEP_UI_CONFIG } from './constants/funnel.constant';
import { FunnelStep } from './types/funnel.type';
import FunnelProgressSection from '@/components/commons/funnel-progress-section';

const SetGoalPage = () => {
  const user = useUserStore((state) => state.user);
  const params = useSearchParams();
  const currentStep = (params.get('step') || 'step1') as FunnelStep;

  const currentOrder = STEP_UI_CONFIG[currentStep].stepOrder;
  const progressPercent = Math.min(getPercentage(currentOrder, LAST_STEP_FOR_USER_INPUT), 100);

  const currentUIConfig = STEP_UI_CONFIG[currentStep];

  const renderProgressBar = () => {
    if (!currentUIConfig.hasProgressBar) return null;

    return <FunnelProgressSection title="목표 설정하기" percent={progressPercent} />;
  };

  const content = (
    <>
      {renderProgressBar()}
      <SetGoalFunnel userName={user.nickname} />
    </>
  );

  if (currentUIConfig.hasGlassBackground) {
    return (
      <GlassBackground className="relative space-y-8 xl:min-h-fit xl:rounded-[2rem] xl:p-6">{content}</GlassBackground>
    );
  }

  return <div className="relative min-h-[calc(100vh-4rem)] space-y-8 xl:min-h-[calc(100vh-11.24rem)]">{content}</div>;
};

export default SetGoalPage;
