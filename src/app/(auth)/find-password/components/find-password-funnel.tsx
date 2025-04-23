import useFunnel from '@/hooks/use-funnel';
import { FindPasswordFunnelStep, FindPasswordFunnelType } from '../types/funnel-type';
import StepEmail from './step-email';
import React from 'react';
import StepPassword from './step-password';
import StepComplete from './step-complete';

const FindPasswordFunnel = () => {
  const { Funnel } = useFunnel<FindPasswordFunnelType, FindPasswordFunnelStep>(
    'step1',
    findPasswordValidateFn,
    'find-password-funnel-data'
  );

  return (
    <Funnel
      step1={() => <StepEmail />}
      step2={({ setStep }) => <StepPassword nextStep={() => setStep('complete')} />}
      complete={() => <StepComplete />}
    />
  );
};
export default React.memo(FindPasswordFunnel);

const findPasswordValidateFn = {
  step1: () => true,
  step2: () => true,
  complete: () => true
};
