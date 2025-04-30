import { ACTIVITY_LEVEL_OPTIONS, NUTRITION_PURPOSE_OPTIONS } from '@/constants/user-personal-info.constant';
import { ActivityLevel, Gender, Purpose } from '@/types/user-personal-info.type';
import { FunnelStep, StepUIConfig } from '../_types/funnel.type';

export const LAST_STEP_FOR_USER_INPUT = 7;

export const GOAL_OPTIONS = {
  PURPOSE: [
    { title: NUTRITION_PURPOSE_OPTIONS.WEIGHT_LOSS.name, value: Purpose.WEIGHT_LOSS },
    { title: NUTRITION_PURPOSE_OPTIONS.MUSCLE_GAIN.name, value: Purpose.MUSCLE_GAIN },
    { title: NUTRITION_PURPOSE_OPTIONS.WEIGHT_MAINTENANCE.name, value: Purpose.WEIGHT_MAINTENANCE }
  ],
  GENDER: [
    { title: '여성', value: Gender.WOMAN },
    { title: '남성', value: Gender.MAN }
  ],
  ACTIVITY_LEVEL_OPTIONS: [
    {
      title: ACTIVITY_LEVEL_OPTIONS.VERY_LOW.description,
      description: '하루 대부분 앉아서 지내요. 운동은 거의 하지 않아요.',
      value: ActivityLevel.VERY_LOW
    },
    {
      title: ACTIVITY_LEVEL_OPTIONS.LOW.description,
      description: '집안일이나 산책 정도 하고, 주 1회 운동해요.',
      value: ActivityLevel.LOW
    },
    {
      title: ACTIVITY_LEVEL_OPTIONS.MODERATE.description,
      description: '출퇴근, 걸음 많은 일상 + 주 3~4회 운동하는 편이에요.',
      value: ActivityLevel.MODERATE
    },
    {
      title: ACTIVITY_LEVEL_OPTIONS.HIGH.description,
      description: '주 5~6회 운동하거나, 몸을 많이 쓰는 일을 해요.',
      value: ActivityLevel.HIGH
    },
    {
      title: ACTIVITY_LEVEL_OPTIONS.VERY_HIGH.description,
      description: '아침저녁으로 운동하거나, 체력 소모가 큰 일을 매일 해요.',
      value: ActivityLevel.VERY_HIGH
    }
  ]
};

export const STEP_UI_CONFIG: Record<FunnelStep, StepUIConfig> = {
  step1: { hasGlassBackground: true, hasProgressBar: true, stepOrder: 1 },
  step2: { hasGlassBackground: true, hasProgressBar: true, stepOrder: 2 },
  step3: { hasGlassBackground: true, hasProgressBar: true, stepOrder: 3 },
  step4: { hasGlassBackground: true, hasProgressBar: true, stepOrder: 4 },
  step5: { hasGlassBackground: true, hasProgressBar: true, stepOrder: 5 },
  step6: { hasGlassBackground: true, hasProgressBar: true, stepOrder: 6 },
  step7: { hasGlassBackground: false, hasProgressBar: false, stepOrder: 7 },
  step8: { hasGlassBackground: true, hasProgressBar: false, stepOrder: 8 },
  complete: { hasGlassBackground: false, hasProgressBar: false, stepOrder: 9 }
};
