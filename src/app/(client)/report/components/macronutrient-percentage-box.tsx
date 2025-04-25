import { Typography } from '@/components/ui/typography';
import { AMOUNT_CHART_OPTIONS } from '../constants/chart.constant';
import { MacronutrientEnumType } from '@/types/nutrition.type';
import { cn } from '@/lib/shadcn';

const MacronutrientPercentageBox = ({
  variety,
  value,
  goal
}: {
  variety: MacronutrientEnumType;
  value: number;
  goal: number;
}) => {
  const { label, beforeBgColor } = AMOUNT_CHART_OPTIONS[variety];

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
        <div className="flex gap-1">
          <Typography as="span" variant="subTitle2" className="text-gray-900">
            {value}
          </Typography>
          <Typography as="span" variant="body3" className="text-gray-550">
            /
          </Typography>
          <Typography as="span" variant="body1" className="text-gray-550">
            {goal}%
          </Typography>
        </div>
      </div>
    </div>
  );
};
export default MacronutrientPercentageBox;
