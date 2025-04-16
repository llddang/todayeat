import HomeMealCardMacronutrient from '@/components/_home/home-meal-card-macronutrient';
import HomeMealCardTimeIndicator from '@/components/_home/home-meal-card-time-indicator';
import HomeMealCardTitle from '@/components/_home/home-meal-card-title';
import HomeMealCardMemo from '@/components/_home/home-meal-card-memo';
import { MEAL_CATEGORY_OPTIONS } from '@/constants/meal.constant';
import { calculateTotalNutrition } from '@/lib/utils/nutrition-calculator.util';
import { MealDTO } from '@/types/DTO/meal.dto';

type HomeMealCardProps = {
  meal: MealDTO;
};
const HomeMealCard = ({ meal }: HomeMealCardProps) => {
  const { calories, ...macronutrients } = calculateTotalNutrition([meal]);

  const { name: mealLabel, icon: mealIcon } = MEAL_CATEGORY_OPTIONS[meal.mealCategory];

  return (
    <div className="flex gap-3">
      <HomeMealCardTimeIndicator mealIcon={mealIcon} ateAt={meal.ateAt} />
      {/* TODO : Link 태그로 변경 & 식사 상세 페이지로 이동하게끔!! */}
      <div className="flex flex-1 flex-col gap-4 rounded-2xl bg-white p-4">
        <HomeMealCardTitle mealLabel={mealLabel} calories={calories} images={meal.foodImages} />
        <HomeMealCardMacronutrient {...macronutrients} />
        {meal.memo && <HomeMealCardMemo memo={meal.memo} />}
      </div>
    </div>
  );
};

export default HomeMealCard;
