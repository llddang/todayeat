import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { formatDateToLocaleKR } from '@/utils/format.util';
import { getMonthCalendarDays, getWeekCalendarDays } from '../../_utils/calendar.util';
import DayLabel from './day-label';
import HomeCalendarWeekItem from './home-calendar-week-item';
import HomeCalendarMonthItem from './home-calendar-month-item';
import { DailyMealCalories } from '@/types/nutrition.type';
import { getMyDailyCaloriesGoal } from '@/apis/user.api';

type HomeCalendarServerViewProps = {
  dailyMealCalories: DailyMealCalories;
};
const HomeCalendarServerView = async ({ dailyMealCalories }: HomeCalendarServerViewProps) => {
  const today = new Date();
  const week = getWeekCalendarDays(today);
  const month = getMonthCalendarDays(today);
  const dailyCaloriesGoal = await getMyDailyCaloriesGoal();

  return (
    <div className="space-y-5 px-4 py-7 pt-2 xl:max-w-[23.75rem] xl:space-y-2">
      <Tabs defaultValue="week">
        <div className="flex w-full justify-between">
          <Button
            variant="icon"
            size="lg"
            className="after:bg-down-line-gray-600-icon hover:after:bg-down-line-gray-800-icon disabled:after:bg-down-line-gray-400-icon xl:px-1"
          >
            {formatDateToLocaleKR(today)}
          </Button>
          <TabsList className="xl:hidden">
            <TabsTrigger value="week">주간</TabsTrigger>
            <TabsTrigger value="month">월간</TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
      <div className="block space-y-3 xl:hidden">
        <DayLabel />
        <HomeCalendarWeekItem
          selectedDate={today}
          week={week}
          dailyMealCalories={dailyMealCalories}
          dailyCaloriesGoal={dailyCaloriesGoal}
        />
      </div>
      <div className="hidden space-y-3 xl:block">
        <DayLabel />
        <HomeCalendarMonthItem
          selectedDate={today}
          month={month}
          dailyMealCalories={dailyMealCalories}
          dailyCaloriesGoal={dailyCaloriesGoal}
        />
      </div>
    </div>
  );
};
export default HomeCalendarServerView;
