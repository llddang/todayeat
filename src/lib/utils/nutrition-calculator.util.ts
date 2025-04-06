import { ACTIVITY_LEVEL, NUTRITION_PURPOSE } from '@/constants/nutrition.constant';
import { DailyNutrition } from '@/types/DTO/meal.dto';
import { UserPhysicalProfileDTO } from '@/types/DTO/user.dto';
import { AverageNutrition, NutritionResult } from '@/types/nutrition.type';

/**
 * 사용자의 신체 정보와 목표를 기반으로 하루 권장 섭취 열량과 탄단지 비율을 계산하는 함수입니다.
 *
 * @function calculateNutrition
 * @param {UserPhysicalProfileDTO} - 사용자 성별, 키, 몸무게, 나이, 활동 수준, 운동 목적 정보
 * @returns {NutritionResult | undefined} NutritionResult 객체 또는 유효하지 않은 입력 시 undefined 반환
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

export const calculateNutrition = ({
  gender,
  height,
  weight,
  age,
  activityLevel,
  purpose
}: UserPhysicalProfileDTO): NutritionResult => {
  if (!gender || !height || !weight || !age || !purpose) return defaultDailyNutrition;

  const activityFactor = ACTIVITY_LEVEL[activityLevel];
  const { FACTOR, RATIO } = NUTRITION_PURPOSE[purpose];

  if (!activityFactor) return defaultDailyNutrition;

  const baseCalories =
    gender === 'MAN' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;

  const dailyCaloriesGoal = Math.round(baseCalories * activityFactor * FACTOR);

  const [carbRatio, proteinRatio, fatRatio] = RATIO;
  const dailyCarbohydrateGoal = Math.round((dailyCaloriesGoal * carbRatio) / 4);
  const dailyProteinGoal = Math.round((dailyCaloriesGoal * proteinRatio) / 4);
  const dailyFatGoal = Math.round((dailyCaloriesGoal * fatRatio) / 9);

  return {
    dailyCaloriesGoal,
    dailyCarbohydrateGoal,
    dailyProteinGoal,
    dailyFatGoal
  };
};

export const calculateNutritionAverage = (meals: DailyNutrition[]): AverageNutrition => {
  if (meals.length === 0) {
    return {
      averageCalories: 0,
      averageCarbohydrate: 0,
      averageFat: 0,
      averageProtein: 0
    };
  }

  const total = meals.reduce(
    (acc, nutrition) => {
      acc.totalCalories += nutrition.totalCalories;
      acc.totalCarbohydrate += nutrition.totalCarbohydrate;
      acc.totalFat += nutrition.totalFat;
      acc.totalProtein += nutrition.totalProtein;
      return acc;
    },
    {
      totalCalories: 0,
      totalCarbohydrate: 0,
      totalFat: 0,
      totalProtein: 0
    }
  );

  const count = meals.length;

  return {
    averageCalories: Math.round(total.totalCalories / count),
    averageCarbohydrate: Math.round(total.totalCarbohydrate / count),
    averageFat: Math.round(total.totalFat / count),
    averageProtein: Math.round(total.totalProtein / count)
  };
};
