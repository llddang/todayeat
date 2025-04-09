import MacroNutrientBox from '@/components/_home/macro-nutrient-box';
import { Macronutrient } from '@/types/nutrition.type';

type MacroNutrientGroupProps = {
  total: Macronutrient;
  goal: Macronutrient;
};

const MacroNutrientGroup = ({ total, goal }: MacroNutrientGroupProps) => {
  return (
    <div className="flex gap-3">
      <MacroNutrientBox label="탄수화물" value={total.carbohydrate} goal={goal.carbohydrate} />
      <MacroNutrientBox label="단백질" value={total.protein} goal={goal.protein} />
      <MacroNutrientBox label="지방" value={total.fat} goal={goal.fat} />
    </div>
  );
};

export default MacroNutrientGroup;
