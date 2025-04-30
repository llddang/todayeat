import Calendar from '@/components/ui/calendar';
import { ko } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { useState } from 'react';
import { Typography } from '@/components/ui/typography';
import { formatDateToLocaleKR } from '@/utils/format.util';

type MealCalendarDrawerProps = {
  date: Date;
  onDateChange: (date: Date) => void;
};
const MealCalendarDrawer = ({ onDateChange }: MealCalendarDrawerProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectDate = () => {
    onDateChange(date);
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className="flex flex-1 items-center justify-between gap-2 rounded-lg border-[1px] border-gray-300 bg-white py-[0.81rem] pl-4 pr-3 after:block after:aspect-square after:w-[1.375rem] after:bg-down-line-gray-600-icon after:bg-center after:content-['']">
        <Typography as="span" variant="body1">{`${date.getMonth() + 1}월 ${date.getDate()}일`}</Typography>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>식사 시간 설정</DrawerTitle>
        </DrawerHeader>
        <div className="mx-auto flex flex-col justify-center gap-2 desktop-width">
          <Calendar
            locale={ko}
            selected={date}
            onDayClick={setDate}
            weekStartsOn={1}
            fixedWeeks
            defaultMonth={date}
            formatters={{ formatCaption: formatDateToLocaleKR }}
          />
          <div className="!mt-2 w-full pb-4 pt-2 layout-container">
            <Button onClick={handleSelectDate} className="w-full">
              날짜 선택 완료
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
export default MealCalendarDrawer;
