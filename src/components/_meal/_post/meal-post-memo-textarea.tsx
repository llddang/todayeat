import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import * as React from 'react';

type Props = React.ComponentProps<'textarea'> & {
  charCount?: number;
};

const MAX_MEMO_LENGTH = 200;

const MealPostMemoTextarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ className, value, charCount = 0, ...props }, ref) => {
    return (
      <div
        className={cn(
          'group flex flex-col gap-2 rounded-lg border border-gray-300 bg-white p-4 focus-within:!border-gray-800 hover:border-gray-500',
          className
        )}
      >
        <textarea
          className="flex-1 resize-none caret-purple-300 typography-body1 focus:border-none focus:outline-none focus:ring-0 focus-visible:ring-0"
          value={value}
          maxLength={MAX_MEMO_LENGTH}
          ref={ref}
          {...props}
        />

        <Typography as="div" variant="body4" className="flex items-center justify-end gap-[0.125rem] text-gray-500">
          <span className="group-focus-within:text-gray-600 group-hover:text-gray-600">{charCount}</span>
          <span>/</span>
          <span>{MAX_MEMO_LENGTH}</span>
        </Typography>
      </div>
    );
  }
);

MealPostMemoTextarea.displayName = 'MealPostMemoTextarea';

export default MealPostMemoTextarea;
