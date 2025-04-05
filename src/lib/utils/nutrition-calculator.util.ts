import { ACTIVITY_LEVEL, NUTRITION_PURPOSE } from '@/constants/nutrition.constant';
import { UserDTO } from '@/types/DTO/user.dto';
import { NutritionResult } from '@/types/nutrition.type';

type UserPhysicalProfileKey = 'gender' | 'height' | 'weight' | 'age' | 'activityLevel' | 'purpose';
type UserPhysicalProfile = Pick<UserDTO, UserPhysicalProfileKey>;
/**
 * 사용자의 신체 정보와 목표를 기반으로 하루 권장 섭취 열량과 탄단지 비율을 계산하는 함수입니다.
 *
 * @function calculateNutrition
 * @param {UserPhysicalProfile} - 사용자 성별, 키, 몸무게, 나이, 활동 수준, 운동 목적 정보
 * @returns {NutritionResult | undefined} NutritionResult 객체 또는 유효하지 않은 입력 시 undefined 반환
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
}: UserPhysicalProfile): NutritionResult | undefined => {
  if (!gender || !height || !weight || !age || !purpose) return;

  const activityFactor = ACTIVITY_LEVEL[activityLevel as keyof typeof ACTIVITY_LEVEL];
  const { FACTOR, RATIO } = NUTRITION_PURPOSE[purpose as keyof typeof NUTRITION_PURPOSE];

  if (!activityFactor) return;

  const baseCalories =
    gender === 'MAN'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : gender === 'WOMAN'
        ? 10 * weight + 6.25 * height - 5 * age - 161
        : 0;

  const dailyCaloriesGoal = Math.floor(baseCalories * activityFactor * FACTOR);

  const [carbRatio, proteinRatio, fatRatio] = RATIO;
  const dailyCarbohydrate = Math.floor((dailyCaloriesGoal * carbRatio) / 4);
  const dailyProtein = Math.floor((dailyCaloriesGoal * proteinRatio) / 4);
  const dailyFat = Math.floor((dailyCaloriesGoal * fatRatio) / 9);

  return {
    dailyCaloriesGoal,
    dailyCarbohydrate,
    dailyProtein,
    dailyFat
  };
};
