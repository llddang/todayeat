'use client';

import GlassBackground from '@/components/commons/glass-background';
import { Typography } from '@/components/ui/typography';
import { Bar, BarChart, Cell, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const Weekly = () => {
  return (
    <GlassBackground className="min-h-full w-full rounded-2xl p-4">
      <Typography as="h2" variant="subTitle1">
        이번 주는 저번 주보다 <br /> 250kcal 덜 먹었어요
      </Typography>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={32}>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              className="typography-caption2"
              tick={{ fill: '#B1B1B1' }}
            />
            <YAxis hide />
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
        </ResponsiveContainer>
      </div>

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
  );
};

export default Weekly;

const data = [
  { label: '~2.23', value: 1600 },
  { label: '~3.2', value: 1200 },
  { label: '~3.9', value: 1300 },
  { label: '~3.16', value: 1700 },
  { label: '~3.23', value: 2000 },
  { label: '~3.30', value: 1800 },
  { label: '이번 주', value: 1780 }
];
