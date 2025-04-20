import { useEffect, useLayoutEffect, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import ClientOnly from '@/components/commons/client-only';
import { formatDateWithDash } from '@/utils/format.util';
import { getAllMyDailyCalories } from '@/apis/meal.api';
import { useCalendar } from '@/app/(home)/contexts/calendar.context';
import { useDashboard } from '@/app/(home)/contexts/dashboard.context';
import { CALENDAR_STAND_COUNT } from '@/app/(home)/constants/calendar.constant';
import { calculateWeekDates, getWeekDates } from '@/app/(home)/utils/calendar.util';
import DayLabel from './day-label';
import HomeCalendarWeekItem from './home-calendar-week-item';

type WeekType = {
  id: number;
  dates: Date[];
};
const HomeCalendarWeek = () => {
  const { selectedDate } = useDashboard();
  const { currentDate, dailyMealCalories, setCurrentDate, setDailyMealCalories } = useCalendar();

  const [weeks, setWeeks] = useState<WeekType[]>(getWeekDates(currentDate));

  useEffect(() => {
    setWeeks(getWeekDates(selectedDate));
  }, [selectedDate]);

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
    <div className="space-y-3">
      <DayLabel />
      <ClientOnly fallback={<HomeCalendarWeekItem week={calculateWeekDates(currentDate)} />}>
        <Carousel setApi={setApi} opts={{ startIndex: CALENDAR_STAND_COUNT }}>
          <CarouselContent>
            {weeks.map((week) => (
              <CarouselItem key={week.dates[0].getTime()}>
                <HomeCalendarWeekItem week={week.dates} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </ClientOnly>
    </div>
  );
};
export default HomeCalendarWeek;
