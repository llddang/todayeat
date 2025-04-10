import MacronutrientBox from '@/components/_home/macronutrient-box';
import { Macronutrient } from '@/types/nutrition.type';

type MacronutrientGroupProps = {
  total: Macronutrient;
  goal: Macronutrient;
};

const MacroNutrientGroup = ({ total, goal }: MacronutrientGroupProps) => {
  return (
    <div className="flex gap-3">
      <MacronutrientBox label="탄수화물" value={total.carbohydrate} goal={goal.carbohydrate} />
      <MacronutrientBox label="단백질" value={total.protein} goal={goal.protein} />
      <MacronutrientBox label="지방" value={total.fat} goal={goal.fat} />
    </div>
  );
};

export default MacroNutrientGroup;
