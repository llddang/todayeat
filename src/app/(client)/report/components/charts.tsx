'use client';

import { useEffect, useState } from 'react';
import GlassBackground from '@/components/commons/glass-background';
import { BarChartDataType, PeriodUnit } from '../types/chart.type';
import { MealNutrition } from '@/types/nutrition.type';
import { useUserStore } from '@/store/user-store';
import { fetchReport } from '../apis/fetch-report.api';
import MacronutrientPercentageReport from './macronutrient-percentage-report';
import MacronutrientAmountReport from './macronutrient-amount-report';
import CaloriesAmountReport from './calories-amount-report';
import { INITIAL_NUTRITION_VALUE } from '../constants/chart.constant';

const Charts = ({ unit }: { unit: PeriodUnit }) => {
  const [barChart, setBarChart] = useState<BarChartDataType[]>([
    {
      label: '',
      value: 0,
      fill: ''
    }
  ]);
  const [total, setTotal] = useState<MealNutrition>(INITIAL_NUTRITION_VALUE);
  const [average, setAverage] = useState<MealNutrition>(INITIAL_NUTRITION_VALUE);
  const [isLoading, setIsLoading] = useState(true);

  const { id: userId, personalInfo } = useUserStore((state) => state.user);

  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      try {
        const { barChart, total, average } = await fetchReport(userId, unit);
        setBarChart(barChart);
        setTotal(total);
        setAverage(average);
      } catch (error) {
        console.error('리포트 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [unit, userId]);

  return (
    <div className="xl:flex xl:gap-4 xl:px-[3.12rem]">
      <GlassBackground className="mb-4 min-h-full w-full rounded-2xl p-4 xl:w-[25rem] xl:self-start">
        <CaloriesAmountReport
          total={total}
          unit={unit}
          barChart={barChart}
          personalInfo={personalInfo}
          isLoading={isLoading}
        />
      </GlassBackground>
      <GlassBackground className="flex min-h-full w-full flex-col gap-4 rounded-2xl p-4 xl:flex-1 xl:flex-row">
        <MacronutrientPercentageReport
          unit={unit}
          total={total}
          average={average}
          personalInfo={personalInfo}
          isLoading={isLoading}
        />
        <div className="flex flex-1 flex-col gap-2">
          <MacronutrientAmountReport
            unit={unit}
            variety="CARBOHYDRATE"
            average={average}
            personalInfo={personalInfo}
            isLoading={isLoading}
          />
          <MacronutrientAmountReport
            unit={unit}
            variety="PROTEIN"
            average={average}
            personalInfo={personalInfo}
            isLoading={isLoading}
          />
          <MacronutrientAmountReport
            unit={unit}
            variety="FAT"
            average={average}
            personalInfo={personalInfo}
            isLoading={isLoading}
          />
        </div>
      </GlassBackground>
    </div>
  );
};

export default Charts;
