import HomeCalendarWeekItem from '@/components/_home/home-calendar-week-item';
import ClientOnly from '@/components/commons/client-only';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { calculateWeekDates, getWeekDates, isSameDate } from '@/lib/utils/date.util';
import { useEffect, useLayoutEffect, useState } from 'react';

type WeekDate = {
  id: number;
  dates: Date[];
};
const HomeCalendarWeek = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [weeks, setWeeks] = useState<WeekDate[]>(getWeekDates(selectedDate));

  const [api, setApi] = useState<CarouselApi>();

  const handleDateClick = (newSelectedDate: Date): void => {
    if (isSameDate(newSelectedDate, selectedDate)) return;
    setSelectedDate(new Date(newSelectedDate));
  };

  useEffect(() => {
    if (!api) return;

    const onSettle = (): void => {
      const currentIndex = api.selectedScrollSnap();
      const diff = currentIndex - 2;

      if (diff !== 0) {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + diff * 7);
        setCurrentDate(newDate);
        setWeeks(getWeekDates(newDate));
      }
    };

    api.on('settle', onSettle);
    return () => {
      api.off('settle', onSettle);
    };
  }, [api, currentDate]);

  useLayoutEffect(() => {
    if (!api) return;
    api.scrollTo(2, true);
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
      <Carousel setApi={setApi} opts={{ startIndex: 2 }}>
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
