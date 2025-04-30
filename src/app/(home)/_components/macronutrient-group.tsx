import { Macronutrient, MacronutrientEnum, MacronutrientGoal } from '@/types/nutrition.type';
import MacronutrientBox from './macronutrient-box';

type MacronutrientGroupProps = {
  total: Macronutrient;
  goal: MacronutrientGoal | null;
};

const MacronutrientGroup = ({ total, goal }: MacronutrientGroupProps) => {
  return (
    <div className="flex gap-3 xl:flex-col">
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

export default MacronutrientGroup;
