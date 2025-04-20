import { useEffect, useLayoutEffect, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import ClientOnly from '@/components/commons/client-only';
import { CALENDAR_STAND_COUNT } from '@/app/(home)/constants/calendar.constant';
import { formatDateWithDash } from '@/utils/format.util';
import { getAllMyDailyCalories } from '@/apis/meal.api';
import { useCalendar } from '@/app/(home)/contexts/calendar.context';
import { useDashboard } from '@/app/(home)/contexts/dashboard.context';
import { calculateMonthDates, getFirstDayInMonth, getMonthDates } from '../../utils/calendar.util';
import HomeCalendarDayLabel from './home-calendar-day-label';
import HomeCalendarMonthItem from './home-calendar-month-item';

type MonthType = {
  id: number;
  weeks: Date[][];
};
const HomeCalendarMonth = () => {
  const { selectedDate } = useDashboard();
  const { currentDate, dailyMealCalories, setCurrentDate, setDailyMealCalories } = useCalendar();

  const [months, setMonths] = useState<MonthType[]>(getMonthDates(currentDate));

  useEffect(() => {
    setMonths(getMonthDates(selectedDate));
  }, [selectedDate]);

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
    <div className="space-y-3">
      <HomeCalendarDayLabel />
      <ClientOnly fallback={<HomeCalendarMonthItem weeksInMonth={calculateMonthDates(currentDate)} />}>
        <Carousel setApi={setApi} opts={{ startIndex: CALENDAR_STAND_COUNT }}>
          <CarouselContent>
            {months.map((month) => {
              const firstDay = getFirstDayInMonth(month.weeks);
              return (
                <CarouselItem key={formatDateWithDash(firstDay)}>
                  <HomeCalendarMonthItem weeksInMonth={month.weeks} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </ClientOnly>
    </div>
  );
};
export default HomeCalendarMonth;
