'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar = ({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-2', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'h-11 flex justify-center relative items-center',
        caption_label: 'typography-body2 text-gray-800',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(buttonVariants({ variant: 'ghost' }), 'h-7 w-7 p-0'),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full',
        head_row: 'flex justify-between',
        head_cell: 'rounded-md w-9 text-center typography-body4 text-gray-550',
        row: 'flex w-full mt-3 justify-between',
        cell: cn(
          'relative p-0 typography-body3 focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-gray-600/40 [&:has([aria-selected].day-outside)]:bg-gray-600/40 [&:has([aria-selected].day-range-end)]:rounded-full',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-full'
        ),
        day: 'h-9 w-9 flex items-center justify-center typography-body3',
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected: '',
        day_today: '',
        day_outside: 'day-outside text-gray-400',
        day_disabled: '',
        day_range_middle: 'text-gray-800',
        day_hidden: 'invisible',
        ...classNames
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn('h-4 w-4 text-gray-800', className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn('h-4 w-4 text-gray-800', className)} {...props} />
        )
      }}
      {...props}
    />
  );
};
Calendar.displayName = 'Calendar';

export default Calendar;
