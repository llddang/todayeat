import { ACTIVITY_LEVEL_OPTIONS, NUTRITION_PURPOSE_OPTIONS } from '@/constants/user-personal-info.constant';
import { MealDTO } from '@/types/DTO/meal.dto';
import { UserPhysicalProfileDTO } from '@/types/DTO/user.dto';
import { MealNutrition, NutritionGoal, Macronutrient, PurposeValue } from '@/types/nutrition.type';
import { Gender, GenderType } from '@/types/user-personal-info.type';

export const CALORIES_PER_GRAM = {
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
 * 기초대사량(BMR)을 계산합니다.
 *
 * @params {number} weight,h - 체중(kg), 신장(cm), 나이
 * @param {number} height - 신장(cm)
 * @param {number} age - 나이
 * @param {GenderType} gender - 성별 ("MAN" | "WOMAN")
 * @returns {number} 계산된 기초대사량
 *
 * @description
 * 성별에 따라 다른 기초대사량 계산식을 적용합니다:
 */
export const calculateBMR = (weight: number, height: number, age: number, gender: GenderType): number => {
  const commonBMR = 10 * weight + 6.25 * height - 5 * age;
  return gender === Gender.MAN ? commonBMR + 5 : commonBMR - 161;
};

/**
 * 일일 총 칼로리를 기반으로 각 영양소별 권장 섭취량을 계산합니다.
 *
 * @param {number} dailyCalories - 일일 총 칼로리
 * @param {Macronutrient} ratio - 각 영양소별 비율
 * @returns {Object} 탄수화물, 단백질, 지방의 일일 권장 섭취량(g)
 *
 * @description
 * 각 영양소는 다음 열량 환산값을 사용하여 계산됩니다:
 * - 탄수화물: 4kcal/g
 * - 단백질: 4kcal/g
 * - 지방: 9kcal/g
 */
export const calculateDailyNutrition = (dailyCalories: number, ratio: Macronutrient) => {
  return {
    dailyCarbohydrateGoal: Math.round((dailyCalories * ratio.carbohydrate) / CALORIES_PER_GRAM.CARBOHYDRATE),
    dailyProteinGoal: Math.round((dailyCalories * ratio.protein) / CALORIES_PER_GRAM.PROTEIN),
    dailyFatGoal: Math.round((dailyCalories * ratio.fat) / CALORIES_PER_GRAM.FAT)
  };
};

/**
 * 기초대사량(BMR)을 기반으로 일일 권장 칼로리를 계산합니다.
 *
 * @param {number} bmr - 기초대사량
 * @param {number} activityFactor - 활동 수준에 따른 계수
 * @param {number} purposeFactor - 목적(증량/감량/유지)에 따른 계수
 * @returns {number} 일일 권장 칼로리 (정수로 반올림)
 */
export const calculateDailyCalories = (bmr: number, activityFactor: number, purposeFactor: number): number => {
  return Math.round(bmr * activityFactor * purposeFactor);
};

/**
 * 사용자의 신체 정보와 목표를 기반으로 하루 권장 섭취 열량과 탄단지 비율을 계산하는 함수입니다.
 *
 * @function calculateDailyNutritionGoal
 * @param {UserPhysicalProfileDTO} - 사용자 성별, 키, 몸무게, 나이, 활동 수준, 운동 목적 정보
 * @returns {NutritionGoal} NutritionGoal 객체
 *
 * @description
 * - BMR(기초대사량) 공식을 기반으로 활동계수 및 목적계수를 곱하여 총 권장 섭취 열량을 계산합니다.
 * - 각 영양소(탄수화물, 단백질, 지방)는 해당 비율과 열량 환산값(탄:4, 단:4, 지:9)을 통해 계산됩니다.
 * - 성별에 따라 BMR 계산식이 다르게 적용됩니다.
 */
export const calculateDailyNutritionGoal = ({
  gender,
  height,
  weight,
  age,
  activityLevel,
  purpose
}: UserPhysicalProfileDTO): NutritionGoal => {
  const activityFactor = ACTIVITY_LEVEL_OPTIONS[activityLevel].factor;
  const { factor, ratio }: PurposeValue = NUTRITION_PURPOSE_OPTIONS[purpose];
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
 * @param {MealDTO[]} meals - 합산할 한끼 식단정보에 대한 배열입니다.
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
export const countUniqueDates = (meals: MealDTO[]): number => {
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
export const getPercentage = (value: number, base: number): number => {
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

/**
 * 영양소의 그램수를 기반으로 칼로리를 계산하는 함수
 *
 * @param gram - 영양소의 그램 수 (문자열 또는 숫자)
 * @param caloriesPerGram - 영양소별 1g당 칼로리 계수 (탄수화물: 4, 단백질: 4, 지방: 9)
 * @returns 그램 수와 칼로리 값을 포함하는 객체
 */
export const calculateMacroCaloriesByGram = (
  gram: string | number,
  caloriesPerGram: number
): { grams: number; calories: number } => {
  const gramValue = Number(gram) || 0;
  const calories = gramValue * caloriesPerGram;

  return {
    grams: gramValue,
    calories: calories
  };
};
