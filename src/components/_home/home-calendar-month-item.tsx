import HomeCalendarWeekItem from '@/components/_home/home-calendar-week-item';

type HomeCalendarWeekItemProps = {
  month: Date[][];
  onDateClick: (date: Date) => void;
};
const HomeCalendarMonthItem = ({ month, onDateClick }: HomeCalendarWeekItemProps) => {
  return (
    <div className="flex w-full flex-col gap-3">
      {month.map((week) => (
        <HomeCalendarWeekItem week={week} onDateClick={onDateClick} />
      ))}
      {Array.from({ length: 6 - month.length }, (_, i) => i).map((id) => (
        <div key={id} className="h-10" />
      ))}
    </div>
  );
};
export default HomeCalendarMonthItem;
