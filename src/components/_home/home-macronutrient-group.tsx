import MacronutrientBox from '@/components/_home/home-macronutrient-box';
import { Macronutrient } from '@/types/nutrition.type';

type HomeMacronutrientGroupProps = {
  total: Macronutrient;
  goal: Macronutrient;
};

const HomeMacroNutrientGroup = ({ total, goal }: HomeMacronutrientGroupProps) => {
  return (
    <div className="flex gap-3">
      <MacronutrientBox label="탄수화물" value={total.carbohydrate} goal={goal.carbohydrate} />
      <MacronutrientBox label="단백질" value={total.protein} goal={goal.protein} />
      <MacronutrientBox label="지방" value={total.fat} goal={goal.fat} />
    </div>
  );
};

export default HomeMacroNutrientGroup;
