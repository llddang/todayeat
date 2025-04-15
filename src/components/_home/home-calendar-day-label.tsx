import { Typography } from '@/components/ui/typography';

const dayLabels = '월화수목금토일'.split('');

const HomeCalendarDayLabel = () => {
  return (
    <div className="flex justify-between">
      {dayLabels.map((dayLabel) => (
        <Typography as="span" key={dayLabel} variant="body4" className="w-10 text-center text-gray-550">
          {dayLabel}
        </Typography>
      ))}
    </div>
  );
};
export default HomeCalendarDayLabel;
