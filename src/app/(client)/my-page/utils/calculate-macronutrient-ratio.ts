import { getPercentage } from '@/utils/nutrition-calculator.util';

export const calculateMacronutrientRatio = (
  dailyCarbohydrateGoal: number,
  dailyProteinGoal: number,
  dailyFatGoal: number
) => {
  const total = dailyCarbohydrateGoal + dailyProteinGoal + dailyFatGoal;

  if (total === 0) return '0 : 0 : 0';

  const carbRatio = getPercentage(dailyCarbohydrateGoal, total);
  const proteinRatio = getPercentage(dailyProteinGoal, total);
  const fatRatio = getPercentage(dailyFatGoal, total);

  return `${carbRatio} : ${proteinRatio} : ${fatRatio}`;
};
