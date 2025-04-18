import { MAX_WEEK } from '@/app/(home)/constants/calendar.constant';
import { formatDateWithDash } from '@/lib/utils/date.util';
import HomeCalendarWeekItem from './home-calendar-week-item';

type HomeCalendarWeekItemProps = {
  weeksInMonth: Date[][];
};
const HomeCalendarMonthItem = ({ weeksInMonth }: HomeCalendarWeekItemProps) => {
  return (
    <div className="flex w-full flex-col gap-3">
      {weeksInMonth.map((week) => (
        <HomeCalendarWeekItem key={formatDateWithDash(week[0])} week={week} />
      ))}
      {Array.from({ length: MAX_WEEK - weeksInMonth.length }, (_, i) => i).map((id) => (
        <div key={id} className="h-10" />
      ))}
    </div>
  );
};
export default HomeCalendarMonthItem;
