import MacronutrientBox from '@/components/_home/home-macronutrient-box';
import { Macronutrient, MacronutrientEnum } from '@/types/nutrition.type';

type HomeMacronutrientGroupProps = {
  total: Macronutrient;
  goal: Macronutrient;
};

const HomeMacroNutrientGroup = ({ total, goal }: HomeMacronutrientGroupProps) => {
  return (
    <div className="flex gap-3">
      <MacronutrientBox variety={MacronutrientEnum.CARBOHYDRATE} value={total.carbohydrate} goal={goal.carbohydrate} />
      <MacronutrientBox variety={MacronutrientEnum.PROTEIN} value={total.protein} goal={goal.protein} />
      <MacronutrientBox variety={MacronutrientEnum.FAT} value={total.fat} goal={goal.fat} />
    </div>
  );
};

export default HomeMacroNutrientGroup;
