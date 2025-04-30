'use client';

import { MealDTO } from '@/types/DTO/meal.dto';
import { ChangeEvent, useMemo, useState } from 'react';
import { ErrorMessage } from '../../_utils/error.util';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { calculateTotalNutrition } from '@/utils/nutrition-calculator.util';
import { MealCategory, MealCategoryType } from '@/types/meal-category.type';
import TimePicker, { TimeFields } from '../../_components/time-picker';
import { updateMeal } from '@/apis/meal.api';
import { formatTimestamp } from '@/utils/format.util';
import { ERROR_MESSAGES } from '../../post/edit/_constants/error-message.constant';
import MealImageCarousel from '../../_components/meal-images-carousel';
import TotalNutritionChart from './total-nutrition-chart';
import MealList from './meal-list';
import { Typography } from '@/components/ui/typography';
import GlassBackground from '@/components/commons/glass-background';
import { MEAL_CATEGORY } from '../../_constants/category.constant';
import TagSelectItem from '@/components/commons/tag-select-item';
import Responsive from '@/components/commons/responsive';
import MealCalendarPc from '../../_components/meal-calendar-pc';
import MealCalendarDrawer from '../../_components/meal-calendar-drawer';
import TimePickerPc from '../../_components/time-picker-pc';
import MemoBox from './memo-box';
import { Button } from '@/components/ui/button';
import Modal from '@/components/commons/modal';
import { z } from 'zod';
import { getTimeFieldsFromDate } from '@/utils/date.util';

type MealDetailSectionProps = {
  meal: MealDTO;
};

const MealDetailSection = ({ meal }: MealDetailSectionProps) => {
  const { id, ateAt, mealCategory, memo, foodImages, mealDetails } = meal;
  const ateAtDate = useMemo(() => new Date(ateAt), [ateAt]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ErrorMessage>({
    title: '',
    description: ''
  });
  const { register, handleSubmit, setValue, watch, getValues, reset } = useForm<MealDetailFormData>({
    resolver: zodResolver(mealDetailFormSchema),
    defaultValues: {
      mealCategory,
      date: getTimeFieldsFromDate(ateAtDate),
      memo: memo || ''
    }
  });

  const imageList = validateFoodImages(foodImages);
  const totalNutrition = calculateTotalNutrition([meal]);
  const selectedCategory = watch('mealCategory');
  const day = getValues('date.day');
  const time = watch('date');

  const handleDayChange = (day: Date) => setValue('date.day', day);

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value as MealCategoryType;
    setValue('mealCategory', category);
  };

  const handleTimeChange = (time: TimeFields) => {
    setValue('date.meridiem', time.meridiem);
    setValue('date.hours', time.hours);
    setValue('date.minutes', time.minutes);
  };

  const onSubmit = async (form: MealDetailFormData) => {
    try {
      await updateMeal(id, {
        mealCategory: form.mealCategory,
        memo: form.memo,
        ateAt: formatTimestamp(form.date)
      });
      alert('식사 정보가 수정되었습니다.');
    } catch (error) {
      const isKnownError = typeof error === 'object' && error !== null && 'title' in error && 'description' in error;
      error = isKnownError ? error : ERROR_MESSAGES.MEAL_POST_FAILED;
      setModalInfo(error as ErrorMessage);
      setIsModalOpen(true);
      reset();
    }
  };

  return (
    <div className="flex flex-col gap-6 px-4 pb-4 pt-2 desktop-width xl:w-full xl:flex-row xl:gap-5 xl:px-[3.125rem] xl:pb-0 xl:pt-0">
      <MealImageCarousel imageList={imageList} />
      <div className="flex flex-col gap-10 xl:mx-auto xl:w-[45rem]">
        <TotalNutritionChart totalNutrition={totalNutrition} />
        <MealList mealDetails={mealDetails} />
        <form onSubmit={handleSubmit(onSubmit)} id="mealDetailForm" className="mt-4 flex flex-col gap-10">
          <section className="flex flex-col gap-3">
            <Typography as="span" variant="body1" className="pl-1">
              식사 시간
            </Typography>
            <GlassBackground className="min-h-auto flex w-full flex-col items-start gap-3 rounded-2xl border-none p-4">
              <div className="scrollbar-hidden flex w-full gap-2 overflow-x-auto">
                {MEAL_CATEGORY.map((option) => (
                  <TagSelectItem
                    key={option.value}
                    id={option.value}
                    groupName="MEAL_CATEGORY"
                    icon={option.icon}
                    label={option.label}
                    value={option.value}
                    checked={selectedCategory === option.value}
                    onChange={handleCategoryChange}
                  />
                ))}
              </div>
              <div className="flex w-full gap-2">
                <Responsive
                  pc={<MealCalendarPc date={day} onDateChange={handleDayChange} />}
                  mobile={<MealCalendarDrawer date={day} onDateChange={handleDayChange} />}
                  mode="js"
                />
                <Responsive
                  pc={<TimePickerPc currentTime={time} onTimeChange={handleTimeChange} />}
                  mobile={<TimePicker currentTime={time} onTimeChange={handleTimeChange} />}
                  mode="js"
                />
              </div>
            </GlassBackground>
          </section>
          <MemoBox maxLength={200} {...register('memo')} />
        </form>
        <div className="flex w-full justify-end">
          <Button type="submit" variant="primary" className="w-full xl:w-auto" form="mealDetailForm">
            기록 저장하기
          </Button>
        </div>
      </div>
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen} title={modalInfo.title} content={modalInfo.description} />
    </div>
  );
};

export default MealDetailSection;

const validateFoodImages = (foodImages: string[] | null): string[] => {
  if (Array.isArray(foodImages)) {
    return foodImages;
  }

  return [];
};

export const dateSchema = z.object({
  day: z.date(),
  meridiem: z.enum(['오전', '오후']),
  hours: z.string(),
  minutes: z.string()
});

const mealDetailFormSchema = z.object({
  date: dateSchema,
  mealCategory: z.nativeEnum(MealCategory),
  memo: z.string()
});

type MealDetailFormData = z.infer<typeof mealDetailFormSchema>;
