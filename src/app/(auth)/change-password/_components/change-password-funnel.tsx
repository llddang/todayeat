import useFunnel from '@/hooks/use-funnel';
import StepComplete from './step-complete';
import StepNewPassword from './step-new-password';
import StepCurrentPassword from './step-current-password';
import { ChangePasswordFunnelStep, ChangePasswordFunnelType, StepNewPasswordType } from '../_types/funnel.type';
import { z } from 'zod';
import formSchema from '@/schemas/form-schema.schema';
import { memo } from 'react';

const ChangePasswordFunnel = () => {
  const { Funnel } = useFunnel<ChangePasswordFunnelType, ChangePasswordFunnelStep>(
    'step1',
    changePasswordValidateFn,
    'change-password-funnel-data'
  );

  return (
    <Funnel
      step1={({ setStep }) => (
        <StepCurrentPassword nextStep={(currentPassword: string) => setStep('step2', { currentPassword })} />
      )}
      step2={({ data, setStep, clearFunnelData }) => (
        <StepNewPassword
          data={data}
          nextStep={() => {
            clearFunnelData();
            setStep('complete');
          }}
        />
      )}
      complete={() => <StepComplete />}
    />
  );
};
export default memo(ChangePasswordFunnel);

const changePasswordValidateFn = {
  step1: () => true,
  step2: (data: StepNewPasswordType) =>
    z.object({ currentPassword: formSchema.PASSWORD_SCHEMA }).safeParse(data).success,
  complete: () => true
};
