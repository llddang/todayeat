import { ActivityLevelType, GenderType, PurposeType } from '@/types/user-personal-info.type';

export type StepPurposeType = {
  purpose?: PurposeType;
  gender?: GenderType;
  age?: number;
  height?: number;
  weight?: number;
  activityLevel?: ActivityLevelType;
};
export type StepGenderType = {
  purpose: PurposeType;
  gender?: GenderType;
  age?: number;
  height?: number;
  weight?: number;
  activityLevel?: ActivityLevelType;
};
export type StepAgeType = {
  purpose: PurposeType;
  gender: GenderType;
  age?: number;
  height?: number;
  weight?: number;
  activityLevel?: ActivityLevelType;
};
export type StepHeightType = {
  purpose: PurposeType;
  gender: GenderType;
  age: number;
  height?: number;
  weight?: number;
  activityLevel?: ActivityLevelType;
};
export type StepWeightType = {
  purpose: PurposeType;
  gender: GenderType;
  age: number;
  height: number;
  weight?: number;
  activityLevel?: ActivityLevelType;
};
export type StepActivityLevelType = {
  purpose: PurposeType;
  gender: GenderType;
  age: number;
  height: number;
  weight: number;
  activityLevel?: ActivityLevelType;
};
export type StepCompleteType = {
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
