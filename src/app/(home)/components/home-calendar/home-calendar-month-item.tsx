'use client';

import { MAX_WEEK } from '@/app/(home)/constants/calendar.constant';
import { formatDateWithDash } from '@/utils/format.util';
import HomeCalendarWeekItem from './home-calendar-week-item';
import { DailyMealCalories } from '@/types/nutrition.type';
import { Month } from '../../types/calendar.type';

type HomeCalendarWeekItemProps = {
  month: Month;
  selectedDate: Date;
  dailyMealCalories: DailyMealCalories;
};
const HomeCalendarMonthItem = ({ selectedDate, month, dailyMealCalories }: HomeCalendarWeekItemProps) => {
  return (
    <div className="flex w-full flex-col gap-3">
      {month.map((week) => (
        <HomeCalendarWeekItem
          key={formatDateWithDash(week[0])}
          selectedDate={selectedDate}
          week={week}
          dailyMealCalories={dailyMealCalories}
        />
      ))}
      {Array.from({ length: MAX_WEEK - month.length }, (_, i) => i).map((id) => (
        <div key={id} className="h-10" />
      ))}
    </div>
  );
};
export default HomeCalendarMonthItem;
