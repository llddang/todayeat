import { ActivityLevelType, GenderType, PurposeType } from '@/types/user-personal-info.type';

export type Step1Type = {
  purpose?: PurposeType;
  gender?: GenderType;
  age?: number;
  height?: number;
  weight?: number;
  activityLevel?: ActivityLevelType;
};
export type Step2Type = {
  purpose: PurposeType;
  gender?: GenderType;
  age?: number;
  height?: number;
  weight?: number;
  activityLevel?: ActivityLevelType;
};
export type Step3Type = {
  purpose: PurposeType;
  gender: GenderType;
  age?: number;
  height?: number;
  weight?: number;
  activityLevel?: ActivityLevelType;
};
export type Step4Type = {
  purpose: PurposeType;
  gender: GenderType;
  age: number;
  height?: number;
  weight?: number;
  activityLevel?: ActivityLevelType;
};
export type Step5Type = {
  purpose: PurposeType;
  gender: GenderType;
  age: number;
  height: number;
  weight?: number;
  activityLevel?: ActivityLevelType;
};
export type Step6Type = {
  purpose: PurposeType;
  gender: GenderType;
  age: number;
  height: number;
  weight: number;
  activityLevel?: ActivityLevelType;
};
export type CompleteType = {
  purpose: PurposeType;
  gender: GenderType;
  age: number;
  height: number;
  weight: number;
  activityLevel: ActivityLevelType;
};

export type FunnelStep = 'step1' | 'step2' | 'step3' | 'step4' | 'step5' | 'step6' | 'step7' | 'step8' | 'complete';

export type StepUIConfig = {
  hasGlassBackground: boolean;
  hasProgressBar: boolean;
  stepOrder: number;
};
