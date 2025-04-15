import { useEffect, useLayoutEffect, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import ClientOnly from '@/components/commons/client-only';
import { CALENDAR_STAND_COUNT } from '@/constants/calendar.constant';
import {
  calculateMonthDates,
  formatDateWithDash,
  getFirstDayInMonth,
  getMonthDates,
  isSameDate
} from '@/lib/utils/date.util';
import { getAllMyDailyCalories } from '@/lib/apis/meal.api';
import { useCalendar } from '@/lib/contexts/calendar.context';
import HomeCalendarMonthItem from '@/components/_home/home-calendar-month-item';
import { useDashboard } from '@/lib/contexts/dashboard.context';

type MonthType = {
  id: number;
  weeks: Date[][];
};
const HomeCalendarMonth = () => {
  const { selectedDate, setSelectedDate } = useDashboard();
  const { currentDate, dailyMealCalories, setCurrentDate, setDailyMealCalories } = useCalendar();

  const [months, setMonths] = useState<MonthType[]>(getMonthDates(currentDate));

  useEffect(() => {
    const filteredMonthsWithoutInfo = months.filter((month) => {
      const firstDay = getFirstDayInMonth(month.weeks);
      const key = formatDateWithDash(firstDay);
      return dailyMealCalories[key] === undefined;
    });
    const flatDates = filteredMonthsWithoutInfo.flatMap((month) => month.weeks.flatMap((date) => date));
    const startDate = flatDates[0];
    const endDate = flatDates.at(-1);
    if (!startDate || !endDate) return;

    getAllMyDailyCalories(startDate, endDate).then(setDailyMealCalories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [months]);

  const [api, setApi] = useState<CarouselApi>();

  const handleDateClick = (newSelectedDate: Date): void => {
    if (isSameDate(newSelectedDate, selectedDate)) return;
    setSelectedDate(new Date(newSelectedDate));
    setCurrentDate(new Date(newSelectedDate));
  };

  useEffect(() => {
    if (!api) return;

    const onSettle = (): void => {
      const baseYear = currentDate.getFullYear();
      const baseMonth = currentDate.getMonth();

      const newDate = new Date(baseYear, baseMonth, 1);
      setMonths(getMonthDates(newDate));
    };
    const onSelect = (): void => {
      const currentIndex = api.selectedScrollSnap();
      const diff = currentIndex - CALENDAR_STAND_COUNT;
      if (diff === 0) return;

      const baseYear = currentDate.getFullYear();
      const baseMonth = currentDate.getMonth();

      const offset = diff > 0 ? 1 : -1;
      const newDate = new Date(baseYear, baseMonth + offset, 1);
      setCurrentDate(newDate);
    };

    api.on('settle', onSettle);
    api.on('select', onSelect);
    return () => {
      api.off('settle', onSettle);
      api.off('select', onSelect);
    };
  }, [api, currentDate, setCurrentDate]);

  useLayoutEffect(() => {
    if (!api) return;
    api.scrollTo(CALENDAR_STAND_COUNT, true);
  }, [months, api]);

  return (
    <ClientOnly
      fallback={
        <HomeCalendarMonthItem weeksInMonth={calculateMonthDates(selectedDate)} onDateClick={handleDateClick} />
      }
    >
      <Carousel setApi={setApi} opts={{ startIndex: CALENDAR_STAND_COUNT }}>
        <CarouselContent>
          {months.map((month) => {
            const firstDay = getFirstDayInMonth(month.weeks);
            return (
              <CarouselItem key={formatDateWithDash(firstDay)}>
                <HomeCalendarMonthItem weeksInMonth={month.weeks} onDateClick={handleDateClick} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </ClientOnly>
  );
};
export default HomeCalendarMonth;
