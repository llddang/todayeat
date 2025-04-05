import { USER_ACTIVITY_LEVEL } from '@/constants/nutrition.constant';
import { UserDTO } from '@/types/DTO/user.dto';

type userPhysicalProfileKey = 'gender' | 'height' | 'weight' | 'age' | 'activityLevel' | 'purpose';

type UserPhysicalProfile = Pick<UserDTO, userPhysicalProfileKey>;

// type UserNutritionResult = {
//   dailyCaloriesGoal: number;
//   dailyCarbohydrate: number;
//   dailyProtein: number;
//   dailyFat: number;
// };

export const calculateNutrition = ({ gender, height, weight, age, activityLevel, purpose }: UserPhysicalProfile) => {
  if (gender === null || height === null || weight === null || age === null || purpose === null) return;

  let activityLevelToNumber: number;
  let nutritionRatio: number[] = [];
  let purposeToNumber;
  let dailyCaloriesGoal;
  let dailyProtein;
  let dailyCarbohydrate;
  let dailyFat;

  // const activityFactor = USER_ACTIVITY_LEVEL[activityLevel as keyof typeof USER_ACTIVITY_LEVEL]
  // const purpose
  switch (activityLevel) {
    case 'VERY_LOW':
      activityLevelToNumber = USER_ACTIVITY_LEVEL.VERY_LOW;
      break;
    case 'LOW':
      activityLevelToNumber = USER_ACTIVITY_LEVEL.LOW;
      break;
    case 'MODERATE':
      activityLevelToNumber = USER_ACTIVITY_LEVEL.MODERATE;
      break;
    case 'HIGH':
      activityLevelToNumber = USER_ACTIVITY_LEVEL.HIGH;
      break;
    case 'VERY_HIGH':
      activityLevelToNumber = USER_ACTIVITY_LEVEL.VERY_HIGH;
      break;
    default:
      return;
  }

  switch (purpose) {
    case 'WEIGHT_LOSS':
      purposeToNumber = 0.8;
      nutritionRatio = [0.3, 0.4, 0.3];
      break;
    case 'WEIGHT_MAINTENANCE':
      purposeToNumber = 1;
      nutritionRatio = [0.45, 0.3, 0.25];
      break;
    case 'MUSCLE_GAIN':
      purposeToNumber = 1.1;
      nutritionRatio = [0.4, 0.4, 0.2];
      break;
    default:
      purposeToNumber = 1;
  }

  if (gender === 'MAN') {
    dailyCaloriesGoal = Math.floor(
      (10 * weight + 6.25 * height - 5 * age + 5) * activityLevelToNumber * purposeToNumber
    );
    dailyCarbohydrate = Math.floor((dailyCaloriesGoal * nutritionRatio[0]) / 4);
    dailyProtein = Math.floor((dailyCaloriesGoal * nutritionRatio[1]) / 4);
    dailyFat = Math.floor((dailyCaloriesGoal * nutritionRatio[2]) / 9);
  }

  if (gender === 'WOMAN') {
    dailyCaloriesGoal = Math.floor(
      (10 * weight + 6.25 * height - 5 * age - 161) * activityLevelToNumber * purposeToNumber
    );
    dailyCarbohydrate = Math.floor((dailyCaloriesGoal * nutritionRatio[0]) / 4);
    dailyProtein = Math.floor((dailyCaloriesGoal * nutritionRatio[1]) / 4);
    dailyFat = Math.floor((dailyCaloriesGoal * nutritionRatio[2]) / 9);
  }

  return {
    dailyCaloriesGoal,
    dailyCarbohydrate,
    dailyProtein,
    dailyFat
  };
};
