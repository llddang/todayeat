import { Typography } from '@/components/ui/typography';
import { AmountBarChartType, PeriodUnit } from '../types/chart.type';
import { PERIOD_UNIT_TEXT } from '../constants/unit.constant';
import { AMOUNT_CHART_OPTIONS } from '../constants/chart.constant';
import { cn } from '@/lib/shadcn';

const MacronutrientAmountBox = ({
  unit,
  variety,
  value
}: {
  unit: PeriodUnit;
  variety: AmountBarChartType;
  value: number;
}) => {
  const { beforeBgColor } = AMOUNT_CHART_OPTIONS[variety];

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
          {variety === 'GOAL'
            ? '1일 목표량'
            : unit === 'DAILY'
              ? `${PERIOD_UNIT_TEXT[unit].current} 섭취량`
              : `${PERIOD_UNIT_TEXT[unit].current} 평균 섭취량`}
        </Typography>
        <Typography as="span" variant="subTitle4" className="text-gray-900">
          {value}g
        </Typography>
      </div>
    </div>
  );
};
export default MacronutrientAmountBox;
