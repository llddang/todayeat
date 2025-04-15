import CircleProgressBar from '@/components/commons/circle-progress-bar';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { dateDashFormatter, isSameDate } from '@/lib/utils/date.util';

type HomeCalendarWeekItemProps = {
  weekDate: Date[];
  selectedDate: Date;
  onDateClick: (date: Date) => void;
  meal: { [key in string]: { calories: number; caloriesGoal: number } };
};
const HomeCalendarWeekItem = ({ weekDate, selectedDate, meal, onDateClick }: HomeCalendarWeekItemProps) => {
  return (
    <div className="flex w-full justify-between">
      {weekDate.map((date) => {
        const isSelected = isSameDate(date, selectedDate);
        const { calories, caloriesGoal } = meal[dateDashFormatter(date)] ?? { calories: 0, caloriesGoal: 0 };
        const progress = calories && caloriesGoal ? Math.round((calories / caloriesGoal) * 100) : 0;
        return (
          <div
            key={date.toDateString()}
            className={cn(
              'relative flex h-10 w-10 items-center justify-center',
              isSelected ? 'text-gray-900' : 'text-gray-600'
            )}
            onClick={() => onDateClick(date)}
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
          </div>
        );
      })}
    </div>
  );
};
export default HomeCalendarWeekItem;
