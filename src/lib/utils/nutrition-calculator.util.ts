import { ACTIVITY_LEVEL, NUTRITION_PURPOSE } from '@/constants/nutrition.constant';
import { DailyNutrition } from '@/types/DTO/meal.dto';
import { UserPhysicalProfileDTO } from '@/types/DTO/user.dto';
import { AverageNutrition, NutritionRatio, NutritionGoal } from '@/types/nutrition.type';

/**
 * 사용자의 신체 정보와 목표를 기반으로 하루 권장 섭취 열량과 탄단지 비율을 계산하는 함수입니다.
 *
 * @function calculateNutrition
 * @param {UserPhysicalProfileDTO} - 사용자 성별, 키, 몸무게, 나이, 활동 수준, 운동 목적 정보
 * @returns {NutritionGoal | undefined} NutritionGoal 객체 또는 유효하지 않은 입력 시 undefined 반환
 *
 * @description
 * - BMR(기초대사량) 공식을 기반으로 활동계수 및 목적계수를 곱하여 총 권장 섭취 열량을 계산합니다.
 * - 각 영양소(탄수화물, 단백질, 지방)는 해당 비율과 열량 환산값(탄:4, 단:4, 지:9)을 통해 계산됩니다.
 * - 성별에 따라 BMR 계산식이 다르게 적용됩니다.
 */

const defaultDailyNutrition = {
  dailyCaloriesGoal: null,
  dailyCarbohydrateGoal: null,
  dailyProteinGoal: null,
  dailyFatGoal: null
};

const CALORIES_PER_GRAM_CARB = 4;
const CALORIES_PER_GRAM_PROTEIN = 4;
const CALORIES_PER_GRAM_FAT = 9;

export const calculateNutrition = ({
  gender,
  height,
  weight,
  age,
  activityLevel,
  purpose
}: UserPhysicalProfileDTO): NutritionGoal => {
  if (!gender || !height || !weight || !age || !purpose) return defaultDailyNutrition;

  const activityFactor = ACTIVITY_LEVEL[activityLevel];
  const { FACTOR, RATIO } = NUTRITION_PURPOSE[purpose];

  if (!activityLevel || !Object.keys(ACTIVITY_LEVEL).includes(activityLevel)) return defaultDailyNutrition;
  if (!Object.keys(NUTRITION_PURPOSE).includes(purpose)) return defaultDailyNutrition;

  const baseCalories =
    gender === 'MAN' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;

  const dailyCaloriesGoal = Math.round(baseCalories * activityFactor * FACTOR);

  const [carbRatio, proteinRatio, fatRatio] = RATIO;
  const dailyCarbohydrateGoal = Math.round((dailyCaloriesGoal * carbRatio) / CALORIES_PER_GRAM_CARB);
  const dailyProteinGoal = Math.round((dailyCaloriesGoal * proteinRatio) / CALORIES_PER_GRAM_PROTEIN);
  const dailyFatGoal = Math.round((dailyCaloriesGoal * fatRatio) / CALORIES_PER_GRAM_FAT);

  return {
    dailyCaloriesGoal,
    dailyCarbohydrateGoal,
    dailyProteinGoal,
    dailyFatGoal
  };
};

/**
 * 여러 날의 식사 데이터를 기반으로 평균 섭취 열량과 영양소 비율을 계산합니다.
 *
 * @function calculateNutritionAverage
 * @param {DailyNutrition[]} meals - 하루 식단별 영양소 총합 배열
 * @returns {AverageNutrition} 평균 섭취 열량 및 각 영양소 평균값
 */

export const calculateNutritionAverage = (meals: DailyNutrition[]): AverageNutrition => {
  if (meals.length === 0) {
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

  const total = meals.reduce((acc, nutrition) => {
    acc.totalCalories += nutrition.totalCalories;
    acc.totalCarbohydrate += nutrition.totalCarbohydrate;
    acc.totalFat += nutrition.totalFat;
    acc.totalProtein += nutrition.totalProtein;
    return acc;
  }, initialTotalValue);

  const count = meals.length;

  return {
    averageCalories: Math.round(total.totalCalories / count),
    averageCarbohydrate: Math.round(total.totalCarbohydrate / count),
    averageFat: Math.round(total.totalFat / count),
    averageProtein: Math.round(total.totalProtein / count)
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
 * @param {DailyNutrition} total - 실제 섭취량
 * @returns {NutritionRatio} 각 항목별 실제 섭취량의 백분율
 */

export const calculateNutritionRatioFromDailyTotal = (daily: NutritionGoal, total: DailyNutrition): NutritionRatio => {
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
