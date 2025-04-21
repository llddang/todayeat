import { useEffect, useLayoutEffect, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { formatDateWithDash } from '@/utils/format.util';
import { getAllMyDailyCalories } from '@/apis/meal.api';
import { useCalendar } from '@/app/(home)/contexts/calendar.context';
import { useDashboard } from '@/app/(home)/contexts/dashboard.context';
import { getFirstDayInMonth, getMonthDates } from '@/app/(home)/utils/calendar.util';
import { CALENDAR_STAND_COUNT } from '@/app/(home)/constants/calendar.constant';
import DayLabel from './day-label';
import HomeCalendarMonthItem from './home-calendar-month-item';
import { Month } from '../../types/calendar.type';

type MonthType = {
  id: number;
  dates: Month;
};
const HomeCalendarMonth = () => {
  const { selectedDate } = useDashboard();
  const { currentDate, dailyMealCalories, setCurrentDate, setDailyMealCalories } = useCalendar();

  const [months, setMonths] = useState<MonthType[]>(getMonthDates(currentDate));
  const [monthDate, setMonthDate] = useState<Date>(currentDate);

  useEffect(() => {
    setMonths(getMonthDates(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    const filteredMonthsWithoutInfo = months.filter((month) => {
      const firstDay = getFirstDayInMonth(month.dates);
      const key = formatDateWithDash(firstDay);
      return dailyMealCalories[key] === undefined;
    });
    const flatDates = filteredMonthsWithoutInfo.flatMap((month) => month.dates.flatMap((date) => date));
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
      setMonthDate(newDate);
    };
    const onSelect = (): void => {
      const currentIndex = api.selectedScrollSnap();
      const diff = currentIndex - CALENDAR_STAND_COUNT;

      const baseYear = monthDate.getFullYear();
      const baseMonth = monthDate.getMonth();

      const newDate = new Date(baseYear, baseMonth + diff, 1);
      setCurrentDate(newDate);
    };

    api.on('settle', onSettle);
    api.on('select', onSelect);
    return () => {
      api.off('settle', onSettle);
      api.off('select', onSelect);
    };
  }, [api, currentDate, monthDate, setCurrentDate]);

  useLayoutEffect(() => {
    if (!api) return;
    api.scrollTo(CALENDAR_STAND_COUNT, true);
    setCurrentDate(monthDate);
  }, [months, api, monthDate, setCurrentDate]);

  return (
    <div className="space-y-3">
      <DayLabel />
      <Carousel setApi={setApi} opts={{ startIndex: CALENDAR_STAND_COUNT }}>
        <CarouselContent>
          {months.map((month) => {
            const firstDay = getFirstDayInMonth(month.dates);
            return (
              <CarouselItem key={formatDateWithDash(firstDay)}>
                <HomeCalendarMonthItem
                  month={month.dates}
                  selectedDate={selectedDate}
                  dailyMealCalories={dailyMealCalories}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
export default HomeCalendarMonth;
