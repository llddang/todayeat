import { useEffect, useLayoutEffect, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import ClientOnly from '@/components/commons/client-only';
import { CALENDAR_STAND_COUNT } from '@/constants/calendar.constant';
import { calculateMonthDates, formatDateWithDash, getMonthDates, isSameDate } from '@/lib/utils/date.util';
import { getAllMyDailyCalories } from '@/lib/apis/meal.api';
import { useCalendar } from '@/lib/contexts/calendar.context';
import HomeCalendarMonthItem from '@/components/_home/home-calendar-month-item';

type MonthType = {
  id: number;
  weeks: Date[][];
};
const HomeCalendarMonth = () => {
  const { selectedDate, currentDate, dailyMealCalories, setSelectedDate, setCurrentDate, setDailyMealCalories } =
    useCalendar();

  const [months, setMonths] = useState<MonthType[]>(getMonthDates(selectedDate));

  useEffect(() => {
    const filteredMonthsWithoutInfo = months.filter((month) => {
      const key = formatDateWithDash(month.weeks[0][0]);
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
  };

  useEffect(() => {
    if (!api) return;

    const onSettle = (): void => {
      const currentIndex = api.selectedScrollSnap();
      const diff = currentIndex - CALENDAR_STAND_COUNT;

      if (diff !== 0) {
        const baseYear = currentDate.getFullYear();
        const baseMonth = currentDate.getMonth();

        const newDate = new Date(baseYear, baseMonth + diff, 1);
        setCurrentDate(newDate);
        setMonths(getMonthDates(newDate));
      }
    };

    api.on('settle', onSettle);
    return () => {
      api.off('settle', onSettle);
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
          {months.map((month) => (
            <CarouselItem key={formatDateWithDash(month.weeks[0][0])}>
              <HomeCalendarMonthItem weeksInMonth={month.weeks} onDateClick={handleDateClick} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </ClientOnly>
  );
};
export default HomeCalendarMonth;
