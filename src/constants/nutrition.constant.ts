import { MacronutrientEnumType, MacronutrientValues } from '@/types/nutrition.type';

export const MACRONUTRIENT_OPTIONS: Record<MacronutrientEnumType, MacronutrientValues> = {
  CARBOHYDRATE: {
    label: '탄수화물',
    color: 'bg-purple-100',
    beforeBgColor: 'before:bg-purple-100'
  },
  PROTEIN: {
    label: '단백질',
    color: 'bg-teal-100',
    beforeBgColor: 'before:bg-teal-100'
  },
  FAT: {
    label: '지방',
    color: 'bg-blue-75',
    beforeBgColor: 'before:bg-blue-75'
  }
} as const;
