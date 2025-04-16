import MacronutrientBox from '@/components/commons/macronutrient-box';
import { NutritionEnum } from '@/types/nutrition.type';

type HomeMealCardMacronutrientGroupProps = {
  carbohydrate: number;
  protein: number;
  fat: number;
};
const HomeMealCardMacronutrient = ({ carbohydrate, protein, fat }: HomeMealCardMacronutrientGroupProps) => {
  return (
    <div className="flex gap-4">
      <MacronutrientBox variety={NutritionEnum.CARBOHYDRATE} value={carbohydrate} />
      <MacronutrientBox variety={NutritionEnum.PROTEIN} value={protein} />
      <MacronutrientBox variety={NutritionEnum.FAT} value={fat} />
    </div>
  );
};
export default HomeMealCardMacronutrient;
