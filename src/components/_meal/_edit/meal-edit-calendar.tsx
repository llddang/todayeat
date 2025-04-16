import Calendar from '@/components/ui/calendar';
import { ko } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { useState } from 'react';
import { formatDateCaption } from '@/lib/utils/date.util';
import { Typography } from '@/components/ui/typography';

type MealEditCalendarProps = {
  date: Date;
  onDateChange: (date: Date) => void;
};
const MealEditCalendar = ({ onDateChange }: MealEditCalendarProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectDate = () => {
    onDateChange(date);
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className="flex min-w-40 items-center justify-between gap-2 rounded-lg border-[1px] border-gray-300 bg-white py-[0.81rem] pl-4 pr-3 after:block after:aspect-square after:w-[1.375rem] after:bg-down-line-gray-600-icon after:bg-center after:content-['']">
        <Typography as="span" variant="body1">{`${date.getMonth() + 1}월 ${date.getDate()}일`}</Typography>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>식사 시간 설정</DrawerTitle>
        </DrawerHeader>
        <Calendar
          locale={ko}
          selected={date}
          onDayClick={setDate}
          weekStartsOn={1}
          fixedWeeks
          defaultMonth={date}
          formatters={{ formatCaption: formatDateCaption }}
        />
        {/* TODO: temp-layout 풀기 */}
        <div className="!mt-2 w-full pb-4 pt-2 temp-layout">
          <Button onClick={handleSelectDate} className="w-full">
            날짜 선택 완료
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
export default MealEditCalendar;
