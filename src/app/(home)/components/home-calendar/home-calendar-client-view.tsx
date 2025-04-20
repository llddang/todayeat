/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useCalendar } from '@/app/(home)/contexts/calendar.context';
import HomeCalendarWeek from './home-calendar-week';
import HomeCalendarMonth from './home-calendar-month';
import DateSelectorMobile from './date-selector-mobile';
import { formatDateToLocaleKR } from '@/utils/format.util';
import { DailyMealCalories } from '@/types/nutrition.type';

type HomeCalendarClientViewProps = {
  dailyMealCalories: DailyMealCalories;
};
const HomeCalendarClientView = ({ dailyMealCalories }: HomeCalendarClientViewProps) => {
  const { currentDate, setDailyMealCalories } = useCalendar();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setDailyMealCalories(dailyMealCalories);
  }, []);

  return (
    <>
      <Tabs defaultValue="week" className="space-y-5 px-4 py-7 pt-2">
        <div className="flex w-full justify-between">
          <Button
            variant="icon"
            size="lg"
            className="after:bg-down-line-gray-600-icon hover:after:bg-down-line-gray-800-icon disabled:after:bg-down-line-gray-400-icon"
            onClick={() => setIsOpen(true)}
          >
            {formatDateToLocaleKR(currentDate)}
          </Button>
          <TabsList className="">
            <TabsTrigger value="week">주간</TabsTrigger>
            <TabsTrigger value="month">월간</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="week">
          <HomeCalendarWeek />
        </TabsContent>
        <TabsContent value="month">
          <HomeCalendarMonth />
        </TabsContent>
      </Tabs>
      <DateSelectorMobile open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};
export default HomeCalendarClientView;
