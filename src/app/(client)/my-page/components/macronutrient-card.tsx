import { Typography } from '@/components/ui/typography';
import { formatNumberWithComma } from '@/lib/utils/format-number-with-comma';
import { calculateMacroCaloriesbyGrams, CALORIES_PER_GRAM } from '@/lib/utils/nutrition-calculator.util';

type MacroNutrientCardProps = {
  dailyCarbohydrateGoal: string | number;
  dailyProteinGoal: string | number;
  dailyFatGoal: string | number;
};
const MacroNutrientCard = ({ dailyCarbohydrateGoal, dailyProteinGoal, dailyFatGoal }: MacroNutrientCardProps) => {
  const carbInfo = calculateMacroCaloriesbyGrams(dailyCarbohydrateGoal, CALORIES_PER_GRAM.CARBOHYDRATE);
  const proteinInfo = calculateMacroCaloriesbyGrams(dailyProteinGoal, CALORIES_PER_GRAM.PROTEIN);
  const fatInfo = calculateMacroCaloriesbyGrams(dailyFatGoal, CALORIES_PER_GRAM.FAT);

  return (
    <ul className="mt-3 flex w-full flex-col gap-2 rounded-xl bg-gray-100 p-4">
      <li className="flex justify-between">
        <Typography as="span" variant="body1" className="text-gray-600">
          탄수화물
        </Typography>
        <Typography as="span" variant="body1" className="text-gray-800">
          {`${formatNumberWithComma(carbInfo.grams)}g (${formatNumberWithComma(carbInfo.calories)}kcal)`}
        </Typography>
      </li>
      <li className="flex justify-between">
        <Typography as="span" variant="body1" className="text-gray-600">
          단백질
        </Typography>
        <Typography as="span" variant="body1" className="text-gray-800">
          {`${formatNumberWithComma(proteinInfo.grams)}g (${formatNumberWithComma(proteinInfo.calories)}kcal)`}
        </Typography>
      </li>
      <li className="flex justify-between">
        <Typography as="span" variant="body1" className="text-gray-600">
          지방
        </Typography>
        <Typography as="span" variant="body1" className="text-gray-800">
          {`${formatNumberWithComma(fatInfo.grams)}g (${formatNumberWithComma(fatInfo.calories)}kcal)`}
        </Typography>
      </li>
    </ul>
  );
};

export default MacroNutrientCard;
