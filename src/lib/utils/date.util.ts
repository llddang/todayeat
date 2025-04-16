import { CALENDAR_RANGE_OFFSET, DAY, WEEK } from '@/constants/calendar.constant';

export const isSameDate = (d1: Date, d2: Date): boolean => formatDateWithDash(d1) === formatDateWithDash(d2);

export const getFirstDayInMonth = (date: Date[][]) => {
  return date[0][0];
};

export const formatDateCaption = (date: Date) => {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
};

export const formatAmPmKorean = (dateString: string) => {
  const date = new Date(dateString);
  return date.getHours() < 12 ? '오전' : '오후';
};

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const getMonthDates = (date: Date): { id: number; weeks: Date[][] }[] => {
  const baseYear = date.getFullYear();
  const baseMonth = date.getMonth();

  const allMonths = CALENDAR_RANGE_OFFSET.map((monthOffset) => {
    const newDate = new Date(baseYear, baseMonth + monthOffset, 1);

    return {
      id: monthOffset,
      weeks: calculateMonthDates(newDate)
    };
  });

  return allMonths;
};

export const calculateMonthDates = (date: Date): Date[][] => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const firstDayDiff = firstDayOfMonth.getDate() - firstDayOfMonth.getDay() + (firstDayOfMonth.getDay() === 0 ? -6 : 1);
  const firstDay = new Date(firstDayOfMonth);
  firstDay.setDate(firstDayDiff);

  const lastDay = new Date(lastDayOfMonth);
  if (lastDay.getDay() !== 0) {
    lastDay.setDate(lastDay.getDate() + (7 - lastDay.getDay()));
  }

  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];

  const tempFirstDay = new Date(firstDay);
  while (tempFirstDay <= lastDay) {
    currentWeek.push(new Date(tempFirstDay));

    if (tempFirstDay.getDay() === 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    tempFirstDay.setDate(tempFirstDay.getDate() + 1);
  }

  return weeks;
};

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

export const formatDateWithDash = (date: Date): string => {
  const formattedDate = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
    .format(date)
    .replace(/\//g, '-');

  return formattedDate;
};

export const convertToTimestamp = (
  baseDate: Date,
  time: { meridiem: '오전' | '오후'; hours: string; minutes: string }
): string => {
  let hour = parseInt(time.hours, 10);
  const minutes = time.minutes.padStart(2, '0');

  if (time.meridiem === '오전' && hour === 12) {
    hour = 0;
  } else if (time.meridiem === '오후' && hour !== 12) {
    hour += 12;
  }

  const yyyy = baseDate.getFullYear();
  const mm = String(baseDate.getMonth() + 1).padStart(2, '0');
  const dd = String(baseDate.getDate()).padStart(2, '0');
  const hh = String(hour).padStart(2, '0');

  return `${yyyy}-${mm}-${dd} ${hh}:${minutes}:00`;
};
