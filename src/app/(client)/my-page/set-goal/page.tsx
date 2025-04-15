'use client';

import { Suspense } from 'react';
import useFunnel from '@/lib/hooks/use-funnel';
import GlassBackground from '@/components/commons/glass-background';
import SetGoalPurposeStep from '@/components/_set-goal/set-goal-purpose-step';
import SetGoalGenderStep from '@/components/_set-goal/set-goal-gender-step';
import SetGoalAgeStep from '@/components/_set-goal/set-goal-age-step';
import SetGoalHeightStep from '@/components/_set-goal/set-goal-height-step';
import SetGoalWeightStep from '@/components/_set-goal/set-goal-weight-step';
import SetGoalActivityLevelStep from '@/components/_set-goal/set-goal-activity-level-step';
import SetGoalAiLoadingStep from '@/components/_set-goal/set-goal-ai-loading-step';
import SetGoalCaculateStep from '@/components/_set-goal/set-goal-caculate-step';
import SetGoalComplete from '@/components/_set-goal/set-goal-complete';
import { Typography } from '@/components/ui/typography';
import { useSearchParams } from 'next/navigation';
import { ActivityLevelType, GenderType, PurposeType } from '@/types/user-personal-info.type';
import { getPercentage } from '@/lib/utils/nutrition-calculator.util';
import {
  CompleteType,
  FunnelStep,
  Step1Type,
  Step2Type,
  Step3Type,
  Step4Type,
  Step5Type,
  Step6Type
} from '@/types/set-goal.type';
import { LAST_STEP_FOR_USER_INPUT, STEP_UI_CONFIG } from '@/constants/set-goal.constant';

const SetGoalPage = () => {
  const params = useSearchParams();
  const currentStep = (params.get('step') || 'step1') as FunnelStep;

  const currentOrder = STEP_UI_CONFIG[currentStep].stepOrder;
  const progressPercent = Math.min(getPercentage(currentOrder, LAST_STEP_FOR_USER_INPUT), 100);

  const currentUIConfig = STEP_UI_CONFIG[currentStep];

  const Funnel = useFunnel<
    {
      step1: Step1Type;
      step2: Step2Type;
      step3: Step3Type;
      step4: Step4Type;
      step5: Step5Type;
      step6: Step6Type;
      step7: CompleteType;
      step8: CompleteType;
      complete: CompleteType;
    },
    FunnelStep
  >(
    'step1',
    {
      step1: () => true,
      step2: ({ purpose }) => !!purpose,
      step3: ({ purpose, gender }) => !!purpose && !!gender,
      step4: ({ purpose, gender, age }) => !!purpose && !!gender && !!age,
      step5: ({ purpose, gender, age, height }) => !!purpose && !!gender && !!age && !!height,
      step6: ({ purpose, gender, age, height, weight }) => !!purpose && !!gender && !!age && !!height && !!weight,
      step7: ({ purpose, gender, age, height, weight, activityLevel }) =>
        !!purpose && !!gender && !!age && !!height && !!weight && !!activityLevel,
      step8: ({ purpose, gender, age, height, weight, activityLevel }) =>
        !!purpose && !!gender && !!age && !!height && !!weight && !!activityLevel,
      complete: ({ purpose, gender, age, height, weight, activityLevel }) =>
        !!purpose && !!gender && !!age && !!height && !!weight && !!activityLevel
    },
    'session-key'
  );

  const renderContent = () => (
    <Suspense>
      <Funnel
        step1={({ setStep }) => (
          <SetGoalPurposeStep userName={'김준현'} nextStep={(purpose: PurposeType) => setStep('step2', { purpose })} />
        )}
        step2={({ setStep }) => (
          <SetGoalGenderStep userName={'김준현'} nextStep={(gender: GenderType) => setStep('step3', { gender })} />
        )}
        step3={({ setStep }) => (
          <SetGoalAgeStep userName={'김준현'} nextStep={(age: number) => setStep('step4', { age })} />
        )}
        step4={({ setStep }) => (
          <SetGoalHeightStep userName={'김준현'} nextStep={(height: number) => setStep('step5', { height })} />
        )}
        step5={({ setStep }) => (
          <SetGoalWeightStep userName={'김준현'} nextStep={(weight: number) => setStep('step6', { weight })} />
        )}
        step6={({ setStep }) => (
          <SetGoalActivityLevelStep
            userName={'김준현'}
            nextStep={(data: ActivityLevelType) => setStep('step7', { activityLevel: data })}
          />
        )}
        step7={({ setStep }) => <SetGoalAiLoadingStep nextStep={() => setStep('step8')} />}
        step8={({ setStep, data }) => <SetGoalCaculateStep userName={'김준현'} data={data} nextStep={setStep} />}
        complete={() => <SetGoalComplete userName={'김준현'} />}
      />
    </Suspense>
  );

  const renderProgressBar = () => {
    if (!currentUIConfig.hasProgressBar) return null;

    return (
      <div>
        <Typography as="h2" variant={'subTitle4'} className="flex h-10 items-center text-gray-600">
          목표 설정하기
        </Typography>
        <div className="relative h-1 w-full rounded-sm bg-gray-200">
          <span
            className="bg-gradient-linear-progress absolute left-0 top-0 block h-1 w-full transition-all"
            style={{ width: `${progressPercent}%` }}
          ></span>
        </div>
      </div>
    );
  };

  if (currentUIConfig.hasGlassBackground) {
    return (
      <GlassBackground className="relative space-y-8">
        {renderProgressBar()}
        {renderContent()}
      </GlassBackground>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-60px)] space-y-8">
      {renderProgressBar()}
      {renderContent()}
    </div>
  );
};

export default SetGoalPage;
