'use client';
import { KeyboardEvent } from 'react';
import CircleProgressBar from '@/components/commons/circle-progress-bar';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/shadcn';
import { formatDateWithDash } from '@/utils/format.util';
import { getPercentage } from '@/utils/nutrition-calculator.util';
import { useDateContext } from '@/app/(home)/contexts/date.context';
import { isSameDate } from '@/app/(home)/utils/calendar.util';
import { DailyMealCalories } from '@/types/nutrition.type';
import { Day } from '../../types/calendar.type';

type HomeCalendarWeekItemProps = {
  selectedDate: Date;
  week: Day[];
  dailyMealCalories: DailyMealCalories;
  dailyCaloriesGoal: number;
};
const HomeCalendarWeekItem = ({
  selectedDate,
  week,
  dailyMealCalories,
  dailyCaloriesGoal
}: HomeCalendarWeekItemProps) => {
  const { setSelectedDate, setCurrentDate } = useDateContext();

  const handleDateClick = (newSelectedDate: Date): void => {
    if (isSameDate(newSelectedDate, selectedDate)) return;
    setSelectedDate(new Date(newSelectedDate));
    setCurrentDate(new Date(newSelectedDate));
  };

  const handleDatePressed = (e: KeyboardEvent<HTMLButtonElement>, date: Date) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;

    e.preventDefault();
    handleDateClick(date);
  };

  return (
    <div className="flex w-full justify-between xl:justify-stretch xl:gap-3">
      {week.map(({ day, dayOutside }) => {
        const isSelected = isSameDate(day, selectedDate);
        const calories = dailyMealCalories[formatDateWithDash(day)] ?? 0;
        const progress = getPercentage(calories, dailyCaloriesGoal);
        return (
          <button
            key={formatDateWithDash(day)}
            className={cn(
              'relative flex h-10 w-10 items-center justify-center',
              isSelected ? 'text-gray-900' : 'text-gray-600',
              dayOutside && 'opacity-40'
            )}
            onClick={() => handleDateClick(day)}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            aria-label={`${day.getFullYear()}년 ${day.getMonth() + 1}월 ${day.getDate()}일`}
            onKeyDown={(e) => handleDatePressed(e, day)}
          >
            <Typography variant={isSelected ? 'subTitle3' : 'body2'} className="!leading-none">
              {day.getDate()}
            </Typography>
            {isSelected && (
              <div className="border-box absolute -z-10 h-[calc(2.5rem-3px)] w-[calc(2.5rem-3px)] rounded-full bg-white" />
            )}
            {progress > 100 ? (
              <CircleProgressBar size={40} strokeWidth={3} color="#FA7B6A" className="absolute -z-10 h-10 w-10" />
            ) : (
              <CircleProgressBar progress={progress} size={40} strokeWidth={3} className="absolute -z-10 h-10 w-10" />
            )}
          </button>
        );
      })}
    </div>
  );
};
export default HomeCalendarWeekItem;
