import MacronutrientBox from '@/components/commons/macronutrient-box';
import { Typography } from '@/components/ui/typography';
import { MealDetailDTO } from '@/types/DTO/meal.dto';
import { MacronutrientEnum } from '@/types/nutrition.type';

type MealListCardProps = {
  mealDetail: MealDetailDTO;
};

const MealListCard = ({ mealDetail }: MealListCardProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-white/50 p-3 backdrop-blur-[50px]">
      <div className="flex gap-4 py-1 pl-1 pr-2">
        <Typography
          as="span"
          variant="body1"
          className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-900"
        >
          {mealDetail.menuName}
        </Typography>
        <div className="flex items-center gap-1">
          <Typography as="span" variant="subTitle3">
            {mealDetail.calories}kcal
          </Typography>
          <Typography as="span" variant="body3" className="text-gray-550">
            /
          </Typography>
          <Typography as="span" variant="body3" className="text-gray-550">
            {mealDetail.weight}g
          </Typography>
        </div>
      </div>
      <div className="flex gap-2 rounded-xl bg-white p-3">
        <MacronutrientBox variety={MacronutrientEnum.CARBOHYDRATE} value={mealDetail.carbohydrate} />
        <MacronutrientBox variety={MacronutrientEnum.PROTEIN} value={mealDetail.protein} />
        <MacronutrientBox variety={MacronutrientEnum.FAT} value={mealDetail.fat} />
      </div>
    </div>
  );
};

export default MealListCard;
