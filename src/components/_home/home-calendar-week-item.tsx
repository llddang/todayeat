import { KeyboardEvent } from 'react';
import CircleProgressBar from '@/components/commons/circle-progress-bar';
import { Typography } from '@/components/ui/typography';
import { useCalendar } from '@/lib/contexts/calendar.context';
import { cn } from '@/lib/utils';
import { formatDateWithDash, isSameDate } from '@/lib/utils/date.util';

type HomeCalendarWeekItemProps = {
  weeks: Date[];
  selectedDate: Date;
  onDateClick: (date: Date) => void;
};
const HomeCalendarWeekItem = ({ weeks, selectedDate, onDateClick }: HomeCalendarWeekItemProps) => {
  const { dailyMealCalories } = useCalendar();

  const handleDatePressed = (e: KeyboardEvent<HTMLButtonElement>, date: Date) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;

    e.preventDefault();
    onDateClick(date);
  };

  return (
    <div className="flex w-full justify-between">
      {weeks.map((date) => {
        const isSelected = isSameDate(date, selectedDate);
        const { calories, caloriesGoal } = dailyMealCalories[formatDateWithDash(date)] ?? {
          calories: 0,
          caloriesGoal: 0
        };
        const progress = calories && caloriesGoal ? Math.round((calories / caloriesGoal) * 100) : 0;
        return (
          <button
            key={date.toDateString()}
            className={cn(
              'relative flex h-10 w-10 items-center justify-center',
              isSelected ? 'text-gray-900' : 'text-gray-600'
            )}
            onClick={() => onDateClick(date)}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}
            onKeyDown={(e) => handleDatePressed(e, date)}
          >
            <Typography variant={isSelected ? 'subTitle3' : 'body2'} className="!leading-none">
              {date.getDate()}
            </Typography>
            {isSelected && (
              <div className="border-box absolute -z-10 h-[calc(2.5rem-3px)] w-[calc(2.5rem-3px)] rounded-full bg-white" />
            )}
            <CircleProgressBar
              progress={progress > 100 ? 100 : progress}
              size={40}
              strokeWidth={3}
              className="absolute -z-10 h-10 w-10"
            />
          </button>
        );
      })}
    </div>
  );
};
export default HomeCalendarWeekItem;
