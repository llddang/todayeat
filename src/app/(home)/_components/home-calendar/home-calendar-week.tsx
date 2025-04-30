import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useDateContext } from '@/app/(home)/_contexts/date.context';
import { CALENDAR_STAND_COUNT } from '@/app/(home)/_constants/calendar.constant';
import { getCalendarStartDate } from '@/app/(home)/_utils/calendar.util';
import DayLabel from './day-label';
import HomeCalendarWeekItem from './home-calendar-week-item';
import { CarouselWeek } from '../../_types/calendar.type';
import { formatDateWithDash } from '@/utils/format.util';
import { useUserStore } from '@/store/user.store';
import useCalendarCarousel from '../../_hooks/use-calendar-carousel';

const HomeCalendarWeek = () => {
  const { selectedDate, dailyMealCalories } = useDateContext();
  const { personalInfo } = useUserStore((state) => state.user);
  const { setApi, items: weeks } = useCalendarCarousel<CarouselWeek[]>('week');

  return (
    <div className="space-y-3">
      <DayLabel />
      <Carousel setApi={setApi} opts={{ startIndex: CALENDAR_STAND_COUNT }}>
        <CarouselContent>
          {weeks.map((week) => {
            const firstDay = getCalendarStartDate(week.dates);
            return (
              <CarouselItem key={formatDateWithDash(firstDay)}>
                <HomeCalendarWeekItem
                  selectedDate={selectedDate}
                  week={week.dates}
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
export default HomeCalendarWeek;
