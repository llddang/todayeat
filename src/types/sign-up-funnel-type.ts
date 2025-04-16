export type SignUpFunnelStep = 'step1' | 'step2' | 'step3' | 'complete';

export type SignUpFunnelType = {
  step1: SignUpStep1Type;
  step2: SignUpStep2Type;
  step3: SignUpStep3Type;
  complete: SignUpCompleteType;
};

export type SignUpStep1Type = {
  email?: string;
  password?: string;
  nickname?: string;
};

export type SignUpStep2Type = {
  email: string;
  password?: string;
  nickname?: string;
};

export type SignUpStep3Type = {
  email: string;
  password: string;
  nickname?: string;
};

export type SignUpCompleteType = {
  email: string;
  password: string;
  nickname: string;
};
