/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CarouselApi } from '@/components/ui/carousel';
import { getAllMyDailyCalories } from '@/apis/meal.api';
import { useDateContext } from '@/app/(home)/contexts/date.context';
import { CALENDAR_STAND_COUNT } from '@/app/(home)/constants/calendar.constant';
import { addMonths, addWeeks, isSameDay } from 'date-fns';
import { CarouselMonth, CarouselWeek } from '../types/calendar.type';
import { getMonths, getWeeks, getPeriodInCarouselMonth, getPeriodInCarouselWeek } from '../utils/calendar.util';

const useCalendarCarousel = <T extends CarouselMonth[] | CarouselWeek[]>(type: 'month' | 'week') => {
  const { selectedDate, currentDate, dailyMealCalories, setCurrentDate, setDailyMealCalories } = useDateContext();

  const [items, setItems] = useState<T>(
    type === 'month' ? (getMonths(currentDate) as T) : (getWeeks(currentDate) as T)
  );
  const [baseDate, setBaseDate] = useState<Date>(currentDate);
  const [api, setApi] = useState<CarouselApi>();
  const prevSelectedDate = useRef<Date>(selectedDate);

  useEffect(() => {
    if (isSameDay(prevSelectedDate.current, selectedDate)) return;
    prevSelectedDate.current = selectedDate;

    setBaseDate(selectedDate);
    setItems(type === 'month' ? (getMonths(selectedDate) as T) : (getWeeks(selectedDate) as T));
  }, [selectedDate]);

  useEffect(() => {
    const [startDay, endDay] =
      type === 'month'
        ? getPeriodInCarouselMonth(items as CarouselMonth[], dailyMealCalories)
        : getPeriodInCarouselWeek(items as CarouselWeek[], dailyMealCalories);

    if (!startDay || !endDay) return;

    getAllMyDailyCalories(startDay, endDay).then(setDailyMealCalories).catch();
  }, [items, dailyMealCalories, setDailyMealCalories, type]);

  useEffect(() => {
    if (!api) return;

    const onSettle = (): void => {
      if (type === 'month') {
        setItems(getMonths(currentDate) as T);
        setBaseDate(currentDate);
      } else {
        setItems(getWeeks(currentDate) as T);
        setBaseDate(currentDate);
      }
    };

    const onSelect = (): void => {
      const currentIndex = api.selectedScrollSnap();
      const diff = currentIndex - CALENDAR_STAND_COUNT;

      if (type === 'month') setCurrentDate(addMonths(baseDate, diff));
      else setCurrentDate(addWeeks(baseDate, diff));
    };

    api.on('settle', onSettle);
    api.on('select', onSelect);

    return () => {
      api.off('settle', onSettle);
      api.off('select', onSelect);
    };
  }, [api, currentDate, baseDate, setCurrentDate, type]);

  useLayoutEffect(() => {
    if (!api) return;

    api.scrollTo(CALENDAR_STAND_COUNT, true);

    if (type === 'month') {
      setCurrentDate(baseDate);
    } else {
      setCurrentDate(baseDate);
    }
  }, [items, api, baseDate, selectedDate, setCurrentDate, type]);

  return { api, setApi, items };
};
export default useCalendarCarousel;
