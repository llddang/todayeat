import { Typography } from '@/components/ui/typography';
import { formatNumberWithComma } from '@/utils/format.util';
import { calculateMacroCaloriesByGram, CALORIES_PER_GRAM } from '@/utils/nutrition-calculator.util';

type MacronutrientCardProps = {
  dailyCarbohydrateGoal: string | number;
  dailyProteinGoal: string | number;
  dailyFatGoal: string | number;
};
const MacronutrientCard = ({ dailyCarbohydrateGoal, dailyProteinGoal, dailyFatGoal }: MacronutrientCardProps) => {
  const carbInfo = calculateMacroCaloriesByGram(dailyCarbohydrateGoal, CALORIES_PER_GRAM.CARBOHYDRATE);
  const proteinInfo = calculateMacroCaloriesByGram(dailyProteinGoal, CALORIES_PER_GRAM.PROTEIN);
  const fatInfo = calculateMacroCaloriesByGram(dailyFatGoal, CALORIES_PER_GRAM.FAT);

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

export default MacronutrientCard;
