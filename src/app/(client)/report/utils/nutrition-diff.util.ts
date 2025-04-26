import { getPercentage } from '@/utils/nutrition-calculator.util';
import { PERIOD_UNIT_TEXT } from '../constants/unit.constant';
import { BarChartDataType, PeriodUnit } from '../types/chart.type';
import { NutrientRatio } from '../types/nutrition.type';

export const calculateDiffCalories = (barChart: BarChartDataType[]) => {
  const current = barChart.at(-1)?.value ?? 0;
  const previous = barChart.at(-2)?.value ?? 0;

  const diff = current - previous;
  const isMore = diff > 0;
  const absDiff = Math.abs(diff);
  return { isMore, absDiff };
};

export const calculateMaxDiffNutrient = (nutrients: NutrientRatio) => {
  const sorted = Object.entries(nutrients)
    .map(([key, { consumed, goal }]) => {
      const diff = consumed - goal;
      return { key, diff, consumed, goal };
    })
    .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
  return sorted[0];
};

export const makeFeedbackMessage = (unit: PeriodUnit, nutrient: string, consumed: number, goal: number) => {
  const percentage = getPercentage(consumed, goal);

  if (percentage <= 50) {
    return [
      `${PERIOD_UNIT_TEXT[unit].current}${PERIOD_UNIT_TEXT[unit].postposition} ${nutrient}을`,
      '더 먹을 수 있어요'
    ];
  } else if (percentage <= 80) {
    return [
      `${PERIOD_UNIT_TEXT[unit].current}${PERIOD_UNIT_TEXT[unit].postposition} ${nutrient} 섭취가`,
      '목표에 가까워요'
    ];
  } else if (percentage <= 110) {
    return [`${PERIOD_UNIT_TEXT[unit].current}${PERIOD_UNIT_TEXT[unit].postposition} ${nutrient}을`, '충분히 챙겼어요'];
  } else {
    return [`${PERIOD_UNIT_TEXT[unit].current}${PERIOD_UNIT_TEXT[unit].postposition} ${nutrient}이`, '살짝 많았어요'];
  }
};
