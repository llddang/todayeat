import { CALENDAR_RANGE_OFFSET, MAX_WEEK } from '@/app/(home)/_constants/calendar.constant';
import { formatDateWithDash } from '@/utils/format.util';

import { Day, CarouselMonth, CarouselWeek } from '../_types/calendar.type';
import { DailyMealCalories } from '@/types/nutrition.type';
import { addDays, addWeeks, isSameMonth, startOfMonth, startOfWeek } from 'date-fns';

export const getCalendarStartDate = (calendarData: Day[][] | Day[]): Date => {
  if (Array.isArray(calendarData[0])) return calendarData[0][0].day;
  else return calendarData[0].day;
};

export const getCalendarEndDate = (month: Day[][]): Date => {
  return month.at(-1)?.at(-1)?.day ?? new Date();
};

export const getCalendarDateRange = (month: Day[][]): [Date, Date] => {
  return [getCalendarStartDate(month), getCalendarEndDate(month)];
};

export const getMonths = (date: Date): CarouselMonth[] => {
  const baseYear = date.getFullYear();
  const baseMonth = date.getMonth();

  const allMonths = CALENDAR_RANGE_OFFSET.map((monthOffset) => {
    const newDate = new Date(baseYear, baseMonth + monthOffset, 1);

    return {
      id: monthOffset,
      dates: getMonthCalendarDays(newDate)
    };
  });

  return allMonths;
};

/**
 * 주어진 날짜가 속한 달의 월요일부터 시작하는 6주 캘린더를 생성합니다.
 * @param {Date} date 기준 날짜
 * @returns {Month} 6주 캘린더 데이터 (Date[][] 형태)
 */
export const getMonthCalendarDays = (date: Date, offset: number = MAX_WEEK): Day[][] => {
  const firstDayOfMonth = startOfMonth(date);
  const monday = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });

  const month = [];

  let currentDate = new Date(monday);
  for (let week = 0; week < offset; week++) {
    const weekDays = [];

    for (let day = 0; day < 7; day++) {
      weekDays.push({
        day: new Date(currentDate),
        dayOutside: !isSameMonth(currentDate, date)
      });
      currentDate = addDays(currentDate, 1);
    }

    month.push(weekDays);
  }

  return month;
};

export const getPeriodInCarouselMonth = (
  months: CarouselMonth[],
  dailyMealCalories: DailyMealCalories
): [Date | null, Date | null] => {
  const filteredMonths = months.filter((month) => {
    const firstDay = getCalendarStartDate(month.dates);
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

export const getWeeks = (date: Date): CarouselWeek[] => {
  const allWeeks = CALENDAR_RANGE_OFFSET.map((weekOffset) => ({
    id: weekOffset,
    dates: getWeekCalendarDays(addWeeks(date, weekOffset))
  }));

  return allWeeks;
};

export const getWeekCalendarDays = (date: Date): Day[] => {
  const monday = startOfWeek(date, { weekStartsOn: 1 });

  return Array.from({ length: 7 }, (_, dayOffset) => ({
    day: addDays(monday, dayOffset),
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
