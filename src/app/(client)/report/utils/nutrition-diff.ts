import { PERIOD_UNIT_TEXT } from '../constants/unit.constant';
import { PeriodUnit } from '../types/chart.type';
import { NutrientRatio } from '../types/nutrition.type';

export const calculateMaxDiffNutrient = (nutrients: NutrientRatio) => {
  const sorted = Object.entries(nutrients)
    .map(([key, { consumed, goal }]) => {
      const diff = consumed - goal;
      return { key, diff };
    })
    .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
  return sorted[0];
};

export const makeFeedbackMessage = (unit: PeriodUnit, nutrient: string, diff: number) => {
  const isOver = diff > 0;
  const intensity = Math.abs(diff) < 15 ? '다소 ' : '많이 ';
  const direction = isOver ? '과다했어요' : '부족했어요';

  return [
    `${PERIOD_UNIT_TEXT[unit].current}${PERIOD_UNIT_TEXT[unit].postposition} ${nutrient}이`,
    `목표보다 ${intensity} ${direction}`
  ];
};
