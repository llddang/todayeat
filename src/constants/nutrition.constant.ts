import {
  MacronutrientType,
  MacronutrientValues,
  MeasurementUnitType,
  MeasurementUnitValues
} from '@/types/nutrition.type';

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

export const MEASUREMENT_UNIT: Record<MeasurementUnitType, MeasurementUnitValues> = {
  KCAL: {
    label: '칼로리',
    name: 'calories',
    unit: 'kcal'
  },
  GRAM: {
    label: '그램',
    name: 'gram',
    unit: 'g'
  }
} as const;
