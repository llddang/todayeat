/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HomeCalendarWeek from './home-calendar-week';
import HomeCalendarMonth from './home-calendar-month';
import DateSelectorMobile from './date-selector-mobile';
import { useDateContext } from '../../contexts/date.context';
import { DailyMealCalories } from '@/types/nutrition.type';
import useIsMobile from '@/hooks/use-is-mobile';
import Responsive from '@/components/commons/responsive';
import DateSelectorPc from './date-selector-pc';

type HomeCalendarClientViewProps = {
  dailyMealCalories: DailyMealCalories;
};
const HomeCalendarClientView = ({ dailyMealCalories }: HomeCalendarClientViewProps) => {
  const { setDailyMealCalories } = useDateContext();
  const [currentTab, setCurrentTab] = useState('week');

  const isMobile = useIsMobile();

  useEffect(() => {
    setDailyMealCalories(dailyMealCalories);
  }, []);

  useEffect(() => {
    setCurrentTab(isMobile ? 'week' : 'month');
  }, [isMobile]);

  return (
    <>
      <Tabs
        value={currentTab}
        onValueChange={setCurrentTab}
        className="space-y-5 px-4 py-7 pt-2 xl:max-w-[23.75rem] xl:space-y-2"
      >
        <div className="relative flex w-full justify-between">
          <Responsive mobile={<DateSelectorMobile />} pc={<DateSelectorPc />} />
          <TabsList className="xl:hidden">
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
    </>
  );
};
export default HomeCalendarClientView;
