import { MealDetailDTO } from '@/types/DTO/meal.dto';

export type NutritionGoal = {
  dailyCaloriesGoal: number;
  dailyCarbohydrateGoal: number;
  dailyProteinGoal: number;
  dailyFatGoal: number;
};

export type MealNutrition = Pick<MealDetailDTO, 'calories' | 'carbohydrate' | 'protein' | 'fat'>;
export type Macronutrient = Omit<MealNutrition, 'calories'>;

export type PurposeValue = {
  name: string;
  factor: number;
  ratio: Macronutrient;
};
