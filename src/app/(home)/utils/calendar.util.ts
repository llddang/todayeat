import { CALENDAR_RANGE_OFFSET, DAY, MAX_WEEK, WEEK } from '@/app/(home)/constants/calendar.constant';
import { formatDateWithDash } from '@/utils/format.util';

import { Day, CarouselMonth, CarouselWeek } from '../types/calendar.type';
import { DailyMealCalories } from '@/types/nutrition.type';

export const isSameDate = (d1: Date, d2: Date): boolean => formatDateWithDash(d1) === formatDateWithDash(d2);

export const getFirstDayInMonth = (month: Day[][]): Date => {
  return month[0][0].day ?? new Date();
};

export const getLastDayInMonth = (month: Day[][]): Date => {
  return month.at(-1)?.at(-1)?.day ?? new Date();
};

export const getFirstDayAndLastDayInMonth = (month: Day[][]): [Date, Date] => {
  return [getFirstDayInMonth(month), getLastDayInMonth(month)];
};

export const getMonthDates = (date: Date): CarouselMonth[] => {
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
export const calculateMonthDates = (date: Date): Day[][] => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  const firstDayDiff = firstDayOfMonth.getDate() - firstDayOfMonth.getDay() + (firstDayOfMonth.getDay() === 0 ? -6 : 1);
  const firstDay = new Date(firstDayOfMonth);
  firstDay.setDate(firstDayDiff);

  const month = [];

  const standMonth = date.getMonth();
  const tempFirstDay = new Date(firstDay);
  for (let weekOffset = 0; weekOffset < MAX_WEEK; weekOffset++) {
    const currentWeek = [];
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const newData = { day: new Date(tempFirstDay), dayOutside: tempFirstDay.getMonth() !== standMonth };
      currentWeek.push(newData);
      tempFirstDay.setDate(tempFirstDay.getDate() + 1);
    }
    month.push(currentWeek);
  }

  return month;
};

export const getPeriodInCarouselMonth = (
  months: CarouselMonth[],
  dailyMealCalories: DailyMealCalories
): [Date | null, Date | null] => {
  const filteredMonths = months.filter((month) => {
    const firstDay = getFirstDayInMonth(month.dates);
    const key = formatDateWithDash(firstDay);
    return dailyMealCalories[key] === undefined;
  });

  const flatMonth = filteredMonths.flatMap((month) => month.dates);
  const weekLast = flatMonth.length - 1;
  const dayLast = flatMonth[0]?.length - 1 || -1;

  if (weekLast === -1 || dayLast === -1) return [null, null];

  const firstDay = flatMonth[0][0].day;
  const lastDay = flatMonth[weekLast][dayLast].day;

  return [firstDay, lastDay];
};

export const getFirstDayInWeek = (week: Day[]): Date => {
  return week[0].day ?? new Date();
};

export const getWeekDates = (date: Date): CarouselWeek[] => {
  const standTime = date.getTime();

  const allWeeks = CALENDAR_RANGE_OFFSET.map((weekOffset) => ({
    id: weekOffset,
    dates: calculateWeekDates(new Date(standTime + weekOffset * WEEK))
  }));

  return allWeeks;
};

export const calculateWeekDates = (date: Date): Day[] => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date);
  monday.setDate(diff);

  const standTime = monday.getTime();

  return Array.from({ length: 7 }, (_, dayOffset) => ({
    day: new Date(standTime + dayOffset * DAY),
    dayOutside: false
  }));
};

export const getPeriodInCarouselWeek = (
  weeks: CarouselWeek[],
  dailyMealCalories: DailyMealCalories
): [Date | null, Date | null] => {
  const filteredWeeks = weeks.filter((week) => {
    const key = formatDateWithDash(week.dates[0].day);
    return dailyMealCalories[key] === undefined;
  });

  const flatWeek = filteredWeeks.flatMap((week) => week.dates);
  const dayLast = flatWeek.length - 1;

  if (dayLast === -1) return [null, null];

  const firstDay = flatWeek[0].day;
  const lastDay = flatWeek[dayLast].day;

  return [firstDay, lastDay];
};
