import { MealDTO } from '@/types/DTO/meal.dto';
import { UserPhysicalProfileDTO } from '@/types/DTO/user.dto';
import {
  ACTIVITY_LEVEL_OPTIONS,
  AverageNutrition,
  NUTRITION_PURPOSE_OPTIONS,
  NutritionGoal,
  NutritionPurposeValue,
  NutritionRatio,
  TotalMealNutrition
} from '@/types/nutrition.type';

/**
 * 사용자의 신체 정보와 목표를 기반으로 하루 권장 섭취 열량과 탄단지 비율을 계산하는 함수입니다.
 *
 * @function calculateNutrition
 * @param {UserPhysicalProfileDTO} - 사용자 성별, 키, 몸무게, 나이, 활동 수준, 운동 목적 정보
 * @returns {NutritionGoal} NutritionGoal 객체
 *
 * @description
 * - BMR(기초대사량) 공식을 기반으로 활동계수 및 목적계수를 곱하여 총 권장 섭취 열량을 계산합니다.
 * - 각 영양소(탄수화물, 단백질, 지방)는 해당 비율과 열량 환산값(탄:4, 단:4, 지:9)을 통해 계산됩니다.
 * - 성별에 따라 BMR 계산식이 다르게 적용됩니다.
 */

const defaultDailyNutrition = {
  dailyCaloriesGoal: 0,
  dailyCarbohydrateGoal: 0,
  dailyProteinGoal: 0,
  dailyFatGoal: 0
};

const CALORIES_PER_GRAM = {
  CARB: 4,
  PROTEIN: 4,
  FAT: 9
};

const initialTotalValue = {
  totalCalories: 0,
  totalCarbohydrate: 0,
  totalFat: 0,
  totalProtein: 0
};

export const calculateNutrition = ({
  gender,
  height,
  weight,
  age,
  activityLevel,
  purpose
}: UserPhysicalProfileDTO): NutritionGoal => {
  if (!gender || !height || !weight || !age || !purpose) return defaultDailyNutrition;

  const activityFactor = ACTIVITY_LEVEL_OPTIONS[activityLevel].factor;
  const { factor, ratio }: NutritionPurposeValue = NUTRITION_PURPOSE_OPTIONS[purpose];

  if (!activityLevel || !Object.keys(ACTIVITY_LEVEL_OPTIONS).includes(activityLevel)) return defaultDailyNutrition;
  if (!Object.keys(NUTRITION_PURPOSE_OPTIONS).includes(purpose)) return defaultDailyNutrition;

  const commonBMR = 10 * weight + 6.25 * height - 5 * age;
  const baseCalories = gender === 'MAN' ? commonBMR + 5 : commonBMR - 161;

  const dailyCaloriesGoal = Math.round(baseCalories * activityFactor * factor);

  const { carbRatio, proteinRatio, fatRatio } = ratio;
  const dailyCarbohydrateGoal = Math.round((dailyCaloriesGoal * carbRatio) / CALORIES_PER_GRAM.CARB);
  const dailyProteinGoal = Math.round((dailyCaloriesGoal * proteinRatio) / CALORIES_PER_GRAM.PROTEIN);
  const dailyFatGoal = Math.round((dailyCaloriesGoal * fatRatio) / CALORIES_PER_GRAM.FAT);

  return {
    dailyCaloriesGoal,
    dailyCarbohydrateGoal,
    dailyProteinGoal,
    dailyFatGoal
  };
};

/**
 * 주어진 식단 배열의 전체 영양 정보를 합산하여 반환합니다.
 *
 * @param {MealDTO[]} mealsData - 합산할 한끼 식단 영양 정보 배열입니다.
 * @param {TotalMealNutrition} initialValue - 합산의 시작점이 되는 초기 영양 정보 객체입니다.
 * @returns {TotalMealNutrition} - 전체 합산된 영양 정보를 포함한 객체를 반환합니다.
 */
export const calculateTotalNutrition = (
  mealsData: MealDTO[],
  initialValue: TotalMealNutrition = initialTotalValue
): TotalMealNutrition => {
  return mealsData
    .flatMap((meal) => meal.mealDetails)
    .reduce(
      (acc, { calories, carbohydrate, fat, protein }) => {
        acc.totalCalories += calories;
        acc.totalCarbohydrate += carbohydrate;
        acc.totalFat += fat;
        acc.totalProtein += protein;
        return acc;
      },
      { ...initialValue }
    );
};

