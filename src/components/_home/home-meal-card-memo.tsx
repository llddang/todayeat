import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

const HomeMealCardMemo = ({ memo }: { memo: string }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1 border-t border-gray-200 pt-[calc(1rem-1px)]',
        'before:bg-edit-4-icon before:h-[1.125rem] before:w-[1.125rem] before:bg-contain before:bg-center before:bg-no-repeat'
      )}
    >
      <Typography variant="body3" className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-gray-700">
        {memo}
      </Typography>
    </div>
  );
};

export default HomeMealCardMemo;
