import { ko } from 'date-fns/locale';
import Calendar from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { formatDateToLocaleKR } from '@/utils/format.util';
import useDateSelector from '../../hooks/use-date-selector';

const DateSelectorMobile = () => {
  const { currentDate, date, setDate, handleOpen, handleClose } = useDateSelector();

  return (
    <Drawer>
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
      <DrawerContent>
        <div className="w-full layout-container">
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
          <DrawerClose asChild className="!mt-2 w-full pb-4 pt-2">
            <Button onClick={handleClose} className="w-full">
              날짜 선택 완료
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
export default DateSelectorMobile;
