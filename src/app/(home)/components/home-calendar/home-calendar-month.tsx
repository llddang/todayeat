/* eslint-disable react-hooks/exhaustive-deps */
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { formatDateWithDash } from '@/utils/format.util';
import { useDateContext } from '@/app/(home)/contexts/date.context';
import { getCalendarStartDate } from '@/app/(home)/utils/calendar.util';
import { CALENDAR_STAND_COUNT } from '@/app/(home)/constants/calendar.constant';
import DayLabel from './day-label';
import HomeCalendarMonthItem from './home-calendar-month-item';
import { CarouselMonth } from '../../types/calendar.type';
import { useUserStore } from '@/store/user-store';
import useCalendarCarousel from '../../hooks/use-calendar-carousel';

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
