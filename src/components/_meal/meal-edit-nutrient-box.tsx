import { MacronutrientOptions, MacronutrientType } from '@/types/nutrition.type';

type MealEditNutrientBoxProps = {
  variety: MacronutrientType;
  value: number;
};

const MealEditNutrientBox = ({ variety, value }: MealEditNutrientBoxProps) => {
  const label = MacronutrientOptions[variety].label;
  const unit = MacronutrientOptions[variety].unit;
  const color = MacronutrientOptions[variety].color;
  return (
    <div className="flex shrink-0 flex-grow items-start gap-[0.375rem]">
      <div className="flex h-5 items-center justify-center gap-2">
        <div className={`h-2 w-2 rounded-full ${color}`} />
      </div>
      <div className="flex shrink-0 flex-grow flex-col items-start gap-[2px]">
        <span className="text-[0.875rem]/[20px] font-normal tracking-sung text-gray-700">{label}</span>
        <span className="self-stretch text-[0.875rem]/[20px] font-semibold tracking-snug">
          {value}
          {unit}
        </span>
      </div>
    </div>
  );
};

export default MealEditNutrientBox;
