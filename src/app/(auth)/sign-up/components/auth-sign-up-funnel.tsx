'use client';

import AuthSignUpStepComplete from '@/app/(auth)/sign-up/components/auth-sign-up-step-complete';
import AuthSignUpStepEmail from '@/app/(auth)/sign-up/components/auth-sign-up-step-email';
import AuthSignUpStepNickname from '@/app/(auth)/sign-up/components/auth-sign-up-step-nickname';
import AuthSignUpStepPassword from '@/app/(auth)/sign-up/components/auth-sign-up-step-password';
import formSchema from '@/app/schemas/form-schema.schema';
import useFunnel from '@/hooks/use-funnel';
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

const signUpFunnelSchema = z.object({
  email: formSchema.EMAIL_SCHEMA,
  password: formSchema.PASSWORD_SCHEMA,
  nickname: formSchema.NICKNAME_SCHEMA
});

const signUpValidateStep = {
  step1: z.object({}),
  step2: signUpFunnelSchema.pick({ email: true }),
  step3: signUpFunnelSchema.pick({ email: true, password: true }),
  complete: z.object({})
};

const signUpValidateFn = {
  step1: (data: SignUpStep1Type) => signUpValidateStep.step1.safeParse(data).success,
  step2: (data: SignUpStep2Type) => signUpValidateStep.step2.safeParse(data).success,
  step3: (data: SignUpStep3Type) => signUpValidateStep.step3.safeParse(data).success,
  complete: (data: SignUpCompleteType) => signUpValidateStep.complete.safeParse(data).success
};
