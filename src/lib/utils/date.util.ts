import { CALENDAR_RANGE_OFFSET, DAY, WEEK } from '@/constants/calendar.constant';

export const isSameDate = (d1: Date, d2: Date): boolean => d1.toDateString() === d2.toDateString();

export const getWeekDates = (date: Date): { id: number; dates: Date[] }[] => {
  const standTime = date.getTime();

  const allWeeks = CALENDAR_RANGE_OFFSET.map((weekOffset) => ({
    id: weekOffset,
    dates: calculateWeekDates(new Date(standTime + weekOffset * WEEK))
  }));

  return allWeeks;
};

export const calculateWeekDates = (date: Date): Date[] => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date);
  monday.setDate(diff);

  const standTime = monday.getTime();

  return Array.from({ length: 7 }, (_, dayOffset) => new Date(standTime + dayOffset * DAY));
};

export const dateDashFormatter = (date: Date): string => {
  const formattedDate = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
    .format(date)
    .replace(/\//g, '-');

  return formattedDate;
};
