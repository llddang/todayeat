import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { formatDateToLocaleKR } from '@/utils/format.util';
import { calculateMonthDates, calculateWeekDates } from '../../utils/calendar.util';
import DayLabel from './day-label';
import HomeCalendarWeekItem from './home-calendar-week-item';
import HomeCalendarMonthItem from './home-calendar-month-item';
import { DailyMealCalories } from '@/types/nutrition.type';

type HomeCalendarServerViewProps = {
  dailyMealCalories: DailyMealCalories;
};
const HomeCalendarServerView = async ({ dailyMealCalories }: HomeCalendarServerViewProps) => {
  const today = new Date();
  const week = calculateWeekDates(today);
  const month = calculateMonthDates(today);

  return (
    <>
      <Tabs defaultValue="week" className="space-y-5 px-4 py-7 pt-2 xl:max-w-[23.75rem]">
        <div className="flex w-full justify-between">
          <Button
            variant="icon"
            size="lg"
            className="after:bg-down-line-gray-600-icon hover:after:bg-down-line-gray-800-icon disabled:after:bg-down-line-gray-400-icon"
          >
            {formatDateToLocaleKR(today)}
          </Button>
          <TabsList className="">
            <TabsTrigger value="week">주간</TabsTrigger>
            <TabsTrigger value="month">월간</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="week">
          <div className="space-y-3">
            <DayLabel />
            <HomeCalendarWeekItem selectedDate={today} week={week} dailyMealCalories={dailyMealCalories} />
          </div>
        </TabsContent>
        <TabsContent value="month">
          <div className="space-y-3">
            <DayLabel />
            <HomeCalendarMonthItem selectedDate={today} month={month} dailyMealCalories={dailyMealCalories} />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};
export default HomeCalendarServerView;
