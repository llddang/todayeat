import { ActivityLevelType, GenderType, PurposeType } from '@/types/user-personal-info.type';

export type SetGoalStep1Type = {
  purpose?: PurposeType;
  gender?: GenderType;
  age?: number;
  height?: number;
  weight?: number;
  activityLevel?: ActivityLevelType;
};
export type SetGoalStep2Type = {
  purpose: PurposeType;
  gender?: GenderType;
  age?: number;
  height?: number;
  weight?: number;
  activityLevel?: ActivityLevelType;
};
export type SetGoalStep3Type = {
  purpose: PurposeType;
  gender: GenderType;
  age?: number;
  height?: number;
  weight?: number;
  activityLevel?: ActivityLevelType;
};
export type SetGoalStep4Type = {
  purpose: PurposeType;
  gender: GenderType;
  age: number;
  height?: number;
  weight?: number;
  activityLevel?: ActivityLevelType;
};
export type SetGoalStep5Type = {
  purpose: PurposeType;
  gender: GenderType;
  age: number;
  height: number;
  weight?: number;
  activityLevel?: ActivityLevelType;
};
export type SetGoalStep6Type = {
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
