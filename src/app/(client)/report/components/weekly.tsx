'use client';

import GlassBackground from '@/components/commons/glass-background';
import MacroNutrientPieChart from '@/components/commons/macronutrient-pie-chart';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Typography } from '@/components/ui/typography';
import { Bar, BarChart, Cell, ReferenceLine, XAxis, YAxis } from 'recharts';

const Weekly = () => {
  return (
    <>
      <GlassBackground className="min-h-full w-full rounded-2xl p-4">
        <Typography as="h2" variant="subTitle1">
          이번 주는 저번 주보다 <br /> 250kcal 덜 먹었어요
        </Typography>
        <ChartContainer config={chartConfig} className="mt-4 min-h-full w-full">
          <BarChart data={data} barSize={32}>
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
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.label === '이번 주' ? '#FFE37E' : '#FFF5CC'} />
              ))}
            </Bar>
            <ReferenceLine
              y={1650}
              stroke="#FFB800"
              strokeDasharray="8 8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </BarChart>
        </ChartContainer>

        <div className="flex flex-col gap-3 rounded-xl bg-white p-4 text-gray-700">
          <div className="flex items-center justify-between">
            <Typography as="span" variant="body3">
              이번 주 평균 섭취 칼로리
            </Typography>
            <div className="space-x-1">
              <Typography as="span" variant="subTitle4" className="text-gray-900">
                1,780
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
                1,650
              </Typography>
              <Typography as="span" variant="body3">
                kcal
              </Typography>
            </div>
          </div>
        </div>
      </GlassBackground>
      <GlassBackground className="min-h-full w-full rounded-2xl p-4">
        <MacroNutrientPieChart data={chartData} />
      </GlassBackground>
    </>
  );
};

export default Weekly;

const data = [
  { label: '~2.23', value: 1600, fill: '#FFF5CC' },
  { label: '~3.2', value: 1200, fill: '#FFF5CC' },
  { label: '~3.9', value: 1300, fill: '#FFF5CC' },
  { label: '~3.16', value: 1700, fill: '#FFF5CC' },
  { label: '~3.23', value: 2000, fill: '#FFF5CC' },
  { label: '~3.30', value: 1800, fill: '#FFF5CC' },
  { label: '이번 주', value: 1780, fill: '#FFE37E' }
];
const chartData = { carbohydrate: 500, protein: 200, fat: 300, calories: 1000 };

const chartConfig = {
  calories: {
    label: '칼로리',
    color: '#FFF5CC'
  }
} as const satisfies ChartConfig;
