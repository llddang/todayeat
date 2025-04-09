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

export type ActivityLevelType = keyof typeof ActivityLevel;

export const NutritionPurpose = {
  WEIGHT_LOSS: 'WEIGHT_LOSS',
  WEIGHT_MAINTENANCE: 'WEIGHT_MAINTENANCE',
  MUSCLE_GAIN: 'MUSCLE_GAIN'
} as const;

export type NutritionPurposeType = keyof typeof NutritionPurpose;
export type NutritionPurposeRatio = Record<'carbohydrate' | 'protein' | 'fat', number>;
export type NutritionPurposeValue = {
  name: string;
  factor: number;
  ratio: NutritionPurposeRatio;
};
