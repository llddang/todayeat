import { KeyboardEvent } from 'react';
import CircleProgressBar from '@/components/commons/circle-progress-bar';
import { Typography } from '@/components/ui/typography';
import { useCalendar } from '@/lib/contexts/calendar.context';
import { cn } from '@/lib/utils';
import { formatDateWithDash, isSameDate } from '@/lib/utils/date.util';

type HomeCalendarWeekItemProps = {
  week: Date[];
  onDateClick: (date: Date) => void;
};
const HomeCalendarWeekItem = ({ week, onDateClick }: HomeCalendarWeekItemProps) => {
  const { selectedDate, dailyMealCalories } = useCalendar();

  const handleDatePressed = (e: KeyboardEvent<HTMLButtonElement>, date: Date) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;

    e.preventDefault();
    onDateClick(date);
  };

  return (
    <div className="flex w-full justify-between">
      {week.map((day) => {
        const isSelected = isSameDate(day, selectedDate);
        const { calories, caloriesGoal } = dailyMealCalories[formatDateWithDash(day)] ?? {
          calories: 0,
          caloriesGoal: 0
        };
        const progress = calories && caloriesGoal ? Math.round((calories / caloriesGoal) * 100) : 0;
        return (
          <button
            key={day.toDateString()}
            className={cn(
              'relative flex h-10 w-10 items-center justify-center',
              isSelected ? 'text-gray-900' : 'text-gray-600'
            )}
            onClick={() => onDateClick(day)}
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
