import { MealDTO } from '@/types/DTO/meal.dto';
import { UserPhysicalProfileDTO } from '@/types/DTO/user.dto';
import { Gender, GenderKey } from '@/types/gender.type';
import {
  ACTIVITY_LEVEL_OPTIONS,
  MealNutrition,
  NUTRITION_PURPOSE_OPTIONS,
  NutritionGoal,
  NutritionPurposeRatio,
  NutritionPurposeValue
} from '@/types/nutrition.type';

const CALORIES_PER_GRAM = {
  CARBOHYDRATE: 4,
  PROTEIN: 4,
  FAT: 9
};

const initialNutritionValue: MealNutrition = {
  calories: 0,
  carbohydrate: 0,
  fat: 0,
  protein: 0
};

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

const calculateBMR = (weight: number, height: number, age: number, gender: GenderKey): number => {
  const commonBMR = 10 * weight + 6.25 * height - 5 * age;
  return gender === Gender.MAN.value ? commonBMR + 5 : commonBMR - 161;
};

const calculateDailyNutrition = (dailyCalories: number, ratio: NutritionPurposeRatio) => {
  return {
    dailyCarbohydrateGoal: Math.round((dailyCalories * ratio.carbohydrate) / CALORIES_PER_GRAM.CARBOHYDRATE),
    dailyProteinGoal: Math.round((dailyCalories * ratio.protein) / CALORIES_PER_GRAM.PROTEIN),
    dailyFatGoal: Math.round((dailyCalories * ratio.fat) / CALORIES_PER_GRAM.FAT)
  };
};

const calculateDailyCalories = (bmr: number, activityFactor: number, purposeFactor: number): number => {
  return Math.round(bmr * activityFactor * purposeFactor);
};

export const calculateDailyNutritionGoal = ({
  gender,
  height,
  weight,
  age,
  activityLevel,
  purpose
}: UserPhysicalProfileDTO): NutritionGoal => {
  const activityFactor = ACTIVITY_LEVEL_OPTIONS[activityLevel].factor;
  const { factor, ratio }: NutritionPurposeValue = NUTRITION_PURPOSE_OPTIONS[purpose];
  const bmr = calculateBMR(weight, height, age, gender);
  const dailyCaloriesGoal = calculateDailyCalories(bmr, activityFactor, factor);
  const dailyNutritionGoal = calculateDailyNutrition(dailyCaloriesGoal, ratio);

  return {
    dailyCaloriesGoal,
    ...dailyNutritionGoal
  };
};

/**
 * 주어진 식단 배열의 전체 영양 정보를 합산하여 반환합니다.
 *
 * @param {MealDTO[]} meals - 합산할 한끼 식단 영양 정보 배열입니다.
 * @returns {MealNutrition} - 전체 합산된 영양 정보를 포함한 객체를 반환합니다.
 */
export const calculateTotalNutrition = (meals: MealDTO[]): MealNutrition => {
  return meals
    .flatMap((meal) => meal.mealDetails)
    .reduce(
      (acc, meal) => {
        acc.calories += meal.calories;
        acc.carbohydrate += meal.carbohydrate;
        acc.fat += meal.fat;
        acc.protein += meal.protein;
        return acc;
      },
      { ...initialNutritionValue }
    );
};

/**
 * 식사 데이터 배열에서 고유한 날짜 수를 계산합니다.
 *
 * @function countUniqueDates
 * @param {MealDTO[]} meals - 식사 데이터 배열
 * @returns {number} 고유한 날짜 수 (최소 1)
 */
const countUniqueDates = (meals: MealDTO[]): number => {
  const uniqueDates = new Set<string>();

  meals.forEach((meal) => {
    if (meal.ateAt && meal.ateAt.includes('T')) {
      const date = meal.ateAt.split('T')[0];
      uniqueDates.add(date);
    }
  });

  return uniqueDates.size || 1;
};

/**
 * 여러 날의 식사 데이터를 기반으로 평균 섭취 열량과 영양소를 계산합니다.
 *
 * @function calculateNutritionAverage
 * @param {MealDTO[]} meals - 기간 내의 한 끼니별 데이터 배열
 * @returns {MealNutrition} 평균 섭취 열량 및 각 영양소 평균값
 */
export const calculateNutritionAverage = (meals: MealDTO[]): MealNutrition => {
  if (meals.length === 0) {
    return initialNutritionValue;
  }

  // 날짜 수가 0인 경우 1로 설정하여 division by zero 방지
  const dayCount = countUniqueDates(meals);
  const total = calculateTotalNutrition(meals);

  return {
    calories: Math.round(total.calories / dayCount),
    carbohydrate: Math.round(total.carbohydrate / dayCount),
    fat: Math.round(total.fat / dayCount),
    protein: Math.round(total.protein / dayCount)
  };
};

/**
 * 기준값에 대한 백분율을 계산합니다.
 *
 * @function getPercentage
 * @param {number} value - 실제 값
 * @param {number} base - 기준값 (0일 경우 0% 반환)
 * @returns {number} 기준 대비 백분율 (정수, 소수점 없음)
 */

const getPercentage = (value: number, base: number): number => {
  if (!base) return 0;
  return Math.round((value / base) * 100);
};

/**
 * 영양소 목표 대비 실제 섭취량의 백분율을 계산합니다.
 * 항상 중복되지 않는 날짜 수를 기준으로 평균을 계산합니다.
 *
 * @function calculateNutritionRatio
 * @param {NutritionGoal} goal - 하루 권장 섭취량
 * @param {MealDTO[]} meals - 식사 데이터
 * @returns {MealNutrition} 각 항목별 실제 섭취량의 백분율
 */
export const calculateNutritionRatio = (meals: MealDTO[], goal: NutritionGoal): MealNutrition => {
  const nutritionValues = calculateNutritionAverage(meals);

  return {
    calories: getPercentage(nutritionValues.calories, goal.dailyCaloriesGoal),
    carbohydrate: getPercentage(nutritionValues.carbohydrate, goal.dailyCarbohydrateGoal),
    protein: getPercentage(nutritionValues.protein, goal.dailyProteinGoal),
    fat: getPercentage(nutritionValues.fat, goal.dailyFatGoal)
  };
};
