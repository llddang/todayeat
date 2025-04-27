import { MacronutrientEnumType } from '@/types/nutrition.type';

export const PeriodUnitEnum = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY'
} as const;

export type PeriodUnit = keyof typeof PeriodUnitEnum;

export type BarChartDataType = {
  label: string;
  value: number;
  fill: string;
};

export type AmountBarChartType = MacronutrientEnumType | 'GOAL';
