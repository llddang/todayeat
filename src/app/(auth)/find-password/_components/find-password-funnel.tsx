import useFunnel from '@/hooks/use-funnel';
import { FindPasswordFunnelStep, FindPasswordFunnelType } from '../_types/funnel.type';
import StepVerifyingEmail from './step-verifying-email';
import StepPassword from './step-password';
import StepComplete from './step-complete';
import { memo } from 'react';

const FindPasswordFunnel = () => {
  const { Funnel } = useFunnel<FindPasswordFunnelType, FindPasswordFunnelStep>(
    'step1',
    findPasswordValidateFn,
    'find-password-funnel-data'
  );

  return (
    <Funnel
      step1={() => <StepVerifyingEmail />}
      step2={({ setStep }) => <StepPassword nextStep={() => setStep('complete')} />}
      complete={() => <StepComplete />}
    />
  );
};
export default memo(FindPasswordFunnel);

const findPasswordValidateFn = {
  step1: () => true,
  step2: () => true,
  complete: () => true
};
