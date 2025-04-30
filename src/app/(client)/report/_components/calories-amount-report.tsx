import { Typography } from '@/components/ui/typography';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PERIOD_UNIT_TEXT } from '../_constants/unit.constant';
import { Bar, BarChart, Cell, ReferenceLine, XAxis, YAxis } from 'recharts';
import { calculateDiffCalories, makePeriodMessage } from '../_utils/nutrition-diff.util';
import { formatNumberWithComma } from '@/utils/format.util';
import { BarChartDataType, PeriodUnit, PeriodUnitEnum } from '../_types/chart.type';
import { MealNutrition } from '@/types/nutrition.type';
import { UserPersonalInfoDTO } from '@/types/DTO/user.dto';
import BarChartSkeleton from './bar-chart-skeleton';
import { cn } from '@/lib/shadcn';

type CaloriesAmountReportProps = {
  total: MealNutrition;
  unit: PeriodUnit;
  barChart: BarChartDataType[];
  personalInfo: UserPersonalInfoDTO | null;
  isLoading: boolean;
};

const CaloriesAmountReport = ({ total, unit, barChart, personalInfo, isLoading }: CaloriesAmountReportProps) => {
  const { isMore, absDiff } = calculateDiffCalories(barChart);
  const periodMessage = makePeriodMessage(unit);
  return (
    <div>
      {isLoading ? (
        <BarChartSkeleton />
      ) : (
        <>
          <Typography as="h2" variant="subTitle1">
            {total.calories ? (
              <>
                {periodMessage}
                <br />
                {formatNumberWithComma(absDiff)}kcal {isMore ? '더' : '덜'} 먹었어요
              </>
            ) : (
              <>
                식사를 기록하면
                <br />
                섭취량을 분석할 수 있어요
              </>
            )}
          </Typography>
          <ChartContainer config={chartConfig} className="mt-4 min-h-full w-full">
            <BarChart data={barChart} barSize={32}>
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                interval={0}
                tick={({ x, y, payload }) => {
                  const isCurrent = PERIOD_UNIT_TEXT[unit].current === payload.value;
                  return (
                    <text
                      x={x}
                      y={y + 12} 
                      textAnchor="middle"
                      className={cn(
                        isCurrent ? '!fill-gray-900 typography-caption3' : '!fill-gray-500 typography-caption2'
                      )}
                    >
                      {payload.value}
                    </text>
                  );
                }}
              />
              <YAxis
                hide
                domain={[0, Math.max(personalInfo?.dailyCaloriesGoal ?? 0, ...barChart.map((d) => d.value))]}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="calories" />} />
              <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                {barChart.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={barChart.length - 1 === index ? 'var(--bar-current)' : 'var(--bar-previous)'}
                  />
                ))}
              </Bar>
              {personalInfo && (
                <ReferenceLine
                  y={personalInfo.dailyCaloriesGoal}
                  stroke="var(--reference-line)"
                  strokeDasharray="8 8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </BarChart>
          </ChartContainer>
        </>
      )}

      <div className="flex flex-col gap-3 rounded-xl bg-white p-4 text-gray-700">
        <div className="flex items-center justify-between">
          <Typography as="span" variant="body3">
            {PERIOD_UNIT_TEXT[unit].current} {unit !== PeriodUnitEnum.DAILY && '평균'} 섭취 칼로리
          </Typography>
          <div className="space-x-1">
            <Typography as="span" variant="subTitle4" className="text-gray-900">
              {!isLoading ? formatNumberWithComma(barChart.at(-1)?.value ?? '0') : '-'}
            </Typography>
            <Typography as="span" variant="body3">
              kcal
            </Typography>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Typography as="span" variant="body3">
            1일 목표 칼로리
          </Typography>
          <div className="space-x-1">
            <Typography as="span" variant="subTitle4" className="text-gray-900">
              {personalInfo ? formatNumberWithComma(personalInfo.dailyCaloriesGoal) : 0}
            </Typography>
            <Typography as="span" variant="body3">
              kcal
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaloriesAmountReport;

const chartConfig = {
  calories: {
    label: '칼로리'
  }
} as const satisfies ChartConfig;
