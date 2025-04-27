export type ChangePasswordFunnelStep = 'step1' | 'step2' | 'complete';

export type ChangePasswordFunnelType = {
  step1: StepCurrentPasswordType;
  step2: StepNewPasswordType;
  complete: StepCompleteType;
};

export type StepCurrentPasswordType = {
  currentPassword?: string;
  newPassword?: string;
};

export type StepNewPasswordType = {
  currentPassword: string;
  newPassword?: string;
};

export type StepCompleteType = '';
