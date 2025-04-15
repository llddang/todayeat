'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import HomeCalendarBottomUpSelector from '@/components/_home/home-calendar-bottom-up-selector';
import HomeCalendarMonth from '@/components/_home/home-calendar-month';
import HomeCalendarWeek from '@/components/_home/home-calendar-week';
import { Typography } from '@/components/ui/typography';
import { useCalendar } from '@/lib/contexts/calendar.context';

const HomeCalendar = () => {
  const { currentDate } = useCalendar();
  console.log(currentDate);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Tabs defaultValue="week" className="space-y-5 px-4 py-7 pt-2">
        <div className="flex w-full justify-between">
          <Button
            variant="icon"
            size="sm"
            className="after:bg-down-line-gray-600-icon hover:after:bg-down-line-gray-800-icon disabled:after:bg-down-line-gray-400-icon"
            onClick={() => setIsOpen(true)}
          >
            <Typography>{`${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`}</Typography>
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
      <HomeCalendarBottomUpSelector open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};
export default HomeCalendar;
