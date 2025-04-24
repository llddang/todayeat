import { NextResponse } from 'next/server';
import { getServerClient } from '@/lib/supabase/server';
import { BarChartDataType, Unit, UnitEnum } from '@/app/(client)/report/types/report.type';
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
import { snakeToCamelObject } from '@/utils/camelize.util';
import { UNIT_TEXT } from '@/app/(client)/report/constants/unit.constant';

const getDateRanges = (unit: Unit) => {
  const today = new Date();
  const result = [];

  for (let i = NUBMER_OF_BAR - 1; i >= 0; i--) {
    let base = new Date(today);
    let start: Date;
    let end: Date;
    let label: string;

    switch (unit) {
      case UnitEnum.DAILY: {
        base = subDays(base, i);
        start = startOfDay(base);
        end = endOfDay(base);
        label = format(base, 'M.dd');
        break;
      }
      case UnitEnum.WEEKLY: {
        base = subWeeks(base, i);
        start = startOfWeek(base, { weekStartsOn: 1 });
        end = endOfWeek(base, { weekStartsOn: 1 });
        label = `~${format(end, 'M.dd')}`;
        break;
      }
      case UnitEnum.MONTHLY: {
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
    result[result.length - 1].label = UNIT_TEXT[unit].current;
  }

  return result;
};

const isCurrentLabel = (unit: Unit, label: string): boolean => {
  switch (unit) {
    case UnitEnum.DAILY:
      return label === UNIT_TEXT[UnitEnum.DAILY].current;
    case UnitEnum.WEEKLY:
      return label === UNIT_TEXT[UnitEnum.WEEKLY].current;
    case UnitEnum.MONTHLY:
      return label === UNIT_TEXT[UnitEnum.MONTHLY].current;
    default:
      return false;
  }
};

export const POST = async (req: Request) => {
  const supabase = getServerClient();
  const { userId, unit }: { userId: string; unit: Unit } = await req.json();

  if (!userId || !unit) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const ranges = getDateRanges(unit);

  let macroTotal = {
    calories: 0,
    carbohydrate: 0,
    protein: 0,
    fat: 0
  };

  const chartData = await Promise.all(
    ranges.map(async ({ start, end, label }, index): Promise<BarChartDataType> => {
      const { data, error } = await supabase
        .from('meals')
        .select('*, meal_details(*)')
        .eq('user_id', userId)
        .gte('ate_at', start.toISOString())
        .lte('ate_at', end.toISOString());

      if (error || !data) {
        console.error('Supabase Error:', error);
        return { label, value: 0, fill: '#FFF5CC' };
      }

      const { calories: value } = calculateNutritionAverage(snakeToCamelObject(data));

      if (index === ranges.length - 1) {
        macroTotal = calculateTotalNutrition(snakeToCamelObject(data));
      }

      return {
        label,
        value,
        fill: isCurrentLabel(unit, label) ? '#FFE37E' : '#FFF5CC'
      };
    })
  );

  return NextResponse.json({
    barChart: chartData,
    total: macroTotal
  });
};

const NUBMER_OF_BAR = 7;
