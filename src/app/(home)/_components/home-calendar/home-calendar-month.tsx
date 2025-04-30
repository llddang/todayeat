/* eslint-disable react-hooks/exhaustive-deps */
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { formatDateWithDash } from '@/utils/format.util';
import { useDateContext } from '@/app/(home)/_contexts/date.context';
import { getCalendarStartDate } from '@/app/(home)/_utils/calendar.util';
import { CALENDAR_STAND_COUNT } from '@/app/(home)/_constants/calendar.constant';
import DayLabel from './day-label';
import HomeCalendarMonthItem from './home-calendar-month-item';
import { CarouselMonth } from '../../_types/calendar.type';
import { useUserStore } from '@/store/user-store';
import useCalendarCarousel from '../../_hooks/use-calendar-carousel';

const HomeCalendarMonth = () => {
  const { selectedDate, dailyMealCalories } = useDateContext();
  const { personalInfo } = useUserStore((state) => state.user);
  const { setApi, items: months } = useCalendarCarousel<CarouselMonth[]>('month');

  return (
    <div className="space-y-3">
      <DayLabel />
      <Carousel setApi={setApi} opts={{ startIndex: CALENDAR_STAND_COUNT }}>
        <CarouselContent>
          {months.map((month) => {
            const firstDay = getCalendarStartDate(month.dates);
            return (
              <CarouselItem key={formatDateWithDash(firstDay)}>
                <HomeCalendarMonthItem
                  month={month.dates}
                  selectedDate={selectedDate}
                  dailyMealCalories={dailyMealCalories}
                  dailyCaloriesGoal={personalInfo?.dailyCaloriesGoal ?? 0}
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
