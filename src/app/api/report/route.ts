import { NextResponse } from 'next/server';
import { BarChartDataType, PeriodUnit, PeriodUnitEnum } from '@/app/(client)/report/_types/chart.type';
import {
  subWeeks,
  subDays,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  format
} from 'date-fns';
import { calculateNutritionAverage, calculateTotalNutrition } from '@/utils/nutrition-calculator.util';
import { PERIOD_UNIT_TEXT } from '@/app/(client)/report/_constants/unit.constant';
import { getAllMyMealsByPeriod } from '@/apis/meal.api';
import { MealNutrition } from '@/types/nutrition.type';
import { INITIAL_NUTRITION_VALUE } from '@/app/(client)/report/_constants/chart.constant';

const getDateRanges = (unit: PeriodUnit) => {
  const today = new Date();
  const result = [];

  for (let i = NUBMER_OF_BAR - 1; i >= 0; i--) {
    let base = new Date(today);
    let start: Date;
    let end: Date;
    let label: string;

    switch (unit) {
      case PeriodUnitEnum.DAILY: {
        base = subDays(base, i);
        start = startOfDay(base);
        end = endOfDay(base);
        label = format(base, 'M.dd');
        break;
      }
      case PeriodUnitEnum.WEEKLY: {
        base = subWeeks(base, i);
        start = startOfWeek(base, { weekStartsOn: 1 });
        end = endOfWeek(base, { weekStartsOn: 1 });
        label = `~${format(end, 'M.dd')}`;
        break;
      }
      case PeriodUnitEnum.MONTHLY: {
        base = subMonths(base, i);
        start = startOfMonth(base);
        end = endOfMonth(base);
        label = format(base, 'yy.MM');
        break;
      }
    }

    result.push({ start, end, label });
  }

  if (result.length > 0) {
    result[result.length - 1].label = PERIOD_UNIT_TEXT[unit].current;
  }

  return result;
};

const isCurrentLabel = (unit: PeriodUnit, label: string): boolean => {
  switch (unit) {
    case PeriodUnitEnum.DAILY:
      return label === PERIOD_UNIT_TEXT[PeriodUnitEnum.DAILY].current;
    case PeriodUnitEnum.WEEKLY:
      return label === PERIOD_UNIT_TEXT[PeriodUnitEnum.WEEKLY].current;
    case PeriodUnitEnum.MONTHLY:
      return label === PERIOD_UNIT_TEXT[PeriodUnitEnum.MONTHLY].current;
    default:
      return false;
  }
};

export const POST = async (req: Request) => {
  const { userId, unit }: { userId: string; unit: PeriodUnit } = await req.json();

  if (!userId || !unit) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const ranges = getDateRanges(unit);

  let macroTotal: MealNutrition = INITIAL_NUTRITION_VALUE;
  let macroAverage: MealNutrition = INITIAL_NUTRITION_VALUE;

  const chartData = await Promise.all(
    ranges.map(async ({ start, end, label }, index): Promise<BarChartDataType> => {
      try {
        const meals = await getAllMyMealsByPeriod(start, end);

        const { calories: value } = calculateNutritionAverage(meals);

        if (index === ranges.length - 1) {
          macroTotal = calculateTotalNutrition(meals);
          macroAverage = calculateNutritionAverage(meals);
        }

        return {
          label,
          value,
          fill: isCurrentLabel(unit, label) ? 'var(--bar-current)' : 'var(--bar-previous)'
        };
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
        return { label, value: 0, fill: 'var(--bar-previous)' };
      }
    })
  );

  return NextResponse.json({
    barChart: chartData,
    total: macroTotal,
    average: macroAverage
  });
};

const NUBMER_OF_BAR = 7;
