import { getPercentage } from '@/utils/nutrition-calculator.util';
import { PERIOD_UNIT_TEXT } from '../constants/unit.constant';
import { BarChartDataType, PeriodUnit } from '../types/chart.type';
import { NutrientRatio } from '../types/nutrition.type';

/**
 * 현재 주기의 섭취 칼로리와 이전 주기의 섭취 칼로리를 비교하여 차이를 계산합니다.
 *
 * @function calculateDiffCalories
 * @param {BarChartDataType[]} barChart - 기간별 섭취 칼로리 데이터를 담은 배열
 * @returns {{ isMore: boolean; absDiff: number }} 현재가 이전보다 더 먹었는지 여부와 섭취량 차이
 */
export const calculateDiffCalories = (barChart: BarChartDataType[]): { isMore: boolean; absDiff: number } => {
  const current = barChart.at(-1)?.value ?? 0;
  const previous = barChart.at(-2)?.value ?? 0;

  const diff = current - previous;
  const isMore = diff > 0;
  const absDiff = Math.abs(diff);
  return { isMore, absDiff };
};

/**
 * 탄수화물, 단백질, 지방 중 목표 대비 섭취 차이가 가장 큰 영양소를 계산합니다.
 *
 * @function calculateMaxDiffNutrient
 * @param {NutrientRatio} nutrients - 각 영양소별 섭취량과 목표량을 담은 객체
 * @returns {{ key: string; diff: number; consumed: number; goal: number }} 차이가 가장 큰 영양소 정보
 */
export const calculateMaxDiffNutrient = (
  nutrients: NutrientRatio
): {
  key: string;
  diff: number;
  consumed: number;
  goal: number;
} => {
  const sorted = Object.entries(nutrients)
    .map(([key, { consumed, goal }]) => {
      const diff = consumed - goal;
      return { key, diff, consumed, goal };
    })
    .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
  return sorted[0];
};

/**
 * 섭취량과 목표량을 비교하여 사용자에게 맞춤 피드백 메시지를 생성합니다.
 *
 * @function makeFeedbackMessage
 * @param {PeriodUnit} unit - 기간 단위 (일간, 주간, 월간 등)
 * @param {string} nutrient - 영양소 이름
 * @param {number} consumed - 실제 섭취량
 * @param {number} goal - 목표 섭취량
 * @returns {string[]} 피드백 메시지 (두 줄로 구성)
 */
export const makeFeedbackMessage = (unit: PeriodUnit, nutrient: string, consumed: number, goal: number): string[] => {
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
