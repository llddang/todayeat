'use client';

import { MealDTO } from '@/types/DTO/meal.dto';
import MealImageCarousel from '../../components/meal-images-carousel';
import { calculateTotalNutrition } from '@/utils/nutrition-calculator.util';
import { MealCategory, MealCategoryType } from '@/types/meal-category.type';
import TagSelectItem from '@/components/commons/tag-select-item';
import TotalNutritionChart from './total-nutrition-chart';
import MealList from './meal-list';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from '@/components/ui/typography';
import GlassBackground from '@/components/commons/glass-background';
import TimePicker, { TimeFields } from '../../post/edit/components/time-picker';
import { Button } from '@/components/ui/button';
import { formatTimestamp } from '@/utils/format.util';
import { updateMeal } from '@/apis/meal.api';
import { MEAL_CATEGORY } from '../../constants/category.constant';
import { ChangeEvent, useMemo } from 'react';
import EditCalendarDrawer from '../../post/edit/components/edit-calendar-drawer';
import MemoBox from './memo-box';

type MealDetailSectionProps = {
  meal: MealDTO;
};

const MealDetailSection = ({ meal }: MealDetailSectionProps) => {
  const { id, ateAt, mealCategory, memo, foodImages, mealDetails } = meal;
  const ateAtDate = useMemo(() => new Date(ateAt), [ateAt]);
  const { register, handleSubmit, setValue, watch, getValues, reset } = useForm<MealDetailFormData>({
    resolver: zodResolver(mealDetailFormSchema),
    defaultValues: {
      mealCategory,
      date: {
        day: ateAtDate,
        meridiem: ateAtDate.getHours() < 12 ? '오전' : '오후',
        hours: String(ateAtDate.getHours() % 12 || 12).padStart(2, '0'),
        minutes: String(ateAtDate.getMinutes()).padStart(2, '0')
      },
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
      alert('식사 정보 수정에 실패했습니다.');
      console.error('Failed to update meal:', error);
      reset();
    }
  };

  return (
    <div className="flex flex-col gap-6 px-4 pb-4 pt-2">
      <MealImageCarousel imageList={imageList} />
      <div className="flex flex-col gap-10">
        <TotalNutritionChart totalNutrition={totalNutrition} />
        <MealList mealDetails={mealDetails} />
        <form onSubmit={handleSubmit(onSubmit)} id="mealDetailForm" className="mt-4 flex flex-col gap-10">
          <section className="flex flex-col gap-3">
            <Typography as="span" variant="body1" className="pl-1">
              식사 시간
            </Typography>
            <GlassBackground className="min-h-auto flex w-full flex-col items-start gap-3 rounded-2xl border-none p-4">
              <div className="scrollbar-hidden flex w-full items-start justify-between gap-2 overflow-x-auto">
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
                <EditCalendarDrawer date={day} onDateChange={handleDayChange} />
                <TimePicker currentTime={time} onTimeChange={handleTimeChange} />
              </div>
            </GlassBackground>
          </section>
          <MemoBox maxLength={200} {...register('memo')} />
        </form>
      </div>
      <Button type="submit" variant="primary" className="w-full" form="mealDetailForm">
        기록 저장하기
      </Button>
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
