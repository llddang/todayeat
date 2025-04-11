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

export const MacronutrientOptions = {
  CALORIES: {
    label: '칼로리',
    unit: 'kcal',
    color: ''
  },
  CARBOHYDRATE: {
    label: '탄수화물',
    unit: 'g',
    color: 'bg-purple-100'
  },
  PROTEIN: {
    label: '단백질',
    unit: 'g',
    color: 'bg-teal-100'
  },
  FAT: {
    label: '지방',
    unit: 'g',
    color: 'bg-blue-75'
  }
} as const;

export type MacronutrientType = keyof typeof MacronutrientOptions;
export type MacronutrientValues = (typeof MacronutrientOptions)[MacronutrientType];
export type MacronutrientLabelValue = (typeof MacronutrientOptions)[MacronutrientType]['label'];

export const MeasurementUnitEnum = {
  KCAL: 'KCAL',
  GRAM: 'GRAM'
} as const;

export const MeasurementUnit = {
  KCAL: {
    label: '칼로리',
    unit: 'kcal'
  },
  GRAM: {
    label: '그램',
    unit: 'g'
  }
} as const;

export type MeasurementUnitType = keyof typeof MeasurementUnit;
export type MeasurementUnitLabelValue = (typeof MeasurementUnit)[MeasurementUnitType]['label'];
