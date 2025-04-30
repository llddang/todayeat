import { Typography } from '@/components/ui/typography';
import { AmountBarChartType, PeriodUnit } from '../_types/chart.type';
import { PERIOD_UNIT_TEXT } from '../_constants/unit.constant';
import { AMOUNT_CHART_OPTIONS } from '../_constants/chart.constant';
import { cn } from '@/lib/shadcn';

type MacronutrientAmountBoxProps = {
  unit: PeriodUnit;
  variety: AmountBarChartType;
  value: number;
  isLoading?: boolean;
};

const MacronutrientAmountBox = ({ unit, variety, value, isLoading }: MacronutrientAmountBoxProps) => {
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
        <Typography as="span" variant="subTitle4" className="text-gray-900 xl:typography-subTitle2">
          {!isLoading ? value : '- '}g
        </Typography>
      </div>
    </div>
  );
};
export default MacronutrientAmountBox;
