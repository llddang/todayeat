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
import MealEditCalendar from '../../post/edit/components/meal-edit-calendar';
import Textarea from '@/components/commons/textarea';
import { Button } from '@/components/ui/button';
import { formatTimestamp } from '@/utils/format.util';
import { updateMeal } from '@/apis/meal.api';
import { useRouter } from 'next/navigation';
import { MEAL_CATEGORY } from '../../constants/category.constant';
import { useMemo } from 'react';

type MealDetailSectionProps = {
  meal: MealDTO;
};

const MealDetailSection = ({ meal }: MealDetailSectionProps): JSX.Element => {
  const { id, ateAt, mealCategory, memo, foodImages, mealDetails } = meal;
  const ateAtDate = useMemo(() => new Date(ateAt), [ateAt]);
  const router = useRouter();
  const { register, handleSubmit, setValue, watch, getValues } = useForm<MealDetailFormData>({
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      router.refresh();
    } catch (error) {
      console.error('Failed to update meal:', error);
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
            <Typography as="h3" variant="body1" className="pl-1">
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
                <MealEditCalendar date={day} onDateChange={handleDayChange} />
                <TimePicker currentTime={time} onTimeChange={handleTimeChange} />
              </div>
            </GlassBackground>
          </section>
          <section className="flex flex-col gap-3">
            <Typography as="h3" variant="body1" className="pl-1">
              식사 일기
            </Typography>
            <GlassBackground className="min-h-auto flex w-full flex-col gap-3 rounded-2xl border-none">
              <div className="flex items-start justify-between gap-[0.38rem] before:mt-[0.13rem] before:block before:aspect-square before:w-[1.125rem] before:bg-edit-4-icon before:bg-contain before:content-['']">
                <Typography as="span" variant="subTitle3" className="flex-1 !font-medium text-gray-600">
                  음식을 먹을 때 어떤 기분이었는지 간단하게 적어주세요. 식습관을 돌아보는데 큰 도움이 돼요!
                </Typography>
              </div>
              <Textarea
                {...register('memo')}
                className="min-h-60 text-gray-500"
                maxLength={200}
                placeholder="예시) 스트레스로 폭식했다, 기분 좋게 잘먹었다, 이 음식 먹고 속이 안 좋았다."
              />
            </GlassBackground>
          </section>
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
