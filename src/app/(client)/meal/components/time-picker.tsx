'use client';
import IconButton from '@/components/commons/icon-button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { Typography } from '@/components/ui/typography';
import { useState } from 'react';
import Picker from 'react-mobile-picker';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { dateSchema } from '../detail/components/meal-detail-section';
import { dateSelections } from '../post/edit/utils/time-picker.util';

type TimePickerProps = {
  currentTime: TimeFields;
  onTimeChange: (currentTime: TimeFields) => void;
};

const TimePicker = ({ currentTime, onTimeChange }: TimePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
    <Drawer open={isOpen} onOpenChange={setIsOpen} dismissible={true} handleOnly={true}>
      <DrawerTrigger className="flex flex-1 items-center justify-between gap-2 rounded-lg border-[1px] border-gray-300 bg-white py-[0.81rem] pl-4 pr-3 after:block after:aspect-square after:w-[1.375rem] after:bg-down-line-gray-600-icon after:bg-center after:content-['']">
        <Typography
          as="span"
          variant="body1"
        >{`${currentTime.meridiem} ${currentTime.hours}:${currentTime.minutes}`}</Typography>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerTitle className="flex items-center gap-4 self-stretch pl-1">
          <Typography as="span" className="flex-1" variant="subTitle2">
            식사 시간 설정
          </Typography>
          <DrawerDescription className="sr-only">식사시간을 설정 할 수 있습니다.</DrawerDescription>
          <DrawerClose asChild>
            <IconButton icon="before:bg-close-line-icon" alt="닫기" />
          </DrawerClose>
        </DrawerTitle>

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

        <DrawerFooter>
          <DrawerClose asChild>
            <Button type="button" onClick={handleSelectedTime}>
              설정
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default TimePicker;

const selections = dateSelections();
export type TimeFields = Omit<z.infer<typeof dateSchema>, 'day'>;
