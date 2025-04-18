import { MacronutrientValues, NutritionEnumType } from '@/types/nutrition.type';

export const MACRONUTRIENT_OPTIONS: Record<NutritionEnumType, MacronutrientValues> = {
  CALORIES: {
    label: '칼로리',
    unit: 'kcal',
    color: '',
    beforeBgColor: ''
  },
  CARBOHYDRATE: {
    label: '탄수화물',
    unit: 'g',
    color: 'bg-purple-100',
    beforeBgColor: 'before:bg-purple-100'
  },
  PROTEIN: {
    label: '단백질',
    unit: 'g',
    color: 'bg-teal-100',
    beforeBgColor: 'before:bg-teal-100'
  },
  FAT: {
    label: '지방',
    unit: 'g',
    color: 'bg-blue-75',
    beforeBgColor: 'before:bg-blue-75'
  }
} as const;
