import { ActivityLevel, NutritionPurpose } from '@/types/nutrition.type';

/**
 * 활동 수준별 활동 계수를 정의한 상수 객체입니다.
 *
 * @description
 * - 활동 수준(activity level)에 따라 일일 칼로리 소비량 계산에 사용됩니다.
 * - 예: VERY_LOW → 거의 움직이지 않음, HIGH → 주 6~7일 고강도 운동 등
 */
export const ACTIVITY_LEVEL: ActivityLevel = {
  VERY_LOW: 1.2,
  LOW: 1.375,
  MODERATE: 1.55,
  HIGH: 1.725,
  VERY_HIGH: 1.9
} as const;

/**
 * 영양 목적에 따라 열량 계수 및 탄단지 비율을 정의한 상수 객체입니다.
 *
 * @description
 * - FACTOR: 목표에 따른 열량 조절 계수입니다. (예: 감량은 0.8배, 증량은 1.1배)
 * - RATIO: [탄수화물, 단백질, 지방] 비율이며 총합은 1입니다.
 */
export const NUTRITION_PURPOSE: NutritionPurpose = {
  WEIGHT_LOSS: {
    FACTOR: 0.8,
    RATIO: [0.3, 0.4, 0.3]
  },
  WEIGHT_MAINTENANCE: {
    FACTOR: 1,
    RATIO: [0.45, 0.3, 0.25]
  },
  MUSCLE_GAIN: {
    FACTOR: 1.1,
    RATIO: [0.4, 0.4, 0.2]
  }
} as const;
