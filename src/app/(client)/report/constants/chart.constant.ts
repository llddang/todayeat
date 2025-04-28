import { AmountBarChartType } from '@/app/(client)/report/types/chart.type';
import { MacronutrientValues } from '@/types/nutrition.type';

export const AMOUNT_CHART_OPTIONS: Record<AmountBarChartType, MacronutrientValues> = {
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
  },
  GOAL: {
    label: '목표',
    color: 'bg-gray-300',
    beforeBgColor: 'before:bg-gray-300'
  }
} as const;

export const MACRONUTRIENT_MAP = {
  CARBOHYDRATE: 'carbohydrate',
  PROTEIN: 'protein',
  FAT: 'fat'
} as const;

export const MACRONUTRIENT_GOAL_MAP = {
  CARBOHYDRATE: 'dailyCarbohydrateGoal',
  PROTEIN: 'dailyProteinGoal',
  FAT: 'dailyFatGoal'
} as const;

export const INITIAL_NUTRITION_VALUE = { calories: -1, carbohydrate: 0, protein: 0, fat: 0 };
