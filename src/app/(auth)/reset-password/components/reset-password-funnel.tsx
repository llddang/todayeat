import useFunnel from '@/hooks/use-funnel';
import { ResetPasswordFunnelStep, ResetPasswordFunnelType } from '../types/funnel-type';
import StepEmail from './step-email';
import React from 'react';
import StepPassword from './step-password';
import StepComplete from './step-complete';

const ResetPasswordFunnel = () => {
  const { Funnel } = useFunnel<ResetPasswordFunnelType, ResetPasswordFunnelStep>(
    'step1',
    resetPasswordValidateFn,
    'reset-password-funnel-data'
  );

  return (
    <Funnel
      step1={() => <StepEmail />}
      step2={({ setStep }) => <StepPassword nextStep={() => setStep('complete')} />}
      complete={() => <StepComplete />}
    />
  );
};
export default React.memo(ResetPasswordFunnel);

const resetPasswordValidateFn = {
  step1: () => true,
  step2: () => true,
  complete: () => true
};
