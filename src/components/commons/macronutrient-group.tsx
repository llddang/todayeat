import { HTMLAttributes } from 'react';
import MacronutrientBox from '@/components/commons/macronutrient-box';
import { cn } from '@/lib/utils';
import { NutritionEnum } from '@/types/nutrition.type';

type MacronutrientGroupProps = HTMLAttributes<HTMLDivElement> & {
  carbohydrate: number;
  protein: number;
  fat: number;
};
const MacronutrientGroup = ({ carbohydrate, protein, fat, className, ...props }: MacronutrientGroupProps) => {
  return (
    <div className={cn('flex gap-4', className)} {...props}>
      <MacronutrientBox variety={NutritionEnum.CARBOHYDRATE} value={carbohydrate} />
      <MacronutrientBox variety={NutritionEnum.PROTEIN} value={protein} />
      <MacronutrientBox variety={NutritionEnum.FAT} value={fat} />
    </div>
  );
};
export default MacronutrientGroup;
