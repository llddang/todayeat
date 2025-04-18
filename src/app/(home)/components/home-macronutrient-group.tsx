import { Macronutrient, MacronutrientEnum, MacronutrientGoal } from '@/types/nutrition.type';
import HomeMacronutrientBox from './home-macronutrient-box';

type HomeMacronutrientGroupProps = {
  total: Macronutrient;
  goal: MacronutrientGoal | null;
};

const HomeMacroNutrientGroup = ({ total, goal }: HomeMacronutrientGroupProps) => {
  return (
    <div className="flex gap-3">
      <HomeMacronutrientBox
        variety={MacronutrientEnum.CARBOHYDRATE}
        value={total.carbohydrate}
        goal={goal ? goal.dailyCarbohydrateGoal : 0}
      />
      <HomeMacronutrientBox
        variety={MacronutrientEnum.PROTEIN}
        value={total.protein}
        goal={goal ? goal.dailyProteinGoal : 0}
      />
      <HomeMacronutrientBox variety={MacronutrientEnum.FAT} value={total.fat} goal={goal ? goal.dailyFatGoal : 0} />
    </div>
  );
};

export default HomeMacroNutrientGroup;
