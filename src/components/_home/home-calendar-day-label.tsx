import { Typography } from '@/components/ui/typography';
import { DAY_LABELS } from '@/constants/calendar.constant';

const HomeCalendarDayLabel = () => {
  return (
    <div className="flex justify-between">
      {DAY_LABELS.map((dayLabel) => (
        <Typography as="span" key={dayLabel} variant="body4" className="w-10 text-center text-gray-550">
          {dayLabel}
        </Typography>
      ))}
    </div>
  );
};
export default HomeCalendarDayLabel;
