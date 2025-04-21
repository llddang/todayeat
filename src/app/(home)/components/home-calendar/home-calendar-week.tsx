import { useEffect, useLayoutEffect, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { getAllMyDailyCalories } from '@/apis/meal.api';
import { useCalendar } from '@/app/(home)/contexts/calendar.context';
import { useDashboard } from '@/app/(home)/contexts/dashboard.context';
import { CALENDAR_STAND_COUNT } from '@/app/(home)/constants/calendar.constant';
import { getFirstDayInWeek, getPeriodInCarouselWeek, getWeekDates } from '@/app/(home)/utils/calendar.util';
import DayLabel from './day-label';
import HomeCalendarWeekItem from './home-calendar-week-item';
import { CarouselWeek } from '../../types/calendar.type';
import { formatDateWithDash } from '@/utils/format.util';

const HomeCalendarWeek = () => {
  const { selectedDate } = useDashboard();
  const { currentDate, dailyMealCalories, setCurrentDate, setDailyMealCalories } = useCalendar();

  const [weeks, setWeeks] = useState<CarouselWeek[]>(getWeekDates(currentDate));
  const [weekDate, setWeekDate] = useState<Date>(currentDate);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    const [startDay, endDay] = getPeriodInCarouselWeek(weeks, dailyMealCalories);
    if (!startDay || !endDay) return;
    getAllMyDailyCalories(startDay, endDay).then(setDailyMealCalories);
  }, [weeks]);

  useEffect(() => {
    if (!api) return;

    const onSettle = (): void => {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate());
      setWeeks(getWeekDates(newDate));
      setWeekDate(newDate);
    };
    const onSelect = (): void => {
      const currentIndex = api.selectedScrollSnap();
      const diff = currentIndex - CALENDAR_STAND_COUNT;

      const newDate = new Date(weekDate);
      newDate.setDate(weekDate.getDate() + diff * 7);
      setCurrentDate(newDate);
    };

    api.on('settle', onSettle);
    api.on('select', onSelect);
    return () => {
      api.off('settle', onSettle);
      api.off('select', onSelect);
    };
  }, [api, currentDate, setCurrentDate, weekDate]);

  useLayoutEffect(() => {
    if (!api) return;
    api.scrollTo(CALENDAR_STAND_COUNT, true);
    setCurrentDate(weekDate);
  }, [weeks, api, setCurrentDate, weekDate]);

  /** // TODO: UI에 보이는 날짜만 tab으로 이동가능하도록
   * 현재 날짜마다 버튼이 들어가서 tag으로 이동이 가능한데 요소가 너무 많음.
   * DOM의 모든 요소보다 UI에 보이는 날짜만 tab으로 이동가능하고, 이후 UI 상에는 보이지 않는 앞(이전 주), 뒤(다음 주)로 이동할 수 있는 버튼 만들기
   */
  return (
    <div className="space-y-3">
      <DayLabel />
      <Carousel setApi={setApi} opts={{ startIndex: CALENDAR_STAND_COUNT }}>
        <CarouselContent>
          {weeks.map((week) => {
            const firstDay = getFirstDayInWeek(week.dates);
            return (
              <CarouselItem key={formatDateWithDash(firstDay)}>
                <HomeCalendarWeekItem
                  selectedDate={selectedDate}
                  week={week.dates}
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
export default HomeCalendarWeek;
