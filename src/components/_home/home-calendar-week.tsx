import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
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
    <Carousel setApi={setApi}>
      <CarouselContent>
        {weeks.map((week) => {
          console.log(week.dates[0].toDateString());
          return (
            <CarouselItem key={week.dates[0].getTime()}>
              <HomeCalendarWeekItem weekDate={week.dates} selectedDate={selectedDate} onDateClick={handleDateClick} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};
export default HomeCalendarWeek;

type HomeCalendarWeekItemProps = {
  weekDate: Date[];
  selectedDate: Date;
  onDateClick: (date: Date) => void;
};
const HomeCalendarWeekItem = ({ weekDate, selectedDate, onDateClick }: HomeCalendarWeekItemProps) => {
  const dayLabels: string[] = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <div className="flex w-full justify-between">
      {weekDate.map((date, index) => {
        const isSelected = isSameDate(date, selectedDate);
        const isToday = isSameDate(date, new Date());

        return (
          <div key={date.toString()} className="flex flex-col items-center" onClick={() => onDateClick(date)}>
            <div className="mb-1 text-xs text-gray-500">{dayLabels[index]}</div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm ${isSelected ? 'bg-yellow-300 text-gray-800' : isToday ? 'border border-gray-300' : ''} cursor-pointer transition-colors`}
            >
              {date.getMonth() + 1}/{date.getDate()}
            </div>
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
