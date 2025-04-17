import HomeMealCardMacronutrient from '@/components/_home/home-meal-card-macronutrient';
import HomeMealCardTimeIndicator from '@/components/_home/home-meal-card-time-indicator';
import HomeMealCardTitle from '@/components/_home/home-meal-card-title';
import HomeMealCardMemo from '@/components/_home/home-meal-card-memo';
import { MEAL_CATEGORY_OPTIONS } from '@/constants/meal.constant';
import { calculateTotalNutrition } from '@/lib/utils/nutrition-calculator.util';
import { MealDTO } from '@/types/DTO/meal.dto';
import { Typography } from '@/components/ui/typography';
import { formatAmPmKorean, formatTime } from '@/lib/utils/date.util';
import { cn } from '@/lib/utils';

type HomeMealCardProps = {
  meal: MealDTO;
};
const HomeMealCard = ({ meal }: HomeMealCardProps) => {
  const { calories, ...macronutrients } = calculateTotalNutrition([meal]);

  const { name: mealLabel, icon: mealIcon } = MEAL_CATEGORY_OPTIONS[meal.mealCategory];

  return (
    <li className="flex gap-3">
      <div
        className={cn(
          'flex flex-col items-center pt-1 text-center',
          'before:mb-1 before:h-[1.375rem] before:w-[1.375rem] before:bg-contain before:bg-center before:bg-no-repeat',
          'after:mt-2 after:w-[1px] after:flex-1 after:bg-gray-350',
          mealIcon
        )}
      >
        <Typography variant="caption2" className="text-gray-500">
          {formatAmPmKorean(meal.ateAt)}
          <br />
          {formatTime(meal.ateAt)}
        </Typography>
      </div>
      {/* TODO : Link 태그로 변경 & 식사 상세 페이지로 이동하게끔!! */}
      <div className="flex w-full flex-1 flex-col gap-4 overflow-hidden rounded-2xl bg-white p-4">
        <HomeMealCardTitle mealLabel={mealLabel} calories={calories} images={meal.foodImages} />
        <HomeMealCardMacronutrient {...macronutrients} />
        {meal.memo && <HomeMealCardMemo memo={meal.memo} />}
      </div>
    </li>
  );
};

export default HomeMealCard;
