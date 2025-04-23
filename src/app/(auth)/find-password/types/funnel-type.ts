export type FindPasswordFunnelStep = 'step1' | 'step2' | 'complete';

export type FindPasswordFunnelType = {
  step1: StepEmailType;
  step2: StepPasswordType;
  complete: StepCompleteType;
};

export type StepEmailType = '';

export type StepPasswordType = '';

export type StepCompleteType = '';
