import { MealDetailDTO } from '@/types/DTO/meal.dto';

export type NutritionGoal = {
  dailyCaloriesGoal: number;
  dailyCarbohydrateGoal: number;
  dailyProteinGoal: number;
  dailyFatGoal: number;
};

export type MealNutrition = Pick<MealDetailDTO, 'calories' | 'carbohydrate' | 'protein' | 'fat'>;
export type Macronutrient = Omit<MealNutrition, 'calories'>;
export type MacronutrientType = keyof Macronutrient;
export const MacronutrientEnum = {
  CARBOHYDRATE: 'CARBOHYDRATE',
  PROTEIN: 'PROTEIN',
  FAT: 'FAT'
} as const;
export type MacronutrientEnumType = keyof typeof MacronutrientEnum;

export type PurposeValue = {
  name: string;
  factor: number;
  ratio: Macronutrient;
};

export type DailyMealCalories = {
  [key in string]: { calories: number; caloriesGoal: number };
};
