'use client';

import { Suspense } from 'react';
import { z } from 'zod';
import useFunnel from '@/hooks/use-funnel';
import { ActivityLevelType, GenderType, PurposeType } from '@/types/user-personal-info.type';
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
} from '../_types/funnel.type';
import { userPhysicalProfileSchema } from '../_schemas/user-physical-profile.schema';
import useScrollToTop from '../_hooks/use-scroll-to-top';

const SetGoalFunnel = () => {
  const { Funnel } = useFunnel<validateStep, FunnelStep>('step1', validateFn, 'session-key');
  useScrollToTop();

  return (
    <Suspense>
      <Funnel
        step1={({ setStep }) => <PurposeStep nextStep={(purpose: PurposeType) => setStep('step2', { purpose })} />}
        step2={({ setStep }) => <GenderStep nextStep={(gender: GenderType) => setStep('step3', { gender })} />}
        step3={({ setStep }) => <AgeStep nextStep={(age: number) => setStep('step4', { age })} />}
        step4={({ setStep }) => <HeightStep nextStep={(height: number) => setStep('step5', { height })} />}
        step5={({ setStep }) => <WeightStep nextStep={(weight: number) => setStep('step6', { weight })} />}
        step6={({ setStep }) => (
          <ActivityLevelStep nextStep={(data: ActivityLevelType) => setStep('step7', { activityLevel: data })} />
        )}
        step7={({ setStep }) => <StepAiLoading nextStep={() => setStep('step8')} />}
        step8={({ setStep, data }) => <CalculateStep data={data} nextStep={setStep} />}
        complete={() => <Complete />}
      />
    </Suspense>
  );
};

export default SetGoalFunnel;

type validateStep = {
  step1: StepPurposeType;
  step2: StepGenderType;
  step3: StepAgeType;
  step4: StepHeightType;
  step5: StepWeightType;
  step6: StepActivityLevelType;
  step7: StepCompleteType;
  step8: StepCompleteType;
  complete: StepCompleteType;
};

const validateStep = {
  step1: z.object({}),
  step2: userPhysicalProfileSchema.pick({ purpose: true }),
  step3: userPhysicalProfileSchema.pick({ purpose: true, gender: true }),
  step4: userPhysicalProfileSchema.pick({ purpose: true, gender: true, age: true }),
  step5: userPhysicalProfileSchema.pick({ purpose: true, gender: true, age: true, height: true }),
  step6: userPhysicalProfileSchema.pick({ purpose: true, gender: true, age: true, height: true, weight: true }),
  step7: userPhysicalProfileSchema,
  step8: z.object({}),
  complete: userPhysicalProfileSchema
};

const validateFn = {
  step1: () => true,
  step2: (data: StepPurposeType) => validateStep.step2.safeParse(data).success,
  step3: (data: StepGenderType) => validateStep.step3.safeParse(data).success,
  step4: (data: StepAgeType) => validateStep.step4.safeParse(data).success,
  step5: (data: StepHeightType) => validateStep.step5.safeParse(data).success,
  step6: (data: StepWeightType) => validateStep.step6.safeParse(data).success,
  step7: (data: StepActivityLevelType) => validateStep.step7.safeParse(data).success,
  step8: () => true,
  complete: (data: StepCompleteType) => validateStep.complete.safeParse(data).success
};
