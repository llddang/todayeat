import { CALENDAR_RANGE_OFFSET, DAY, MAX_WEEK, WEEK } from '@/app/(home)/constants/calendar.constant';
import { formatDateWithDash } from '@/utils/format.util';

import { Month, Week } from '../types/calendar.type';

export const isSameDate = (d1: Date, d2: Date): boolean => formatDateWithDash(d1) === formatDateWithDash(d2);

export const getFirstDayInMonth = (dates: Month): Date => {
  return dates[0][0];
};

export const getLastDayInMonth = (dates: Month): Date => {
  return dates[5][6];
};

export const getFirstDayAndLastDayInMonth = (dates: Month): [Date, Date] => {
  return [getFirstDayInMonth(dates), getLastDayInMonth(dates)];
};

export const getMonthDates = (date: Date): { id: number; dates: Month }[] => {
  const baseYear = date.getFullYear();
  const baseMonth = date.getMonth();

  const allMonths = CALENDAR_RANGE_OFFSET.map((monthOffset) => {
    const newDate = new Date(baseYear, baseMonth + monthOffset, 1);

    return {
      id: monthOffset,
      dates: calculateMonthDates(newDate)
    };
  });

  return allMonths;
};

/**
 * 주어진 날짜가 속한 달의 월요일부터 시작하는 6주 캘린더를 생성합니다.
 * @param {Date} date 기준 날짜
 * @returns {Month} 6주 캘린더 데이터 (Date[][] 형태)
 */
export const calculateMonthDates = (date: Date): Month => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  const firstDayDiff = firstDayOfMonth.getDate() - firstDayOfMonth.getDay() + (firstDayOfMonth.getDay() === 0 ? -6 : 1);
  const firstDay = new Date(firstDayOfMonth);
  firstDay.setDate(firstDayDiff);

  const weeks: Date[][] = [];

  const tempFirstDay = new Date(firstDay);
  for (let weekOffset = 0; weekOffset < MAX_WEEK; weekOffset++) {
    const currentWeek: Date[] = [];
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      currentWeek.push(new Date(tempFirstDay));
      tempFirstDay.setDate(tempFirstDay.getDate() + 1);
    }
    weeks.push(currentWeek);
  }

  return weeks as unknown as Month;
};

export const getWeekDates = (date: Date): { id: number; dates: Week }[] => {
  const standTime = date.getTime();

  const allWeeks = CALENDAR_RANGE_OFFSET.map((weekOffset) => ({
    id: weekOffset,
    dates: calculateWeekDates(new Date(standTime + weekOffset * WEEK))
  }));

  return allWeeks;
};

export const calculateWeekDates = (date: Date): Week => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date);
  monday.setDate(diff);

  const standTime = monday.getTime();

  return Array.from({ length: 7 }, (_, dayOffset) => new Date(standTime + dayOffset * DAY)) as Week;
};
