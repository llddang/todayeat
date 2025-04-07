import { MealDetailDTO } from './DTO/meal.dto';

export type NutritionGoal = {
  dailyCaloriesGoal: number;
  dailyCarbohydrateGoal: number;
  dailyProteinGoal: number;
  dailyFatGoal: number;
};

export type AverageNutrition = {
  averageCalories: number;
  averageCarbohydrate: number;
  averageFat: number;
  averageProtein: number;
};

export type NutritionRatio = {
  caloriesRatio: number;
  carbohydrateRatio: number;
  proteinRatio: number;
  fatRatio: number;
};
export type TotalMealNutrition = {
  totalCalories: number;
  totalCarbohydrate: number;
  totalFat: number;
  totalProtein: number;
};

export type MealNutrition = Pick<MealDetailDTO, 'calories' | 'carbohydrate' | 'protein' | 'fat'>;

/**
 * 활동 수준별 활동 계수를 정의한 상수 객체입니다.
 *
 * @description
 * - 활동 수준(activity level)에 따라 일일 칼로리 소비량 계산에 사용됩니다.
 * - 예: VERY_LOW → 거의 움직이지 않음, HIGH → 주 6~7일 고강도 운동 등
 */

export const ActivityLevel = {
  VERY_LOW: 'VERY_LOW',
  LOW: 'LOW',
  MODERATE: 'MODERATE',
  HIGH: 'HIGH',
  VERY_HIGH: 'VERY_HIGH'
} as const;

export type ActivityLevelKey = keyof typeof ActivityLevel;

export const ACTIVITY_LEVEL_OPTIONS: Record<ActivityLevelKey, { description: string; factor: number }> = {
  VERY_LOW: { description: '거의 움직이지 않아요', factor: 1.2 },
  LOW: { description: '아주 가볍게 활동해요', factor: 1.375 },
  MODERATE: { description: '일상적으로 움직여요', factor: 1.55 },
  HIGH: { description: '자주 활동하거나 운동해요', factor: 1.725 },
  VERY_HIGH: { description: '하루에 여러 번 강도 높은 운동을 해요', factor: 1.9 }
} as const;

export const NutritionPurpose = {
  WEIGHT_LOSS: 'WEIGHT_LOSS',
  WEIGHT_MAINTENANCE: 'WEIGHT_MAINTENANCE',
  MUSCLE_GAIN: 'MUSCLE_GAIN'
} as const;

export const NUTRITION_PURPOSE_OPTIONS = {
  WEIGHT_LOSS: {
    name: '체지방 줄이기',
    factor: 0.8,
    ratio: {
      carbRatio: 0.3,
      proteinRatio: 0.4,
      fatRatio: 0.3
    }
  },
  WEIGHT_MAINTENANCE: {
    name: '현재 상태 유지하기',
    factor: 1,
    ratio: {
      carbRatio: 0.45,
      proteinRatio: 0.3,
      fatRatio: 0.25
    }
  },
  MUSCLE_GAIN: {
    name: '근육 키우기',
    factor: 1.1,
    ratio: {
      carbRatio: 0.4,
      proteinRatio: 0.4,
      fatRatio: 0.2
    }
  }
} as const;

export type NutritionPurposeKey = keyof typeof NUTRITION_PURPOSE_OPTIONS;
export type NutritionPurposeRatio = Record<'carbRatio' | 'proteinRatio' | 'fatRatio', number>;
export type NutritionPurposeValue = {
  name: string;
  factor: number;
  ratio: NutritionPurposeRatio;
};
export type NutritionPurpose = Record<NutritionPurposeKey, NutritionPurposeValue>;
