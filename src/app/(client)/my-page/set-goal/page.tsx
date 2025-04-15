'use client';

import GlassBackground from '@/components/commons/glass-background';
import { useSearchParams } from 'next/navigation';
import { getPercentage } from '@/lib/utils/nutrition-calculator.util';
import { FunnelStep } from '@/types/set-goal.type';
import { LAST_STEP_FOR_USER_INPUT, STEP_UI_CONFIG } from '@/constants/set-goal.constant';
import SetGoalProgressSection from '@/components/_set-goal/set-goal-progress-section';
import SetGoalFunnel from '@/components/_set-goal/set-goal-funnel';

const SetGoalPage = () => {
  const params = useSearchParams();
  const currentStep = (params.get('step') || 'step1') as FunnelStep;

  const currentOrder = STEP_UI_CONFIG[currentStep].stepOrder;
  const progressPercent = Math.min(getPercentage(currentOrder, LAST_STEP_FOR_USER_INPUT), 100);

  const currentUIConfig = STEP_UI_CONFIG[currentStep];

  const renderProgressBar = () => {
    if (!currentUIConfig.hasProgressBar) return null;

    return <SetGoalProgressSection percent={progressPercent} />;
  };

  if (currentUIConfig.hasGlassBackground) {
    return (
      <GlassBackground className="relative space-y-8">
        {renderProgressBar()}
        <SetGoalFunnel />
      </GlassBackground>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-60px)] space-y-8">
      {renderProgressBar()}
      <SetGoalFunnel />
    </div>
  );
};

export default SetGoalPage;
