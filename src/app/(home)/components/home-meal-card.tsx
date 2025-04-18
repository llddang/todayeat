/* eslint-disable @next/next/no-img-element */
import { MEAL_CATEGORY_OPTIONS } from '@/constants/meal.constant';
import { calculateTotalNutrition } from '@/lib/utils/nutrition-calculator.util';
import { MealDTO } from '@/types/DTO/meal.dto';
import { Typography } from '@/components/ui/typography';
import { formatAmPmKorean, formatTime } from '@/lib/utils/date.util';
import { cn } from '@/lib/utils';
import MacronutrientGroup from '@/components/commons/macronutrient-group';

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
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="body3" className="text-gray-700">
              {mealLabel}
            </Typography>
            <div className="flex items-end gap-0.5">
              <Typography variant="subTitle2" className="text-gray-900">
                {calories}
              </Typography>
              <Typography variant="body3" className="text-gray-800">
                kcal
              </Typography>
            </div>
          </div>
          <div className="flex [&>*:not(:last-child)]:-mr-3">
            {meal.foodImages?.map((image) => (
              <img
                key={image}
                className="h-10 w-10 rounded-lg border border-white"
                src={image}
                alt="식사 사진"
                loading="lazy"
              />
            ))}
          </div>
        </div>
        <MacronutrientGroup {...macronutrients} />
        {meal.memo && (
          <div
            className={cn(
              'flex items-center gap-1 border-t border-gray-200 pt-[calc(1rem-1px)]',
              'before:h-[1.125rem] before:w-[1.125rem] before:bg-edit-4-icon before:bg-contain before:bg-center before:bg-no-repeat'
            )}
          >
            <Typography
              variant="body3"
              className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-gray-700"
            >
              {meal.memo}
            </Typography>
          </div>
        )}
      </div>
    </li>
  );
};

export default HomeMealCard;
