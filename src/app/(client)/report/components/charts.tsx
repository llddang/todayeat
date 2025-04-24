'use client';

import { useEffect, useState } from 'react';
import GlassBackground from '@/components/commons/glass-background';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Typography } from '@/components/ui/typography';
import { BarChartDataType, PeriodUnit, PeriodUnitEnum } from '../types/chart.type';
import { useUserStore } from '@/store/user-store';
import { formatNumberWithComma } from '@/utils/format.util';
import { PERIOD_UNIT_TEXT } from '../constants/unit.constant';
import { Bar, BarChart, Cell, ReferenceLine, XAxis, YAxis } from 'recharts';
import { cn } from '@/lib/shadcn';
import { fetchReport } from '../apis/fetch-report.api';
import MacronutrientPercentageReport from './macronutrient-percentage-report';
import { MealNutrition } from '@/types/nutrition.type';

const Charts = ({ unit }: { unit: PeriodUnit }) => {
  const [barChart, setBarChart] = useState<BarChartDataType[]>([
    {
      label: '',
      value: 0,
      fill: ''
    }
  ]);
  const [total, setTotal] = useState<MealNutrition>({ calories: 0, carbohydrate: 0, protein: 0, fat: 0 });

  const { id: userId, personalInfo } = useUserStore((state) => state.user);

  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      try {
        const { barChart, total } = await fetchReport(userId, unit);
        setBarChart(barChart);
        setTotal(total);
      } catch (error) {
        console.error('리포트 불러오기 실패:', error);
      }
    };

    fetchData();
  }, [unit, userId]);

  const current = barChart[barChart.length - 1]?.value ?? 0;
  const previous = barChart[barChart.length - 2]?.value ?? 0;

  const diff = current - previous;
  const isMore = diff > 0;
  const absDiff = Math.abs(diff);

  return (
    <>
      <GlassBackground className="mb-4 min-h-full w-full rounded-2xl p-4">
        <Typography as="h2" variant="subTitle1">
          {PERIOD_UNIT_TEXT[unit].current}
          {PERIOD_UNIT_TEXT[unit].postposition} {PERIOD_UNIT_TEXT[unit].previous}보다 <br /> {absDiff}kcal{' '}
          {isMore ? '더' : '덜'} 먹었어요
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
                    y={y + 12} // 위치 보정
                    textAnchor="middle"
                    className={cn('typography-caption2', isCurrent ? '!fill-gray-900' : '!fill-gray-500')}
                  >
                    {payload.value}
                  </text>
                );
              }}
            />
            <YAxis hide domain={[0, Math.max(personalInfo?.dailyCaloriesGoal ?? 0, ...barChart.map((d) => d.value))]} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="calories" />} />
            <Bar dataKey="value" radius={[4, 4, 4, 4]}>
              {barChart.map((_, index) => (
                <Cell key={`cell-${index}`} fill={barChart.length - 1 === index ? '#FFE37E' : '#FFF5CC'} />
              ))}
            </Bar>
            {personalInfo && (
              <ReferenceLine
                y={personalInfo.dailyCaloriesGoal}
                stroke="#FFB800"
                strokeDasharray="8 8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </BarChart>
        </ChartContainer>

        <div className="flex flex-col gap-3 rounded-xl bg-white p-4 text-gray-700">
          <div className="flex items-center justify-between">
            <Typography as="span" variant="body3">
              {PERIOD_UNIT_TEXT[unit].current} {unit !== PeriodUnitEnum.DAILY && '평균'} 섭취 칼로리
            </Typography>
            <div className="space-x-1">
              <Typography as="span" variant="subTitle4" className="text-gray-900">
                {formatNumberWithComma(barChart[barChart.length - 1].value)}
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
      </GlassBackground>
      <GlassBackground className="min-h-full w-full rounded-2xl p-4">
        <MacronutrientPercentageReport unit={unit} total={total} personalInfo={personalInfo} />
      </GlassBackground>
    </>
  );
};

export default Charts;

const chartConfig = {
  calories: {
    label: '칼로리',
    color: '#FFF5CC'
  }
} as const satisfies ChartConfig;
