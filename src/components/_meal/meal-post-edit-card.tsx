import MealEditNutrientBox from './meal-post-edit-nutrient-box';
import { MealDetailDTO } from '@/types/DTO/meal.dto';
import MealEditInputField from './meal-post-edit-input-field';
import MealEditCardTitle from './meal-post-edit-card-title';
import { MacronutrientEnum, MeasurementUnitEnum } from '@/types/nutrition.type';

type MealEditCardProps = {
  mealDetail: MealDetailDTO;
};

const MealEditCard = ({ mealDetail }: MealEditCardProps): JSX.Element => {
  return (
    <div className="flex w-[362px] flex-col items-start gap-[1rem] self-stretch rounded-2xl bg-white/50 px-[0.75rem] py-[1rem] backdrop-blur-[50px]">
      {/* 헤더 */}
      <MealEditCardTitle title={mealDetail.menuName} mealId={mealDetail.id} />
      {/* 칼로리 구역 */}
      <div className="flex items-start gap-2 self-stretch">
        <MealEditInputField variety={MeasurementUnitEnum.GRAM} type="text" />
        <MealEditInputField variety={MeasurementUnitEnum.KCAL} type="text" />
      </div>
      {/* 영양소 구역 */}
      <div className="flex items-center gap-4 self-stretch py-1">
        <MealEditNutrientBox variety={MacronutrientEnum.CARBOHYDRATE} value={mealDetail.carbohydrate} />
        <MealEditNutrientBox variety={MacronutrientEnum.PROTEIN} value={mealDetail.protein} />
        <MealEditNutrientBox variety={MacronutrientEnum.FAT} value={mealDetail.fat} />
      </div>
    </div>
  );
};

export default MealEditCard;
