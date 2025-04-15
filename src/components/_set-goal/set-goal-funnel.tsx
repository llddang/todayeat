import SetGoalActivityLevelStep from '@/components/_set-goal/set-goal-activity-level-step';
import SetGoalAgeStep from '@/components/_set-goal/set-goal-age-step';
import SetGoalAiLoadingStep from '@/components/_set-goal/set-goal-ai-loading-step';
import SetGoalCalculateStep from '@/components/_set-goal/set-goal-caculate-step';
import SetGoalComplete from '@/components/_set-goal/set-goal-complete';
import SetGoalGenderStep from '@/components/_set-goal/set-goal-gender-step';
import SetGoalHeightStep from '@/components/_set-goal/set-goal-height-step';
import SetGoalPurposeStep from '@/components/_set-goal/set-goal-purpose-step';
import SetGoalWeightStep from '@/components/_set-goal/set-goal-weight-step';
import useFunnel from '@/lib/hooks/use-funnel';
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
import { ActivityLevelType, GenderType, PurposeType } from '@/types/user-personal-info.type';
import { Suspense } from 'react';

const SetGoalFunnel = () => {
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

  return (
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
        step8={({ setStep, data }) => <SetGoalCalculateStep userName={'김준현'} data={data} nextStep={setStep} />}
        complete={() => <SetGoalComplete userName={'김준현'} />}
      />
    </Suspense>
  );
};

export default SetGoalFunnel;
