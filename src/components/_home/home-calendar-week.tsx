import { useEffect, useLayoutEffect, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import HomeCalendarWeekItem from '@/components/_home/home-calendar-week-item';
import ClientOnly from '@/components/commons/client-only';
import { CALENDAR_STAND_COUNT } from '@/constants/calendar.constant';
import { calculateWeekDates, formatDateWithDash, getWeekDates, isSameDate } from '@/lib/utils/date.util';
import { getAllMyDailyCalories } from '@/lib/apis/meal.api';
import { DailyMealCalories } from '@/types/nutrition.type';

type WeekType = {
  id: number;
  dates: Date[];
};
type HomeCalendarWeekProps = {
  initialDate?: Date;
  onSelectedDateChange?: (date: Date) => void;
  onCurrentDateChange?: (date: Date) => void;
};
const HomeCalendarWeek = ({ initialDate, onSelectedDateChange, onCurrentDateChange }: HomeCalendarWeekProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate ?? new Date());
  const [currentDate, setCurrentDate] = useState<Date>(initialDate ?? new Date());
  const [weeks, setWeeks] = useState<WeekType[]>(getWeekDates(selectedDate));

  const [dailyMealCalories, setDailyMealCalories] = useState<DailyMealCalories>({});

  useEffect(() => {
    const filteredWeeksWithoutInfo = weeks.filter((week) => {
      const key = formatDateWithDash(week.dates[0]);
      return dailyMealCalories[key] === undefined;
    });
    if (filteredWeeksWithoutInfo.length === 0) return;
    const startDate = filteredWeeksWithoutInfo[0].dates[0];
    const endDate = filteredWeeksWithoutInfo.at(-1)?.dates.at(-1);
    if (!startDate || !endDate) return;

    getAllMyDailyCalories(startDate, endDate).then((res) => {
      setDailyMealCalories((prev) => ({ ...prev, ...res }));
    });
  }, [weeks]);

  useEffect(() => {
    if (initialDate) {
      setSelectedDate(new Date(initialDate));
      setCurrentDate(new Date(initialDate));
      setWeeks(getWeekDates(initialDate));
    }
  }, [initialDate]);

  const [api, setApi] = useState<CarouselApi>();

  const handleDateClick = (newSelectedDate: Date): void => {
    if (isSameDate(newSelectedDate, selectedDate)) return;
    setSelectedDate(new Date(newSelectedDate));
    if (onSelectedDateChange) onSelectedDateChange(new Date(newSelectedDate));
  };

  useEffect(() => {
    if (!api) return;

    const onSettle = (): void => {
      const currentIndex = api.selectedScrollSnap();
      const diff = currentIndex - CALENDAR_STAND_COUNT;

      if (diff !== 0) {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + diff * 7);
        setCurrentDate(newDate);
        if (onCurrentDateChange) onCurrentDateChange(newDate);
        setWeeks(getWeekDates(newDate));
      }
    };

    api.on('settle', onSettle);
    return () => {
      api.off('settle', onSettle);
    };
  }, [api, currentDate, onCurrentDateChange]);

  useLayoutEffect(() => {
    if (!api) return;
    api.scrollTo(CALENDAR_STAND_COUNT, true);
  }, [weeks, api]);

  return (
    <ClientOnly
      fallback={
        <HomeCalendarWeekItem
          weekDate={calculateWeekDates(selectedDate)}
          selectedDate={selectedDate}
          onDateClick={handleDateClick}
          dailyMealCalories={dailyMealCalories}
        />
      }
    >
      <Carousel setApi={setApi} opts={{ startIndex: CALENDAR_STAND_COUNT }}>
        <CarouselContent>
          {weeks.map((week) => (
            <CarouselItem key={week.dates[0].getTime()}>
              <HomeCalendarWeekItem
                weekDate={week.dates}
                selectedDate={selectedDate}
                onDateClick={handleDateClick}
                dailyMealCalories={dailyMealCalories}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </ClientOnly>
  );
};
export default HomeCalendarWeek;
