import { useEffect, useState } from 'react';
import { BarChartDataType, PeriodUnit } from '../types/chart.type';
import { MealNutrition } from '@/types/nutrition.type';
import { fetchReport } from '../apis/fetch-report.api';
import { INITIAL_NUTRITION_VALUE } from '../constants/chart.constant';

export const useFetchReport = (userId: string | null, unit: PeriodUnit) => {
  const [barChart, setBarChart] = useState<BarChartDataType[]>([]);
  const [total, setTotal] = useState<MealNutrition>(INITIAL_NUTRITION_VALUE);
  const [average, setAverage] = useState<MealNutrition>(INITIAL_NUTRITION_VALUE);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const { barChart, total, average } = await fetchReport(userId, unit);
        setBarChart(barChart);
        setTotal(total);
        setAverage(average);
      } catch (err) {
        setError(err as Error);
      }
    };

    fetchData();
  }, [userId, unit]);

  const isLoading = total.calories < 0;

  return { barChart, total, average, isLoading, error };
};
