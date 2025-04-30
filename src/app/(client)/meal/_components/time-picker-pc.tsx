'use client';

import { Typography } from '@/components/ui/typography';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@radix-ui/react-dialog';
import { useState } from 'react';
import { TimeFields } from './time-picker-mobile';
import IconButton from '@/components/commons/icon-button';
import Picker from 'react-mobile-picker';
import { Button } from '@/components/ui/button';
import { dateSelections } from '../post/edit/_utils/time-picker.util';

type TimePickerPcProps = {
  currentTime: TimeFields;
  onTimeChange: (time: TimeFields) => void;
};

const TimePickerPc = ({ currentTime, onTimeChange }: TimePickerPcProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState<TimeFields>({
    meridiem: currentTime.meridiem,
    hours: currentTime.hours,
    minutes: currentTime.minutes
  });

  const handleSelectedTime = () => {
    onTimeChange(time);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex flex-1 items-center justify-between gap-2 rounded-lg border-[1px] border-gray-300 bg-white py-[0.81rem] pl-4 pr-3 after:block after:aspect-square after:w-[1.375rem] after:bg-down-line-gray-600-icon after:bg-center after:content-['']">
        <Typography
          as="span"
          variant="body1"
        >{`${currentTime.meridiem} ${currentTime.hours}:${currentTime.minutes}`}</Typography>
      </DialogTrigger>

      <DialogContent className="absolute right-0 top-full z-modal w-[21.25rem] rounded-3xl bg-white p-5 shadow-modal">
        <DialogTitle className="flex items-center gap-4 self-stretch pl-1">
          <Typography as="span" className="flex-1" variant="subTitle2">
            식사 시간 설정
          </Typography>
          <DialogDescription className="sr-only">식사시간을 설정 할 수 있습니다.</DialogDescription>
          <DialogClose asChild>
            <IconButton icon="before:bg-close-line-icon" title="닫기" />
          </DialogClose>
        </DialogTitle>

        <Picker
          itemHeight={48}
          value={time}
          onChange={(changedTime) => setTime(changedTime)}
          wheelMode="natural"
          className="w-full"
        >
          {(Object.keys(selections) as (keyof typeof selections)[]).map((name) => (
            <Picker.Column key={name} name={name}>
              {selections[name].map((option) => (
                <Picker.Item key={option} value={option}>
                  {option}
                </Picker.Item>
              ))}
            </Picker.Column>
          ))}
        </Picker>

        <DialogClose asChild>
          <Button type="button" onClick={handleSelectedTime} className="w-full">
            시간 선택 완료
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

const selections = dateSelections();

export default TimePickerPc;
