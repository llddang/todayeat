import { Suspense } from 'react';
import { z } from 'zod';
import useFunnel from '@/lib/hooks/use-funnel';
import { ActivityLevelType, GenderType, PurposeType } from '@/types/user-personal-info.type';
import { SET_GOAL_FUNNEL_SCHEMA } from '@/constants/funnel-schema.constant';
import PurposeStep from './step-purpose';
import GenderStep from './step-gender';
import AgeStep from './step-age';
import HeightStep from './step-height';
import WeightStep from './step-weight';
import ActivityLevelStep from './step-activity-level';
import CalculateStep from './step-calculate';
import Complete from './step-complete';
import StepAiLoading from './step-ai-loading';
import {
  FunnelStep,
  StepActivityLevelType,
  StepAgeType,
  StepCompleteType,
  StepGenderType,
  StepHeightType,
  StepPurposeType,
  StepWeightType
} from '../types/funnel.type';

type SetGoalFunnelProps = {
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

const SetGoalFunnel = ({ userName }: SetGoalFunnelProps) => {
  const Funnel = useFunnel<
    {
      step1: StepPurposeType;
      step2: StepGenderType;
      step3: StepAgeType;
      step4: StepHeightType;
      step5: StepWeightType;
      step6: StepActivityLevelType;
      step7: StepCompleteType;
      step8: StepCompleteType;
      complete: StepCompleteType;
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
          <PurposeStep userName={userName} nextStep={(purpose: PurposeType) => setStep('step2', { purpose })} />
        )}
        step2={({ setStep }) => (
          <GenderStep userName={userName} nextStep={(gender: GenderType) => setStep('step3', { gender })} />
        )}
        step3={({ setStep }) => <AgeStep userName={userName} nextStep={(age: number) => setStep('step4', { age })} />}
        step4={({ setStep }) => (
          <HeightStep userName={userName} nextStep={(height: number) => setStep('step5', { height })} />
        )}
        step5={({ setStep }) => (
          <WeightStep userName={userName} nextStep={(weight: number) => setStep('step6', { weight })} />
        )}
        step6={({ setStep }) => (
          <ActivityLevelStep
            userName={userName}
            nextStep={(data: ActivityLevelType) => setStep('step7', { activityLevel: data })}
          />
        )}
        step7={({ setStep }) => <StepAiLoading nextStep={() => setStep('step8')} />}
        step8={({ setStep, data }) => <CalculateStep userName={userName} data={data} nextStep={setStep} />}
        complete={() => <Complete userName={userName} />}
      />
    </Suspense>
  );
};

export default SetGoalFunnel;
