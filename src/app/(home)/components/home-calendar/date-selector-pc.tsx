import { Button } from '@/components/ui/button';
import { ko } from 'date-fns/locale';
import { useDashboard } from '../../contexts/dashboard.context';
import { useCalendar } from '../../contexts/calendar.context';
import { useEffect, useState } from 'react';
import Calendar from '@/components/ui/calendar';
import { formatDateToLocaleKR } from '@/utils/format.util';
import { Dialog, DialogContent, DialogOverlay } from '@radix-ui/react-dialog';
import { Typography } from '@/components/ui/typography';

type DateSelectorPcProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
const DateSelectorPc = ({ open, onOpenChange }: DateSelectorPcProps) => {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-transparent" />
      <DialogContent className="absolute top-full z-layout w-[24.5rem] rounded-3xl bg-white p-5 shadow-modal">
        <div className="sr-only">
          <Typography as="h3">날짜 선택</Typography>
          <Typography>섭취 정보를 조회할 날짜를 선택하세요.</Typography>
        </div>
        <Calendar
          locale={ko}
          selected={date}
          onDayClick={setDate}
          weekStartsOn={1}
          defaultMonth={date}
          fixedWeeks
          formatters={{ formatCaption: formatDateToLocaleKR }}
          classNames={{ month: 'space-y-3' }}
        />
        <div className="!mt-2 w-full py-2 layout-container">
          <Button onClick={handleSelectDate} className="w-full">
            날짜 선택 완료
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DateSelectorPc;
