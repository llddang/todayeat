import { MacronutrientType, MacronutrientValues } from '@/types/nutrition.type';

export const MACRONUTRIENT_OPTIONS: Record<MacronutrientType, MacronutrientValues> = {
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

export const MEASUREMENT_UNIT = {
  KCAL: {
    label: '칼로리',
    unit: 'kcal'
  },
  GRAM: {
    label: '그램',
    unit: 'g'
  }
} as const;
