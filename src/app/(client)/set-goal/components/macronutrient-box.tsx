import { Typography } from '@/components/ui/typography';
import { MACRONUTRIENT_OPTIONS } from '@/constants/nutrition.constant';
import { MacronutrientEnumType } from '@/types/nutrition.type';
import { PersonalMacronutrientData } from './step-calculate';

type MacronutrientBoxProps = {
  label: MacronutrientEnumType;
  data: PersonalMacronutrientData;
};

const MacronutrientBox = ({ label, data }: MacronutrientBoxProps) => {
  const barColor = MACRONUTRIENT_OPTIONS[label].color || 'bg-gray-300';
  return (
    <div className="flex flex-1 flex-col gap-1.5 rounded-2xl bg-white p-4">
      <Typography as="span" variant="body3" className="text-gray-600">
        {MACRONUTRIENT_OPTIONS[label].label}
      </Typography>
      <div className="flex items-center gap-[0.12rem] text-nowrap">
        <Typography as="span" variant="subTitle2">
          {data.grams}g
        </Typography>
        <Typography as="span" variant="body3" className="text-gray-500">
          /
        </Typography>
        <Typography as="span" variant="body3" className="text-gray-500">
          {data.percentage}%
        </Typography>
      </div>

      <div className="my-1.5 h-2.5 w-full overflow-hidden rounded-md bg-gray-200">
        <div className={`h-full rounded-md ${barColor}`} style={{ width: `${data.percentage}%` }} />
      </div>
    </div>
  );
};

export default MacronutrientBox;
