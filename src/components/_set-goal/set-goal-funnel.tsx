import { Suspense } from 'react';
import { z } from 'zod';
import SetGoalActivityLevelStep from '@/components/_set-goal/set-goal-activity-level-step';
import SetGoalAgeStep from '@/components/_set-goal/set-goal-age-step';
import SetGoalAiLoadingStep from '@/components/_set-goal/set-goal-ai-loading-step';
import SetGoalCalculateStep from '@/components/_set-goal/set-goal-calculate-step';
import SetGoalComplete from '@/components/_set-goal/set-goal-complete';
import SetGoalGenderStep from '@/components/_set-goal/set-goal-gender-step';
import SetGoalHeightStep from '@/components/_set-goal/set-goal-height-step';
import SetGoalPurposeStep from '@/components/_set-goal/set-goal-purpose-step';
import SetGoalWeightStep from '@/components/_set-goal/set-goal-weight-step';
import useFunnel from '@/lib/hooks/use-funnel';
import {
  CompleteType,
  FunnelStep,
  SetGoalStep1Type,
  SetGoalStep2Type,
  SetGoalStep3Type,
  SetGoalStep4Type,
  SetGoalStep5Type,
  SetGoalStep6Type
} from '@/types/set-goal.type';
import { ActivityLevelType, GenderType, PurposeType } from '@/types/user-personal-info.type';
import { SET_GOAL_FUNNEL_SCHEMA } from '@/constants/funnel-schema.constant';

type SetGoalFunnerProps = {
  userName: string;
};

const validateStep = {
  step1: z.object({}),
  step2: SET_GOAL_FUNNEL_SCHEMA.pick({ purpose: true }),
  step3: SET_GOAL_FUNNEL_SCHEMA.pick({ purpose: true, gender: true }),
  step4: SET_GOAL_FUNNEL_SCHEMA.pick({ purpose: true, gender: true, age: true }),
  step5: SET_GOAL_FUNNEL_SCHEMA.pick({ purpose: true, gender: true, age: true, height: true }),
  step6: SET_GOAL_FUNNEL_SCHEMA.pick({ purpose: true, gender: true, age: true, height: true, weight: true }),
  step7: SET_GOAL_FUNNEL_SCHEMA,
  step8: z.object({}),
  complete: SET_GOAL_FUNNEL_SCHEMA
};

const SetGoalFunnel = ({ userName }: SetGoalFunnerProps) => {
  const Funnel = useFunnel<
    {
      step1: SetGoalStep1Type;
      step2: SetGoalStep2Type;
      step3: SetGoalStep3Type;
      step4: SetGoalStep4Type;
      step5: SetGoalStep5Type;
      step6: SetGoalStep6Type;
      step7: CompleteType;
      step8: CompleteType;
      complete: CompleteType;
    },
    FunnelStep
  >(
    'step1',
    {
      step1: () => true,
      step2: (data) => validateStep.step2.safeParse(data).success,
      step3: (data) => validateStep.step3.safeParse(data).success,
      step4: (data) => validateStep.step4.safeParse(data).success,
      step5: (data) => validateStep.step5.safeParse(data).success,
      step6: (data) => validateStep.step6.safeParse(data).success,
      step7: (data) => validateStep.step7.safeParse(data).success,
      step8: () => true,
      complete: (data) => validateStep.complete.safeParse(data).success
    },
    'session-key'
  );

  return (
    <Suspense>
      <Funnel
        step1={({ setStep }) => (
          <SetGoalPurposeStep userName={userName} nextStep={(purpose: PurposeType) => setStep('step2', { purpose })} />
        )}
        step2={({ setStep }) => (
          <SetGoalGenderStep userName={userName} nextStep={(gender: GenderType) => setStep('step3', { gender })} />
        )}
        step3={({ setStep }) => (
          <SetGoalAgeStep userName={userName} nextStep={(age: number) => setStep('step4', { age })} />
        )}
        step4={({ setStep }) => (
          <SetGoalHeightStep userName={userName} nextStep={(height: number) => setStep('step5', { height })} />
        )}
        step5={({ setStep }) => (
          <SetGoalWeightStep userName={userName} nextStep={(weight: number) => setStep('step6', { weight })} />
        )}
        step6={({ setStep }) => (
          <SetGoalActivityLevelStep
            userName={userName}
            nextStep={(data: ActivityLevelType) => setStep('step7', { activityLevel: data })}
          />
        )}
        step7={({ setStep }) => <SetGoalAiLoadingStep nextStep={() => setStep('step8')} />}
        step8={({ setStep, data }) => <SetGoalCalculateStep userName={userName} data={data} nextStep={setStep} />}
        complete={() => <SetGoalComplete userName={userName} />}
      />
    </Suspense>
  );
};

export default SetGoalFunnel;
