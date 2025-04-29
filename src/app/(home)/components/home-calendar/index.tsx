import ClientOnly from '@/components/commons/client-only';
import HomeCalendarClientView from './home-calendar-client-view';
import HomeCalendarServerView from './home-calendar-server-view';
import { getMonthCalendarDays, getFirstDayAndLastDayInMonth } from '../../utils/calendar.util';
import { getAllMyDailyCalories } from '@/apis/meal.api';

const HomeCalendar = async () => {
  const today = new Date();
  const month = getMonthCalendarDays(today);
  const [firstDay, lastDay] = getFirstDayAndLastDayInMonth(month);
  const dailyMealCalories = await getAllMyDailyCalories(firstDay, lastDay);

  return (
    <ClientOnly fallback={<HomeCalendarServerView dailyMealCalories={dailyMealCalories} />}>
      <HomeCalendarClientView dailyMealCalories={dailyMealCalories} />
    </ClientOnly>
  );
};
export default HomeCalendar;
