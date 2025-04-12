import { MealDetailDTO } from '@/types/DTO/meal.dto';
import MealEditInputField from '@/components/_meal/_post/meal-post-edit-input-field';
import MealEditCardTitle from '@/components/_meal/_post/meal-post-edit-card-title';
import { MacronutrientEnum, MeasurementUnitEnum } from '@/types/nutrition.type';
import MealEditNutrientBox from '@/components/_meal/_post/meal-post-edit-nutrient-box';

type MealPostEditCardProps = {
  mealDetail: MealDetailDTO;
};

const MealPostEditCard = ({ mealDetail }: MealPostEditCardProps): JSX.Element => {
  return (
    <div className="flex w-[362px] flex-col items-start gap-[1rem] rounded-2xl bg-white/50 p-3 backdrop-blur-[50px]">
      {/* 헤더 */}
      <MealEditCardTitle title={mealDetail.menuName} />
      {/* 칼로리 구역 */}
      <div className="flex items-start gap-2">
        <MealEditInputField variety={MeasurementUnitEnum.GRAM} type="text" />
        <MealEditInputField variety={MeasurementUnitEnum.KCAL} type="text" />
      </div>
      {/* 영양소 구역 */}
      <div className="flex items-center gap-2 self-stretch py-1 pb-1 pl-1 pt-2">
        <MealEditNutrientBox variety={MacronutrientEnum.CARBOHYDRATE} value={mealDetail.carbohydrate} />
        <MealEditNutrientBox variety={MacronutrientEnum.PROTEIN} value={mealDetail.protein} />
        <MealEditNutrientBox variety={MacronutrientEnum.FAT} value={mealDetail.fat} />
      </div>
    </div>
  );
};

export default MealPostEditCard;
