import useFunnel from '@/hooks/use-funnel';
import React from 'react';
import StepPassword from './step-password';
import StepComplete from './step-complete';
import { ChangePasswordFunnelStep, ChangePasswordFunnelType } from '../types/funnel-type';

const ChangePasswordFunnel = () => {
  const { Funnel } = useFunnel<ChangePasswordFunnelType, ChangePasswordFunnelStep>(
    'step1',
    changePasswordValidateFn,
    'change-password-funnel-data'
  );

  return (
    <Funnel
      step1={({ setStep }) => <StepPassword nextStep={() => setStep('complete')} />}
      complete={() => <StepComplete />}
    />
  );
};
export default React.memo(ChangePasswordFunnel);

const changePasswordValidateFn = {
  step1: () => true,
  complete: () => true
};
