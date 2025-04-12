import { MacronutrientDiffItem } from '@/types/home.type';
import { MealNutrition, NutritionGoal } from '@/types/nutrition.type';

/**
 * 현재 영양 데이터와 목표 사이의 차이를 계산합니다.
 * 양수 값은 목표 초과, 음수 값은 목표 미달을 의미합니다.
 *
 * @param nutritionData - 사용자의 현재 영양 섭취 데이터
 * @param nutritionGoal - 사용자의 영양 목표 데이터
 * @returns 각 영양소별 차이값을 포함한 배열
 */
export const calculateNutritionDifferences = (
  nutritionData: MealNutrition,
  nutritionGoal: NutritionGoal
): MacronutrientDiffItem[] => {
  return [
    {
      name: 'PROTEIN',
      diff: nutritionData.protein - nutritionGoal.dailyProteinGoal,
      label: '단백질'
    },
    {
      name: 'CARBOHYDRATE',
      diff: nutritionData.carbohydrate - nutritionGoal.dailyCarbohydrateGoal,
      label: '탄수화물'
    },
    {
      name: 'FAT',
      diff: nutritionData.fat - nutritionGoal.dailyFatGoal,
      label: '지방'
    }
  ];
};

/**
 * 영양소 차이 배열에서 가장 큰 차이(절대값 기준)를 가진 항목을 반환합니다.
 * 이 함수는 가장 주목해야 할 영양소를 결정하는 데 사용됩니다.
 *
 * @param diffs - 영양소 차이 배열
 * @returns 가장 큰 차이를 가진 영양소 항목
 */
export const getMostSignificantDiff = (diffs: MacronutrientDiffItem[]): MacronutrientDiffItem => {
  return [...diffs].sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))[0];
};
