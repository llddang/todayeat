'use client';

import GlassBackground from '@/components/commons/glass-background';
import { useSearchParams } from 'next/navigation';
import { getPercentage } from '@/utils/nutrition-calculator.util';
import { useUserStore } from '@/store/user-store';
import ProgressSection from './components/progress-section';
import SetGoalFunnel from './components/set-goal-funnel';
import { LAST_STEP_FOR_USER_INPUT, STEP_UI_CONFIG } from './constants/funnel.constant';
import { FunnelStep } from './types/funnel.type';

const SetGoalPage = () => {
  const user = useUserStore((state) => state.user);
  const params = useSearchParams();
  const currentStep = (params.get('step') || 'step1') as FunnelStep;

  const currentOrder = STEP_UI_CONFIG[currentStep].stepOrder;
  const progressPercent = Math.min(getPercentage(currentOrder, LAST_STEP_FOR_USER_INPUT), 100);

  const currentUIConfig = STEP_UI_CONFIG[currentStep];

  const renderProgressBar = () => {
    if (!currentUIConfig.hasProgressBar) return null;

    return <ProgressSection percent={progressPercent} />;
  };

  const content = (
    <>
      {renderProgressBar()}
      <SetGoalFunnel userName={user.nickname} />
    </>
  );

  if (currentUIConfig.hasGlassBackground) {
    return <GlassBackground className="relative space-y-8">{content}</GlassBackground>;
  }

  return <div className="relative min-h-[calc(100vh-4rem)] space-y-8">{content}</div>;
};

export default SetGoalPage;
