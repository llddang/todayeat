import HomeCalendarWeekItem from '@/components/_home/home-calendar-week-item';
import ClientOnly from '@/components/commons/client-only';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { CALENDAR_STAND_COUNT } from '@/constants/calendar.constant';
import { calculateWeekDates, getWeekDates, isSameDate } from '@/lib/utils/date.util';
import { useEffect, useLayoutEffect, useState } from 'react';

type WeekDate = {
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
  const [weeks, setWeeks] = useState<WeekDate[]>(getWeekDates(selectedDate));

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
        />
      }
    >
      <Carousel setApi={setApi} opts={{ startIndex: CALENDAR_STAND_COUNT }}>
        <CarouselContent>
          {weeks.map((week) => (
            <CarouselItem key={week.dates[0].getTime()}>
              <HomeCalendarWeekItem weekDate={week.dates} selectedDate={selectedDate} onDateClick={handleDateClick} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </ClientOnly>
  );
};
export default HomeCalendarWeek;
