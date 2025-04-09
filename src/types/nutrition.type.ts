import { MealDetailDTO } from './DTO/meal.dto';

export type NutritionGoal = {
  dailyCaloriesGoal: number;
  dailyCarbohydrateGoal: number;
  dailyProteinGoal: number;
  dailyFatGoal: number;
};

export type MealNutrition = Pick<MealDetailDTO, 'calories' | 'carbohydrate' | 'protein' | 'fat'>;

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

export type NutritionPurposeKey = keyof typeof NutritionPurpose;
export type NutritionPurposeRatio = Record<'carbohydrate' | 'protein' | 'fat', number>;
export type NutritionPurposeValue = {
  name: string;
  factor: number;
  ratio: NutritionPurposeRatio;
};

export const NutritionPurpose = {
  WEIGHT_LOSS: 'WEIGHT_LOSS',
  WEIGHT_MAINTENANCE: 'WEIGHT_MAINTENANCE',
  MUSCLE_GAIN: 'MUSCLE_GAIN'
} as const;

export const NUTRITION_PURPOSE_OPTIONS: Record<NutritionPurposeKey, NutritionPurposeValue> = {
  WEIGHT_LOSS: {
    name: '체지방 줄이기',
    factor: 0.8,
    ratio: {
      carbohydrate: 0.3,
      protein: 0.4,
      fat: 0.3
    }
  },
  WEIGHT_MAINTENANCE: {
    name: '현재 상태 유지하기',
    factor: 1,
    ratio: {
      carbohydrate: 0.45,
      protein: 0.3,
      fat: 0.25
    }
  },
  MUSCLE_GAIN: {
    name: '근육 키우기',
    factor: 1.1,
    ratio: {
      carbohydrate: 0.4,
      protein: 0.4,
      fat: 0.2
    }
  }
} as const;
