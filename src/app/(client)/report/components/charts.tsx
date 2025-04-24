'use client';

import GlassBackground from '@/components/commons/glass-background';
import MacroNutrientPieChart from '@/components/commons/macronutrient-pie-chart';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Typography } from '@/components/ui/typography';
import { Bar, BarChart, Cell, ReferenceLine, XAxis, YAxis } from 'recharts';
import { BarChartDataType, Unit } from '../types/report';
import { useUserStore } from '@/store/user-store';
import { useEffect, useState } from 'react';
import { formatNumberWithComma } from '@/utils/format.util';

const Charts = ({ unit }: { unit: Unit }) => {
  const [barChart, setBarChart] = useState<BarChartDataType[]>([
    {
      label: '',
      value: 0,
      fill: ''
    }
  ]);
  const [total, setTotal] = useState({ calories: 0, carbohydrate: 0, protein: 0, fat: 0 });

  const { id: userId, personalInfo } = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/report', {
        method: 'POST',
        body: JSON.stringify({ userId, unit }),
        headers: { 'Content-Type': 'application/json' }
      });
      const { barChart, total } = await res.json();
      console.log('chart ===> ', barChart);
      console.log('total ===> ', total);
      setBarChart(barChart);
      setTotal(total);
    };

    fetchData();
  }, [unit, userId]);

  return (
    <>
      <GlassBackground className="min-h-full w-full rounded-2xl p-4">
        <Typography as="h2" variant="subTitle1">
          이번 주는 저번 주보다 <br /> 250kcal 덜 먹었어요
        </Typography>
        <ChartContainer config={chartConfig} className="mt-4 min-h-full w-full">
          <BarChart data={barChart} barSize={32}>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              className="typography-caption2"
              tick={{ fill: '#B1B1B1' }}
            />
            <YAxis hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="calories" />} />
            <Bar dataKey="value" radius={[4, 4, 4, 4]}>
              {barChart.map((entry, index) => (
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
              이번 주 평균 섭취 칼로리
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
                {personalInfo ? formatNumberWithComma(personalInfo.dailyCaloriesGoal) : NO_GOAL}
              </Typography>
              <Typography as="span" variant="body3">
                kcal
              </Typography>
            </div>
          </div>
        </div>
      </GlassBackground>
      <GlassBackground className="min-h-full w-full rounded-2xl p-4">
        <MacroNutrientPieChart data={total} />
      </GlassBackground>
    </>
  );
};

export default Charts;

// const data = [
//   { label: '~2.23', value: 1600, fill: '#FFF5CC' },
//   { label: '~3.2', value: 1200, fill: '#FFF5CC' },
//   { label: '~3.9', value: 1300, fill: '#FFF5CC' },
//   { label: '~3.16', value: 1700, fill: '#FFF5CC' },
//   { label: '~3.23', value: 2000, fill: '#FFF5CC' },
//   { label: '~3.30', value: 1800, fill: '#FFF5CC' },
//   { label: '이번 주', value: 1780, fill: '#FFE37E' }
// ];
// const chartData = { carbohydrate: 500, protein: 200, fat: 300, calories: 1000 };

const chartConfig = {
  calories: {
    label: '칼로리',
    color: '#FFF5CC'
  }
} as const satisfies ChartConfig;

const NO_GOAL = '미설정';
