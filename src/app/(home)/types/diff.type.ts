import { MacronutrientEnumType } from '@/types/nutrition.type';

export type StatusType = 'low' | 'high';

export type MacronutrientDiffItem = {
  name: MacronutrientEnumType;
  diff: number;
  label: string;
};
