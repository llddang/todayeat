export type SignUpFunnelStep = 'step1' | 'step2' | 'step3' | 'complete';

export type SignUpFunnelType = {
  step1: StepEmailType;
  step2: StepPasswordType;
  step3: StepNicknameType;
  complete: StepCompleteType;
};

export type StepEmailType = {
  email?: string;
  password?: string;
  nickname?: string;
};

export type StepPasswordType = {
  email: string;
  password?: string;
  nickname?: string;
};

export type StepNicknameType = {
  email: string;
  password: string;
  nickname?: string;
};

export type StepCompleteType = {
  email?: string;
  password?: string;
  nickname?: string;
};
