import Calendar from '@/components/ui/calendar';
import { ko } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useEffect, useState } from 'react';
import { useDashboard } from '@/app/(home)/contexts/dashboard.context';
import { useCalendar } from '@/app/(home)/contexts/calendar.context';
import { formatDateToLocaleKR } from '@/lib/utils/format.util';

type HomeCalendarBottomUpSelectorProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
const HomeCalendarBottomUpSelector = ({ open, onOpenChange }: HomeCalendarBottomUpSelectorProps) => {
  const { selectedDate, setSelectedDate } = useDashboard();
  const { setCurrentDate } = useCalendar();

  const [date, setDate] = useState<Date>(selectedDate);

  const handleSelectDate = () => {
    setSelectedDate(date);
    setCurrentDate(date);
    onOpenChange(false);
  };

  useEffect(() => {
    if (open) setDate(selectedDate);
  }, [open, selectedDate]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>날짜 선택</DrawerTitle>
          <DrawerDescription>섭취 정보를 조회할 날짜를 선택하세요.</DrawerDescription>
        </DrawerHeader>
        <Calendar
          locale={ko}
          selected={date}
          onDayClick={setDate}
          weekStartsOn={1}
          fixedWeeks
          defaultMonth={date}
          formatters={{ formatCaption: formatDateToLocaleKR }}
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
export default HomeCalendarBottomUpSelector;
