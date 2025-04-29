import { MealDetailDTO } from '@/types/DTO/meal.dto';
import { UserPersonalInfoDTO } from '@/types/DTO/user.dto';

export type NutritionGoal = Pick<
  UserPersonalInfoDTO,
  'dailyCaloriesGoal' | 'dailyCarbohydrateGoal' | 'dailyProteinGoal' | 'dailyFatGoal'
>;
export type MacronutrientGoal = Omit<NutritionGoal, 'dailyCaloriesGoal'>;

export type MealNutrition = Pick<MealDetailDTO, 'calories' | 'carbohydrate' | 'protein' | 'fat'>;
export type MealNutritionType = keyof MealNutrition;
export type Macronutrient = Omit<MealNutrition, 'calories'>;

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

export const NutritionEnum = {
  CALORIES: 'CALORIES',
  CARBOHYDRATE: 'CARBOHYDRATE',
  PROTEIN: 'PROTEIN',
  FAT: 'FAT'
} as const;

export type NutritionEnumType = keyof typeof NutritionEnum;

export type MacronutrientValues = {
  label: string;
  color: string;
  beforeBgColor: string;
};

export type DailyMealCalories = {
  [key in string]: number;
};
