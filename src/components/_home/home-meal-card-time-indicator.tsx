import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { formatAmPmKorean, formatTime } from '@/lib/utils/date.util';

const HomeMealCardTimeIndicator = ({ mealIcon, ateAt }: { mealIcon: string; ateAt: string }) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center pt-1 text-center',
        'before:mb-1 before:h-[1.375rem] before:w-[1.375rem] before:bg-contain before:bg-center before:bg-no-repeat',
        'after:mt-2 after:w-[1px] after:flex-1 after:bg-gray-350',
        mealIcon
      )}
    >
      <Typography variant="caption2" className="text-gray-500">
        {formatAmPmKorean(ateAt)}
        <br />
        {formatTime(ateAt)}
      </Typography>
    </div>
  );
};

export default HomeMealCardTimeIndicator;
