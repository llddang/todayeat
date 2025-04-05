export type ActivityLevelKey = 'VERY_LOW' | 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH';

export type ActivityLevel = Record<ActivityLevelKey, number>;

export type NutritionPurposeKey = 'WEIGHT_LOSS' | 'WEIGHT_MAINTENANCE' | 'MUSCLE_GAIN';

export type NutritionPurposeValue = {
  FACTOR: number;
  RATIO: [number, number, number]; // [탄수화물, 단백질, 지방]
};

export type NutritionPurpose = Record<NutritionPurposeKey, NutritionPurposeValue>;

export type NutritionResult = {
  dailyCaloriesGoal: number;
  dailyCarbohydrate: number;
  dailyProtein: number;
  dailyFat: number;
};
