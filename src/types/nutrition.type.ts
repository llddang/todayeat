import { MACRONUTRIENT_OPTIONS } from '@/constants/nutrition.constant';
import { MealDetailDTO } from '@/types/DTO/meal.dto';

export type NutritionGoal = {
  dailyCaloriesGoal: number;
  dailyCarbohydrateGoal: number;
  dailyProteinGoal: number;
  dailyFatGoal: number;
};

export type MealNutrition = Pick<MealDetailDTO, 'calories' | 'carbohydrate' | 'protein' | 'fat'>;
export type MealNutritionType = keyof MealNutrition;
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

export const MacronutrientEnum = {
  CALORIES: 'CALORIES',
  CARBOHYDRATE: 'CARBOHYDRATE',
  PROTEIN: 'PROTEIN',
  FAT: 'FAT'
} as const;

export type MacronutrientType = keyof typeof MacronutrientEnum;

export type MacronutrientValues = {
  label: string;
  unit: string;
  color: string;
};
export type MacronutrientLabelValue = (typeof MACRONUTRIENT_OPTIONS)[MacronutrientType]['label'];

export const MeasurementUnitEnum = {
  KCAL: 'KCAL',
  GRAM: 'GRAM'
} as const;

export type MeasurementUnitValues = {
  label: string;
  name: string;
  unit: string;
};

export type MeasurementUnitType = keyof typeof MeasurementUnitEnum;
