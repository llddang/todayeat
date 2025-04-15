import { Typography } from '@/components/ui/typography';
import { MACRONUTRIENT_OPTIONS } from '@/constants/nutrition.constant';
import { NutritionEnumType } from '@/types/nutrition.type';

type MealEditNutrientBoxProps = {
  variety: NutritionEnumType;
  value: number;
};

const MealEditNutrientBox = ({ variety, value }: MealEditNutrientBoxProps) => {
  const { label, unit, color } = MACRONUTRIENT_OPTIONS[variety];
  return (
    <div className="flex flex-1 items-start gap-1.5">
      <div className="flex h-5 items-center justify-center">
        <div className={`aspect-square h-2 w-2 rounded-full ${color}`} />
      </div>
      <div className="flex flex-1 flex-col items-start gap-1.5">
        <Typography as="span" variant="body3" className="text-gray-700">
          {label}
        </Typography>
        <Typography as="span" variant="subTitle4" className="text-gray-900">
          {value}
          {unit}
        </Typography>
      </div>
    </div>
  );
};

export default MealEditNutrientBox;
