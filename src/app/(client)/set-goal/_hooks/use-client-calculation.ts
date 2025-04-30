import { userPhysicalProfileSchema } from '../_schemas/user-physical-profile.schema';
import { calculateDailyNutritionGoal } from '@/utils/nutrition-calculator.util';
import { StepCompleteType } from '../_types/funnel.type';
import { UpdateUserPersonalGoalDTO } from '@/types/DTO/user.dto';
import useIsClient from '@/hooks/use-is-client';

const initialUserPersonalGoal: UpdateUserPersonalGoalDTO = {
  dailyCaloriesGoal: 0,
  dailyCarbohydrateGoal: 0,
  dailyProteinGoal: 0,
  dailyFatGoal: 0
};

export const useClientCalculation = (data: StepCompleteType) => {
  const isClient = useIsClient();
  let userPersonalGoal = initialUserPersonalGoal;

  if (isClient) {
    const parseResult = userPhysicalProfileSchema.safeParse(data);
    if (parseResult.success) {
      userPersonalGoal = calculateDailyNutritionGoal(parseResult.data);
    }
  }

  return userPersonalGoal;
};
