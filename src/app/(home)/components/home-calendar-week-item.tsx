import { KeyboardEvent } from 'react';
import CircleProgressBar from '@/components/commons/circle-progress-bar';
import { Typography } from '@/components/ui/typography';
import { useCalendar } from '@/app/(home)/contexts/calendar.context';
import { cn } from '@/lib/utils';
import { formatDateWithDash } from '@/lib/utils/format.util';
import { getPercentage } from '@/lib/utils/nutrition-calculator.util';
import { useDashboard } from '@/app/(home)/contexts/dashboard.context';
import { isSameDate } from '../utils/calendar.util';

type HomeCalendarWeekItemProps = {
  week: Date[];
};
const HomeCalendarWeekItem = ({ week }: HomeCalendarWeekItemProps) => {
  const { selectedDate, setSelectedDate } = useDashboard();
  const { dailyMealCalories, setCurrentDate } = useCalendar();

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
    <div className="flex w-full justify-between">
      {week.map((day) => {
        const isSelected = isSameDate(day, selectedDate);
        const { calories, caloriesGoal } = dailyMealCalories[formatDateWithDash(day)] ?? {
          calories: 0,
          caloriesGoal: 0
        };
        const progress = getPercentage(calories, caloriesGoal);
        return (
          <button
            key={day.toDateString()}
            className={cn(
              'relative flex h-10 w-10 items-center justify-center',
              isSelected ? 'text-gray-900' : 'text-gray-600'
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
