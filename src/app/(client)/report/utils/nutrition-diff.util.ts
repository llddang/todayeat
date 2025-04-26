import { getPercentage } from '@/utils/nutrition-calculator.util';
import { PERIOD_UNIT_TEXT } from '../constants/unit.constant';
import { BarChartDataType, PeriodUnit } from '../types/chart.type';
import { NutrientRatio } from '../types/nutrition.type';

export const calculateDiffCalories = (barChart: BarChartDataType[]) => {
  const current = barChart[barChart.length - 1]?.value ?? 0;
  const previous = barChart[barChart.length - 2]?.value ?? 0;

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
  const isOver = consumed > goal;
  const diffPercentage = Math.abs(getPercentage(consumed, goal));

  if (isOver) {
    return [
      `${PERIOD_UNIT_TEXT[unit].current}${PERIOD_UNIT_TEXT[unit].postposition} ${nutrient}을`,
      '목표보다 많이 먹었어요'
    ];
  }

  if (diffPercentage <= 50) {
    return [
      `${PERIOD_UNIT_TEXT[unit].current}${PERIOD_UNIT_TEXT[unit].postposition} ${nutrient} 섭취에`,
      '아직 여유가 있어요'
    ];
  } else if (diffPercentage <= 80) {
    return [
      `${PERIOD_UNIT_TEXT[unit].current}${PERIOD_UNIT_TEXT[unit].postposition} ${nutrient} 섭취가`,
      '목표에 가까워요'
    ];
  } else {
    return [`${PERIOD_UNIT_TEXT[unit].current}${PERIOD_UNIT_TEXT[unit].postposition} ${nutrient}을`, '충분히 챙겼어요'];
  }
};
