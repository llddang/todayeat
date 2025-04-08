import { MealDTO } from '@/types/DTO/meal.dto';
import { UserPhysicalProfileDTO } from '@/types/DTO/user.dto';
import { Gender } from '@/types/gender.type';
import {
  ACTIVITY_LEVEL_OPTIONS,
  MealNutrition,
  NUTRITION_PURPOSE_OPTIONS,
  NutritionGoal,
  NutritionPurposeValue
} from '@/types/nutrition.type';

const CALORIES_PER_GRAM = {
  CARBOHYDRATE: 4,
  PROTEIN: 4,
  FAT: 9
};

const initialTotalValue = {
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
export const calculateNutrition = ({
  gender,
  height,
  weight,
  age,
  activityLevel,
  purpose
}: UserPhysicalProfileDTO): NutritionGoal => {
  const activityFactor = ACTIVITY_LEVEL_OPTIONS[activityLevel].factor;
  const { factor, ratio }: NutritionPurposeValue = NUTRITION_PURPOSE_OPTIONS[purpose];

  const commonBMR = 10 * weight + 6.25 * height - 5 * age;
  const baseCalories = gender === Gender.MAN.value ? commonBMR + 5 : commonBMR - 161;

  const dailyCaloriesGoal = Math.round(baseCalories * activityFactor * factor);

  const { carbohydrateRatio, proteinRatio, fatRatio } = ratio;
  const dailyCarbohydrateGoal = Math.round((dailyCaloriesGoal * carbohydrateRatio) / CALORIES_PER_GRAM.CARBOHYDRATE);
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
 * @returns {MealNutrition} - 전체 합산된 영양 정보를 포함한 객체를 반환합니다.
 */
export const calculateTotalNutrition = (mealsData: MealDTO[]): MealNutrition => {
  console.log(mealsData);

  const flatMapMeals = mealsData.flatMap((meal) => meal.mealDetails);
  console.log('flatMapMeals===>', flatMapMeals);
  return mealsData
    .flatMap((meal) => meal.mealDetails)
    .reduce(
      (acc, meal) => {
        acc.calories += meal.calories;
        acc.carbohydrate += meal.carbohydrate;
        acc.fat += meal.fat;
        acc.protein += meal.protein;
        return acc;
      },
      { ...initialTotalValue }
    );
};

/**
 * 여러 날의 식사 데이터를 기반으로 평균 섭취 열량과 영양소를 계산합니다.
 *
 * @function calculateNutritionAverage
 * @param {MealDTO[]} mealsData - 기간 내의 한 끼니별 데이터 배열
 * @param {string} startDate - 계산 시작 날짜 (YYYY-MM-DD 형식)
 * @param {string} endDate - 계산 종료 날짜 (YYYY-MM-DD 형식)
 * @returns {MealNutrition} 평균 섭취 열량 및 각 영양소 평균값
 */
export const calculateNutritionAverage = (mealsData: MealDTO[]): MealNutrition => {
  if (mealsData.length === 0) {
    return {
      calories: 0,
      carbohydrate: 0,
      fat: 0,
      protein: 0
    };
  }

  const uniqueDates = new Set<string>();
  mealsData.forEach((meal) => {
    if (meal.ateAt) {
      const date = meal.ateAt.split('T')[0];
      uniqueDates.add(date);
    }
  });

  const dayCount = uniqueDates.size;
  const total = calculateTotalNutrition(mealsData);

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
 * @param {number | null} base - 기준값 (null 또는 0일 경우 0% 반환)
 * @returns {number} 기준 대비 백분율 (정수, 소수점 없음)
 */

const getPercentage = (value: number, base: number | null): number => {
  if (!base) return 0;
  return Math.round((value / base) * 100);
};

/**
 * 영양소 목표 대비 실제 섭취량의 백분율을 계산합니다.
 * 날짜 범위가 제공되면 해당 기간의 평균을 계산하고, 그렇지 않으면 전체 식사 데이터의 합계를 사용합니다.
 *
 * @function calculateNutritionRatio
 * @param {NutritionGoal} goal - 하루 권장 섭취량
 * @param {MealDTO[]} mealsData - 식사 데이터
 * @param {object} options - 선택적 매개변수
 * @param {string} [options.startDate] - 시작 날짜 (기간 계산시 사용)
 * @param {string} [options.endDate] - 종료 날짜 (기간 계산시 사용)
 * @returns {MealNutrition} 각 항목별 실제 섭취량의 백분율
 */
export const calculateNutritionRatio = (
  goal: NutritionGoal,
  mealsData: MealDTO[],
  options?: { startDate?: string; endDate?: string }
): MealNutrition => {
  console.log(mealsData);
  let nutritionValues: MealNutrition;

  if (options?.startDate && options?.endDate) {
    // 기간에 대한 평균 계산
    const diffInMs = Number(new Date(options.endDate)) - Number(new Date(options.startDate));
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24) + 1;

    const total = calculateTotalNutrition(mealsData);

    nutritionValues = {
      calories: Math.round(total.calories / diffInDays),
      carbohydrate: Math.round(total.carbohydrate / diffInDays),
      fat: Math.round(total.fat / diffInDays),
      protein: Math.round(total.protein / diffInDays)
    };
  } else {
    // 하루 총합 계산
    nutritionValues = calculateTotalNutrition(mealsData);
  }

  // 백분율 계산
  return {
    calories: getPercentage(nutritionValues.calories, goal.dailyCaloriesGoal),
    carbohydrate: getPercentage(nutritionValues.carbohydrate, goal.dailyCarbohydrateGoal),
    protein: getPercentage(nutritionValues.protein, goal.dailyProteinGoal),
    fat: getPercentage(nutritionValues.fat, goal.dailyFatGoal)
  };
};
