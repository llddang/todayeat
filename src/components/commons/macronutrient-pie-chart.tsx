'use client';

import { Pie, PieChart, Cell } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { MealDetailDTO } from '@/types/DTO/meal.dto';
import { MealNutritionType } from '@/types/nutrition.type';
import { Typography } from '../ui/typography';
import { formatNumberWithComma } from '@/utils/format.util';

const chartConfig = {
  carbohydrate: {
    label: '탄수화물',
    color: 'var(--carbohydrate)'
  },
  protein: {
    label: '단백질',
    color: 'var(--protein)'
  },
  fat: {
    label: '지방',
    color: 'var(--fat)'
  }
} as const satisfies ChartConfig;

type MacroNutrientPieChartProps = {
  data: MacronutrientData;
  displayCalories?: boolean;
};

const MacroNutrientPieChart = ({ data, displayCalories = false }: MacroNutrientPieChartProps) => {
  const chartData: ChartData[] = Object.entries(data)
    .filter(([key]) => key !== 'calories')
    .map(([key, value]) => ({
      macronutrient: key as MacronutrientLabel,
      amount: value
    }));

  return (
    <div className="relative w-fit">
      <ChartContainer config={chartConfig} className="aspect-square h-60">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey="amount"
            nameKey="macronutrient"
            innerRadius={64}
            startAngle={90}
            endAngle={450}
          >
            {chartData.map((entry: ChartData) => {
              const macronutrient = entry.macronutrient;
              return <Cell key={macronutrient} fill={chartConfig[macronutrient].color} />;
            })}
          </Pie>
        </PieChart>
      </ChartContainer>
      {displayCalories && (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <Typography variant="title2" as="span">
            {formatNumberWithComma(data.calories)}
          </Typography>
          <Typography variant="body2" className="text-gray-550" as="span">
            kcal
          </Typography>
        </div>
      )}
    </div>
  );
};

type MacronutrientData = Pick<MealDetailDTO, 'carbohydrate' | 'protein' | 'fat' | 'calories'>;
type MacronutrientLabel = Exclude<MealNutritionType, 'calories'>;
type ChartData = {
  macronutrient: MacronutrientLabel;
  amount: number;
};

export default MacroNutrientPieChart;
