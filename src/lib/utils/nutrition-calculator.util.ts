import { ACTIVITY_LEVEL, NUTRITION_PURPOSE } from '@/constants/nutrition.constant';
import { UserDTO } from '@/types/DTO/user.dto';
import { NutritionResult } from '@/types/nutrition.type';

type UserPhysicalProfileKey = 'gender' | 'height' | 'weight' | 'age' | 'activityLevel' | 'purpose';
type UserPhysicalProfile = Pick<UserDTO, UserPhysicalProfileKey>;

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
