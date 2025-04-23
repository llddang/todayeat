import { Typography } from '@/components/ui/typography';
import { MACRONUTRIENT_OPTIONS } from '@/constants/nutrition.constant';
import { cn } from '@/lib/shadcn';
import { MacronutrientEnumType } from '@/types/nutrition.type';

const MacronutrientBox = ({ variety, value }: { variety: MacronutrientEnumType; value: number }) => {
  const { label, beforeBgColor } = MACRONUTRIENT_OPTIONS[variety];

  return (
    <div className="flex flex-1 gap-1.5">
      <div
        className={cn(
          'flex h-5 items-center justify-center',
          'before:h-2 before:w-2 before:rounded-full',
          beforeBgColor
        )}
      />
      <div className="flex flex-1 flex-col items-start gap-0.5">
        <Typography as="span" variant="body3" className="text-gray-700">
          {label}
        </Typography>
        <Typography as="span" variant="subTitle4" className="text-gray-900">
          {value}g
        </Typography>
      </div>
    </div>
  );
};
export default MacronutrientBox;