/**
 * 여러 날의 식사 데이터를 기반으로 평균 섭취 열량과 영양소를 계산합니다.
 *
 * @function calculateNutritionAverage
 * @param {MealDTO[]} mealsData - 기간 내의 한 끼니별 데이터 배열
 * @param {string} startDate - 계산 시작 날짜 (YYYY-MM-DD 형식)
 * @param {string} endDate - 계산 종료 날짜 (YYYY-MM-DD 형식)
 * @returns {AverageNutrition} 평균 섭취 열량 및 각 영양소 평균값
 */

export const calculateNutritionAverage = (
  mealsData: MealDTO[],
  startDate: string,
  endDate: string
): AverageNutrition => {
  if (mealsData.length === 0 || !startDate || !endDate) {
    return {
      averageCalories: 0,
      averageCarbohydrate: 0,
      averageFat: 0,
      averageProtein: 0
    };
  }
  const initialTotalValue = {
    totalCalories: 0,
    totalCarbohydrate: 0,
    totalFat: 0,
    totalProtein: 0
  };

  const diffInms = +new Date(endDate) - +new Date(startDate);
  const diffInDays = diffInms / (1000 * 60 * 60 * 24) + 1;

  const total = calculateTotalNutrition(mealsData, initialTotalValue);

  return {
    averageCalories: Math.round(total.totalCalories / diffInDays),
    averageCarbohydrate: Math.round(total.totalCarbohydrate / diffInDays),
    averageFat: Math.round(total.totalFat / diffInDays),
    averageProtein: Math.round(total.totalProtein / diffInDays)
  };
};

/**
 * 기준값에 대한 백분율을 계산합니다.
 *
 * @function getPercentage
 * @param {number} value - 실제 값
 * @param {number | null} base - 기준값 (null 또는 0일 경우 0% 반환)
 * @returns {number} 기준 대비 백분율 (정수, 소수점 없음)
 */

const getPercentage = (value: number, base: number | null): number => {
  if (!base || base === 0) return 0;
  return Math.round((value / base) * 100);
};

/**
 * 하루 기준 섭취 목표 대비 실제 하루 총 섭취량의 백분율을 계산합니다.
 *
 * @function calculateNutritionRatioFromDailyTotal
 * @param {NutritionGoal} daily - 하루 권장 섭취량
 * @param {MealDTO[]} mealsData - 하루 섭취량
 * @returns {NutritionRatio} 각 항목별 실제 섭취량의 백분율
 */

export const calculateNutritionRatioFromDailyTotal = (daily: NutritionGoal, mealsData: MealDTO[]): NutritionRatio => {
  const total = calculateTotalNutrition(mealsData, initialTotalValue);
  return {
    caloriesRatio: getPercentage(total.totalCalories, daily.dailyCaloriesGoal),
    carbohydrateRatio: getPercentage(total.totalCarbohydrate, daily.dailyCarbohydrateGoal),
    proteinRatio: getPercentage(total.totalProtein, daily.dailyProteinGoal),
    fatRatio: getPercentage(total.totalFat, daily.dailyFatGoal)
  };
};
/**
 * 하루 기준 섭취 목표 대비 일정 기간 평균 섭취량의 백분율을 계산합니다.
 *
 * @function calculateNutritionRatioFromPeriod
 * @param {NutritionGoal} daily - 하루 권장 섭취량
 * @param {AverageNutrition} average - 일정 기간 평균 섭취량
 * @returns {NutritionRatio} 각 항목별 평균 섭취량의 백분율
 */

export const calculateNutritionRatioFromPeriod = (daily: NutritionGoal, average: AverageNutrition): NutritionRatio => {
  return {
    caloriesRatio: getPercentage(average.averageCalories, daily.dailyCaloriesGoal),
    carbohydrateRatio: getPercentage(average.averageCarbohydrate, daily.dailyCarbohydrateGoal),
    proteinRatio: getPercentage(average.averageProtein, daily.dailyProteinGoal),
    fatRatio: getPercentage(average.averageFat, daily.dailyFatGoal)
  };
};
