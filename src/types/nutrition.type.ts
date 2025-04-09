import { MealDetailDTO } from '@/types/DTO/meal.dto';

export type NutritionGoal = {
  dailyCaloriesGoal: number;
  dailyCarbohydrateGoal: number;
  dailyProteinGoal: number;
  dailyFatGoal: number;
};

export type MealNutrition = Pick<MealDetailDTO, 'calories' | 'carbohydrate' | 'protein' | 'fat'>;

export type NutritionPurposeRatio = Record<'carbohydrate' | 'protein' | 'fat', number>;
export type NutritionPurposeValue = {
  name: string;
  factor: number;
  ratio: NutritionPurposeRatio;
};
