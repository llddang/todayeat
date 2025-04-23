import { NextResponse } from 'next/server';
import { getServerClient } from '@/lib/supabase/server';
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

type Unit = 'daily' | 'weekly' | 'monthly';

const getDateRanges = (unit: Unit) => {
  const today = new Date();
  const result = [];

  for (let i = NUBMER_OF_BAR - 1; i >= 0; i--) {
    let base = new Date(today);
    let start: Date;
    let end: Date;
    let label: string;

    if (unit === 'daily') {
      base = subDays(base, i);
      start = startOfDay(base);
      end = endOfDay(base);
      label = format(base, 'M.dd');
    } else if (unit === 'weekly') {
      base = subWeeks(base, i);
      start = startOfWeek(base, { weekStartsOn: 1 });
      end = endOfWeek(base, { weekStartsOn: 1 });
      label = `~${format(end, 'M.dd')}`;
    } else {
      base = subMonths(base, i);
      start = startOfMonth(base);
      end = endOfMonth(base);
      label = format(base, 'yyyy.MM');
    }

    result.push({ start, end, label });
  }

  if (result.length > 0) {
    result[result.length - 1].label = unit === 'daily' ? '오늘' : unit === 'weekly' ? '이번 주' : '이번 달';
  }

  return result;
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
    ranges.map(async ({ start, end, label }, index) => {
      const { data, error } = await supabase
        .from('meals')
        .select('meal_details(calories, carbohydrate, protein, fat)')
        .eq('user_id', userId)
        .gte('ate_at', start.toISOString())
        .lte('ate_at', end.toISOString());

      if (error || !data) {
        console.error('Supabase Error:', error);
        return { label, value: 0, fill: '#FFF5CC' };
      }

      const total = data.reduce(
        (acc, meal) => {
          meal.meal_details.forEach((d) => {
            acc.calories += d.calories ?? 0;
            acc.carbohydrate += d.carbohydrate ?? 0;
            acc.protein += d.protein ?? 0;
            acc.fat += d.fat ?? 0;
          });
          return acc;
        },
        { calories: 0, carbohydrate: 0, protein: 0, fat: 0 }
      );

      // 마지막 구간 (오늘 / 이번 주 / 이번 달)의 총합은 PieChart용
      if (index === ranges.length - 1) {
        macroTotal = total;
      }

      const divisor = unit === 'weekly' ? 7 : unit === 'monthly' ? end.getDate() : 1;

      const value = Math.round(total.calories / divisor);

      return {
        label,
        value,
        fill: label === '이번 주' || label === '오늘' || label === '이번 달' ? '#FFE37E' : '#FFF5CC'
      };
    })
  );

  return NextResponse.json({
    chart: chartData,
    total: macroTotal
  });
};

const NUBMER_OF_BAR = 7;
