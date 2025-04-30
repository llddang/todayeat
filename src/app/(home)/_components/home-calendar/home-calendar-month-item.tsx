'use client';

import { MAX_WEEK } from '@/app/(home)/_constants/calendar.constant';
import { formatDateWithDash } from '@/utils/format.util';
import HomeCalendarWeekItem from './home-calendar-week-item';
import { DailyMealCalories } from '@/types/nutrition.type';
import { Day } from '../../_types/calendar.type';

type HomeCalendarWeekItemProps = {
  month: Day[][];
  selectedDate: Date;
  dailyMealCalories: DailyMealCalories;
  dailyCaloriesGoal: number;
};
const HomeCalendarMonthItem = ({
  selectedDate,
  month,
  dailyMealCalories,
  dailyCaloriesGoal
}: HomeCalendarWeekItemProps) => {
  return (
    <div className="flex w-full flex-col gap-3">
      {month.map((week) => (
        <HomeCalendarWeekItem
          key={formatDateWithDash(week[0].day)}
          selectedDate={selectedDate}
          week={week}
          dailyMealCalories={dailyMealCalories}
          dailyCaloriesGoal={dailyCaloriesGoal}
        />
      ))}
      {Array.from({ length: MAX_WEEK - month.length }, (_, i) => i).map((id) => (
        <div key={id} className="h-10" />
      ))}
    </div>
  );
};
export default HomeCalendarMonthItem;
