import MacronutrientBox from '@/components/_home/home-macronutrient-box';
import { Macronutrient, MacronutrientEnum, MacronutrientGoal } from '@/types/nutrition.type';

type HomeMacronutrientGroupProps = {
  total: Macronutrient;
  goal: MacronutrientGoal | null;
};

const HomeMacroNutrientGroup = ({ total, goal }: HomeMacronutrientGroupProps) => {
  return (
    <div className="flex gap-3">
      <MacronutrientBox
        variety={MacronutrientEnum.CARBOHYDRATE}
        value={total.carbohydrate}
        goal={goal ? goal.dailyCarbohydrateGoal : 0}
      />
      <MacronutrientBox
        variety={MacronutrientEnum.PROTEIN}
        value={total.protein}
        goal={goal ? goal.dailyProteinGoal : 0}
      />
      <MacronutrientBox variety={MacronutrientEnum.FAT} value={total.fat} goal={goal ? goal.dailyFatGoal : 0} />
    </div>
  );
};

export default HomeMacroNutrientGroup;
