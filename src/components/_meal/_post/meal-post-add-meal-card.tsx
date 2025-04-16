'use client';

import { forwardRef } from 'react';
import IconButton from '@/components/commons/icon-button';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

const MealPostAddMealCard = forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex cursor-pointer flex-col items-center gap-3 rounded-2xl bg-white px-4 py-5', className)}
      {...props}
    >
      <IconButton size="md" icon="before:bg-add-line-icon" alt="음식 추가" className="bg-gray-100 hover:bg-gray-100" />
      <Typography as="span" variant="body3" className="text-gray-800">
        음식 추가하기
      </Typography>
    </div>
  );
});

MealPostAddMealCard.displayName = 'MealPostAddMealCard';
export default MealPostAddMealCard;
