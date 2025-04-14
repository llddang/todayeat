import CircleProgressBar from '@/components/commons/circle-progress-bar';
import ClientOnly from '@/components/commons/client-only';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { useEffect, useLayoutEffect, useState } from 'react';

interface WeekData {
  id: number;
  dates: Date[];
}

const HomeCalendarWeek = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [weeks, setWeeks] = useState<WeekData[]>(getWeekDates(selectedDate));

  const [api, setApi] = useState<CarouselApi>();

  const handleDateClick = (date: Date): void => {
    setSelectedDate(date);
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

type HomeCalendarWeekItemProps = {
  weekDate: Date[];
  selectedDate: Date;
  onDateClick: (date: Date) => void;
};
const HomeCalendarWeekItem = ({ weekDate, selectedDate, onDateClick }: HomeCalendarWeekItemProps) => {
  return (
    <div className="flex w-full justify-between">
      {weekDate.map((date) => {
        const isSelected = isSameDate(date, selectedDate);
        return (
          <div
            key={date.toDateString()}
            className={cn(
              'relative flex h-10 w-10 items-center justify-center',
              isSelected ? 'text-gray-900' : 'text-gray-600'
            )}
            onClick={() => onDateClick(date)}
          >
            <Typography variant={isSelected ? 'subTitle3' : 'body2'} className="!leading-[100%]">
              {date.getDate()}
            </Typography>
            {isSelected && (
              <div className="border-box absolute -z-10 h-[calc(2.5rem-3px)] w-[calc(2.5rem-3px)] rounded-full bg-white" />
            )}
            <CircleProgressBar progress={75} size={40} strokeWidth={3} className="absolute -z-10 h-10 w-10" />
          </div>
        );
      })}
    </div>
  );
};

const getWeekDates = (date: Date): WeekData[] => {
  const WEEK_INDEX = [-2, -1, 0, 1, 2] as const;
  const WEEK = 7 * 24 * 60 * 60 * 1000;

  const standTime = date.getTime();

  const allWeeks = WEEK_INDEX.map((index) => ({
    id: index,
    dates: calculateWeekDates(new Date(standTime + index * WEEK))
  }));

  return allWeeks;
};

const calculateWeekDates = (date: Date): Date[] => {
  const DAY = 24 * 60 * 60 * 1000;

  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diff));

  return Array.from({ length: 7 }, (_, i) => new Date(monday.getTime() + DAY * i));
};

const isSameDate = (d1: Date, d2: Date): boolean => d1.toDateString() === d2.toDateString();
