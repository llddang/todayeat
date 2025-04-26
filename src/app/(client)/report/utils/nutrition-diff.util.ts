import { getPercentage } from '@/utils/nutrition-calculator.util';
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

export const makeFeedbackMessage = (unit: PeriodUnit, nutrient: string, diff: number, goal: number) => {
  const isOver = diff > 0;
  const diffPercentage = Math.abs(getPercentage(diff, goal));

  if (isOver) {
    return [
      `${PERIOD_UNIT_TEXT[unit].current}${PERIOD_UNIT_TEXT[unit].postposition} ${nutrient}을`,
      '목표보다 많이 먹었어요'
    ];
  }

  if (diffPercentage > 50) {
    return [
      `${PERIOD_UNIT_TEXT[unit].current}${PERIOD_UNIT_TEXT[unit].postposition} ${nutrient} 섭취에`,
      '아직 여유가 있어요'
    ];
  } else if (diffPercentage > 20) {
    return [
      `${PERIOD_UNIT_TEXT[unit].current}${PERIOD_UNIT_TEXT[unit].postposition} ${nutrient} 섭취가`,
      '목표에 가까워요'
    ];
  } else {
    return [`${PERIOD_UNIT_TEXT[unit].current}${PERIOD_UNIT_TEXT[unit].postposition} ${nutrient}을`, '충분히 챙겼어요'];
  }
};
