import { getPercentage } from '@/utils/nutrition-calculator.util';
import { PERIOD_UNIT_TEXT } from '../constants/unit.constant';
import { BarChartDataType, PeriodUnit } from '../types/chart.type';
import { MacronutrientComparison } from '../types/nutrition.type';
import { MealNutrition } from '@/types/nutrition.type';
import { UserPersonalInfoDTO } from '@/types/DTO/user.dto';

/**
 * 현재 주기의 섭취 칼로리와 이전 주기의 섭취 칼로리를 비교하여 차이를 계산합니다.
 *
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
 * @param {MealNutrition} average - 평균 섭취량
 * @param {UserPersonalInfoDTO | null} personalInfo - 목표 정보
 * @returns {{ key: string; diff: number; consumed: number; goal: number }} 차이가 가장 큰 영양소 정보
 */
export const calculateMaxDiffNutrient = (
  average: MealNutrition,
  personalInfo: UserPersonalInfoDTO | null
): {
  key: string;
  diff: number;
  consumed: number;
  goal: number;
} => {
  const nutrientAverage: MacronutrientComparison = {
    CARBOHYDRATE: {
      consumed: average.carbohydrate,
      goal: personalInfo ? personalInfo.dailyCarbohydrateGoal : 0
    },
    PROTEIN: {
      consumed: average.protein,
      goal: personalInfo ? personalInfo.dailyProteinGoal : 0
    },
    FAT: {
      consumed: average.fat,
      goal: personalInfo ? personalInfo.dailyFatGoal : 0
    }
  };
  const sorted = Object.entries(nutrientAverage)
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
 * @param {PeriodUnit} unit - 기간 단위 (일간, 주간, 월간 등)
 * @param {string} nutrient - 영양소 이름
 * @param {number} consumed - 실제 섭취량
 * @param {number} goal - 목표 섭취량
 * @returns {string[]} 피드백 메시지 (두 줄로 구성)
 */
export const makeFeedbackMessage = (unit: PeriodUnit, nutrient: string, consumed: number, goal: number): string[] => {
  const percentage = getPercentage(consumed, goal);
  const periodMessage = makePeriodMessage(unit, false);

  if (percentage <= 50) {
    return [`${periodMessage} ${nutrient}을`, '더 먹을 수 있어요'];
  } else if (percentage <= 80) {
    return [`${periodMessage} ${nutrient} 섭취가`, '목표에 가까워요'];
  } else if (percentage <= 110) {
    return [`${periodMessage} ${nutrient}을`, '충분히 챙겼어요'];
  } else {
    return [`${periodMessage} ${nutrient}이`, '살짝 많았어요'];
  }
};

/**
 * 기간 문자열을 조합하여 문장을 생성합니다.
 *
 * @param {PeriodUnit} unit - 기간 단위 (daily, weekly, monthly)
 * @param {boolean} [includePrevious=true] - 이전 기간 비교 문구를 포함할지 여부
 * @returns {string} 조합된 기간 문구
 */
export const makePeriodMessage = (unit: PeriodUnit, includePrevious: boolean = true): string => {
  const { current, postposition, previous } = PERIOD_UNIT_TEXT[unit];

  if (includePrevious) {
    return `${current}${postposition} ${previous}보다`;
  }
  return `${current}${postposition}`;
};
