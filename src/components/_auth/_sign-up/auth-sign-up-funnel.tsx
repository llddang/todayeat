'use client';

import AuthSignUpStepComplete from '@/components/_auth/_sign-up/auth-sign-up-step-complete';
import AuthSignUpStepEmail from '@/components/_auth/_sign-up/auth-sign-up-step-email';
import AuthSignUpStepNickname from '@/components/_auth/_sign-up/auth-sign-up-step-nickname';
import AuthSignUpStepPassword from '@/components/_auth/_sign-up/auth-sign-up-step-password';
import { SIGN_UP_FUNNEL_SCHEMA } from '@/constants/funnel-schema.constant';
import useFunnel from '@/lib/hooks/use-funnel';
import {
  SignUpCompleteType,
  SignUpFunnelStep,
  SignUpFunnelType,
  SignUpStep1Type,
  SignUpStep2Type,
  SignUpStep3Type
} from '@/types/sign-up-funnel-type';
import { z } from 'zod';

const AuthSignUpFunnel = () => {
  const Funnel = useFunnel<SignUpFunnelType, SignUpFunnelStep>('step1', signUpValidateFn, 'sign-up-funnel-data');

  return (
    <Funnel
      step1={({ data, setStep }) => (
        <AuthSignUpStepEmail data={data} nextStep={(email: string) => setStep('step2', { email })} />
      )}
      step2={({ setStep }) => (
        <AuthSignUpStepPassword nextStep={(password: string) => setStep('step3', { password })} />
      )}
      step3={({ data, setStep, clearFunnelData }) => (
        <AuthSignUpStepNickname data={data} nextStep={() => setStep('complete')} clear={clearFunnelData} />
      )}
      complete={() => <AuthSignUpStepComplete />}
    />
  );
};
export default AuthSignUpFunnel;

const signUpValidateStep = {
  step1: z.object({}),
  step2: SIGN_UP_FUNNEL_SCHEMA.pick({ email: true }),
  step3: SIGN_UP_FUNNEL_SCHEMA.pick({ email: true, password: true }),
  complete: z.object({})
};

const signUpValidateFn = {
  step1: (data: SignUpStep1Type) => signUpValidateStep.step1.safeParse(data).success,
  step2: (data: SignUpStep2Type) => signUpValidateStep.step2.safeParse(data).success,
  step3: (data: SignUpStep3Type) => signUpValidateStep.step3.safeParse(data).success,
  complete: (data: SignUpCompleteType) => signUpValidateStep.complete.safeParse(data).success
};
