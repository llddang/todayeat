'use client';
import { Button } from '@/components/ui/button';
import Calendar from '@/components/ui/calendar';
import { Typography } from '@/components/ui/typography';
import { formatDateToLocaleKR } from '@/utils/format.util';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { ko } from 'date-fns/locale';
import React, { useState } from 'react';

type EditCalendarPcProps = {
  date: Date;
  onDateChange: (date: Date) => void;
};

const EditCalendarPc = ({ onDateChange }: EditCalendarPcProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  const handleSelectDate = () => {
    onDateChange(date);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex flex-1 items-center justify-between gap-2 rounded-lg border-[1px] border-gray-300 bg-white py-[0.81rem] pl-4 pr-3 after:block after:aspect-square after:w-[1.375rem] after:bg-down-line-gray-600-icon after:bg-center after:content-['']">
        <Typography as="span" variant="body1">{`${date.getMonth() + 1}월 ${date.getDate()}일`}</Typography>
      </DialogTrigger>
      <DialogContent className="absolute top-full z-[1000] w-[21.25rem] rounded-3xl bg-white p-5 shadow-modal">
        <div className="sr-only">
          <DialogTitle>날짜 선택</DialogTitle>
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

export default EditCalendarPc;
