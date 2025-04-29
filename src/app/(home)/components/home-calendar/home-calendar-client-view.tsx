/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import HomeCalendarWeek from './home-calendar-week';
import HomeCalendarMonth from './home-calendar-month';
import DateSelectorMobile from './date-selector-mobile';
import { useDateContext } from '../../contexts/date.context';
import { formatDateToLocaleKR } from '@/utils/format.util';
import { DailyMealCalories } from '@/types/nutrition.type';
import useIsMobile from '@/hooks/use-is-mobile';
import Responsive from '@/components/commons/responsive';
import DateSelectorPc from './date-selector-pc';

type HomeCalendarClientViewProps = {
  dailyMealCalories: DailyMealCalories;
};
const HomeCalendarClientView = ({ dailyMealCalories }: HomeCalendarClientViewProps) => {
  const { currentDate, setDailyMealCalories } = useDateContext();
  const [isOpen, setIsOpen] = useState(false);
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
          <Button
            variant="icon"
            size="lg"
            className="after:bg-down-line-gray-600-icon hover:after:bg-down-line-gray-800-icon disabled:after:bg-down-line-gray-400-icon xl:pl-1"
            onClick={() => setIsOpen(true)}
          >
            {formatDateToLocaleKR(currentDate)}
          </Button>
          <TabsList className="xl:hidden">
            <TabsTrigger value="week">주간</TabsTrigger>
            <TabsTrigger value="month">월간</TabsTrigger>
          </TabsList>
          <Responsive
            mobile={<DateSelectorMobile open={isOpen} onOpenChange={setIsOpen} />}
            pc={<DateSelectorPc open={isOpen} onOpenChange={setIsOpen} />}
            mode="js"
          />
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
