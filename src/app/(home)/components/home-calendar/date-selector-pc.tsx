import { Button } from '@/components/ui/button';
import { ko } from 'date-fns/locale';
import Calendar from '@/components/ui/calendar';
import { formatDateToLocaleKR } from '@/utils/format.util';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle
} from '@radix-ui/react-dialog';
import { Typography } from '@/components/ui/typography';
import { DrawerTrigger } from '@/components/ui/drawer';
import useDateSelector from '../../hooks/use-date-selector';

const DateSelectorPc = () => {
  const { currentDate, date, setDate, handleOpen, handleClose } = useDateSelector();

  return (
    <Dialog>
      <DrawerTrigger asChild>
        <Button
          variant="icon"
          size="lg"
          className="after:bg-down-line-gray-600-icon hover:after:bg-down-line-gray-800-icon disabled:after:bg-down-line-gray-400-icon xl:pl-1"
          onClick={handleOpen}
        >
          {formatDateToLocaleKR(currentDate)}
        </Button>
      </DrawerTrigger>
      <DialogOverlay className="bg-transparent" />
      <DialogContent className="absolute top-full z-layout w-[24.5rem] rounded-3xl bg-white p-5 shadow-modal">
        <div className="sr-only">
          <DialogTitle asChild>
            <Typography as="h3">날짜 선택</Typography>
          </DialogTitle>
          <DialogDescription asChild>
            <Typography>섭취 정보를 조회할 날짜를 선택하세요.</Typography>
          </DialogDescription>
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
        <DialogClose asChild className="!mt-2 w-full py-2 layout-container">
          <Button onClick={handleClose} className="w-full">
            날짜 선택 완료
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
export default DateSelectorPc;
