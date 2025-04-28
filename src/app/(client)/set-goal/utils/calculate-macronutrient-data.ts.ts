import { UpdateUserPersonalInfoDTO } from '@/types/DTO/user.dto';
import { getPercentage } from '@/utils/nutrition-calculator.util';

const calculateMacronutrientData = (userPersonalInfos: UpdateUserPersonalInfoDTO) => {
  const totalMacros =
    userPersonalInfos.dailyCarbohydrateGoal + userPersonalInfos.dailyProteinGoal + userPersonalInfos.dailyFatGoal;

  const macronutrientData = {
    carbohydrate: {
      grams: userPersonalInfos.dailyCarbohydrateGoal,
      percentage: getPercentage(userPersonalInfos.dailyCarbohydrateGoal, totalMacros)
    },
    protein: {
      grams: userPersonalInfos.dailyProteinGoal,
      percentage: getPercentage(userPersonalInfos.dailyProteinGoal, totalMacros)
    },
    fat: {
      grams: userPersonalInfos.dailyFatGoal,
      percentage: getPercentage(userPersonalInfos.dailyFatGoal, totalMacros)
    }
  };

  return macronutrientData;
};

export default calculateMacronutrientData;
