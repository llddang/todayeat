import { useEffect, useLayoutEffect, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import HomeCalendarWeekItem from '@/components/_home/home-calendar-week-item';
import ClientOnly from '@/components/commons/client-only';
import { CALENDAR_STAND_COUNT } from '@/constants/calendar.constant';
import { calculateWeekDates, formatDateWithDash, getWeekDates, isSameDate } from '@/lib/utils/date.util';
import { getAllMyDailyCalories } from '@/lib/apis/meal.api';
import { useCalendar } from '@/lib/contexts/calendar.context';

type WeekType = {
  id: number;
  dates: Date[];
};
const HomeCalendarWeek = () => {
  const { selectedDate, currentDate, dailyMealCalories, setSelectedDate, setCurrentDate, setDailyMealCalories } =
    useCalendar();

  const [weeks, setWeeks] = useState<WeekType[]>(getWeekDates(currentDate));

  useEffect(() => {
    const filteredWeeksWithoutInfo = weeks.filter((week) => {
      const key = formatDateWithDash(week.dates[0]);
      return dailyMealCalories[key] === undefined;
    });
    const flatDates = filteredWeeksWithoutInfo.flatMap((week) => week.dates);
    const startDate = flatDates[0];
    const endDate = flatDates.at(-1);
    if (!startDate || !endDate) return;
    getAllMyDailyCalories(startDate, endDate).then(setDailyMealCalories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weeks]);

  const [api, setApi] = useState<CarouselApi>();

  const handleDateClick = (newSelectedDate: Date): void => {
    if (isSameDate(newSelectedDate, selectedDate)) return;
    setSelectedDate(new Date(newSelectedDate));
    setCurrentDate(new Date(newSelectedDate));
  };

  useEffect(() => {
    if (!api) return;

    const onSettle = (): void => {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate());
      setWeeks(getWeekDates(newDate));
    };
    const onSelect = (): void => {
      const currentIndex = api.selectedScrollSnap();
      const diff = currentIndex - CALENDAR_STAND_COUNT;
      if (diff === 0) return;

      const newDate = new Date(currentDate);
      const offset = diff > 0 ? 1 : -1;
      newDate.setDate(currentDate.getDate() + offset * 7);
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
  }, [weeks, api]);

  /** // TODO: UI에 보이는 날짜만 tab으로 이동가능하도록
   * 현재 날짜마다 버튼이 들어가서 tag으로 이동이 가능한데 요소가 너무 많음.
   * DOM의 모든 요소보다 UI에 보이는 날짜만 tab으로 이동가능하고, 이후 UI 상에는 보이지 않는 앞(이전 주), 뒤(다음 주)로 이동할 수 있는 버튼 만들기
   */
  return (
    <ClientOnly
      fallback={<HomeCalendarWeekItem week={calculateWeekDates(selectedDate)} onDateClick={handleDateClick} />}
    >
      <Carousel setApi={setApi} opts={{ startIndex: CALENDAR_STAND_COUNT }}>
        <CarouselContent>
          {weeks.map((week) => (
            <CarouselItem key={week.dates[0].getTime()}>
              <HomeCalendarWeekItem week={week.dates} onDateClick={handleDateClick} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </ClientOnly>
  );
};
export default HomeCalendarWeek;
