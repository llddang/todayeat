import HomeCalendarWeekItem from '@/components/_home/home-calendar-week-item';
import { formatDateWithDash } from '@/lib/utils/date.util';

type HomeCalendarWeekItemProps = {
  weeksInMonth: Date[][];
  onDateClick: (date: Date) => void;
};
const HomeCalendarMonthItem = ({ weeksInMonth, onDateClick }: HomeCalendarWeekItemProps) => {
  return (
    <div className="flex w-full flex-col gap-3">
      {weeksInMonth.map((week) => (
        <HomeCalendarWeekItem key={formatDateWithDash(week[0])} week={week} onDateClick={onDateClick} />
      ))}
      {Array.from({ length: 6 - weeksInMonth.length }, (_, i) => i).map((id) => (
        <div key={id} className="h-10" />
      ))}
    </div>
  );
};
export default HomeCalendarMonthItem;
