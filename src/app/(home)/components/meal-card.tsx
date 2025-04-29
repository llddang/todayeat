/* eslint-disable @next/next/no-img-element */
import { MealCategoryType } from '@/types/meal-category.type';
import { calculateTotalNutrition } from '@/utils/nutrition-calculator.util';
import { MealDTO } from '@/types/DTO/meal.dto';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/shadcn';
import MacronutrientGroup from '@/components/commons/macronutrient-group';
import { formatTimeToHHMM, formatTimeWithMeridiem } from '@/utils/format.util';
import Link from 'next/link';
import SITE_MAP from '@/constants/site-map.constant';

type MealCardProps = {
  meal: MealDTO;
  editMode: boolean;
  onDelete: (mealId: string) => void;
};
const MealCard = ({ meal, editMode, onDelete }: MealCardProps) => {
  const { calories, ...macronutrients } = calculateTotalNutrition([meal]);

  const { name: mealLabel, icon: mealIcon } = MEAL_CATEGORY_OPTIONS[meal.mealCategory];

  return (
    <li className="relative flex gap-3 overflow-visible">
      <div
        className={cn(
          'flex flex-col items-center pt-1 text-center',
          'before:mb-1 before:h-[1.375rem] before:w-[1.375rem] before:bg-contain before:bg-center before:bg-no-repeat',
          'after:mt-2 after:w-[1px] after:flex-1 after:bg-gray-350',
          mealIcon
        )}
      >
        <Typography variant="caption2" className="text-gray-500">
          {formatTimeWithMeridiem(new Date(meal.ateAt))}
          <br />
          {formatTimeToHHMM(new Date(meal.ateAt))}
        </Typography>
      </div>
      <Link
        href={`${SITE_MAP.MEAL_DETAIL}/${meal.id}`}
        className="flex w-full flex-1 flex-col gap-4 overflow-hidden rounded-2xl bg-white p-4"
      >
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
      </Link>
      {editMode && (
        <button
          onClick={() => onDelete(meal.id)}
          className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center"
        >
          <img
            src="/icons/close-line-white.svg"
            alt="닫기"
            className="h-6 w-6 rounded-full bg-gray-800/70 p-1.5 hover:bg-gray-800/90"
          />
        </button>
      )}
    </li>
  );
};

export default MealCard;

const MEAL_CATEGORY_OPTIONS: { [key in MealCategoryType]: { name: string; icon: string } } = {
  BREAKFAST: { name: '아침', icon: 'before:bg-meal-category-breakfast' },
  LUNCH: { name: '점심', icon: 'before:bg-meal-category-lunch' },
  DINNER: { name: '저녁', icon: 'before:bg-meal-category-dinner' },
  SNACK: { name: '간식', icon: 'before:bg-meal-category-snack' }
} as const;
