'use client';

import { AiResponseDTO } from '@/types/DTO/ai_analysis.dto';
import EditCard from './edit-card';
import MealImageCarousel from '../../../components/meal-images-carousel';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Typography } from '@/components/ui/typography';
import GlassBackground from '@/components/commons/glass-background';
import TagSelectItem from '@/components/commons/tag-select-item';
import MealEditCalendar from './meal-edit-calendar';
import { MealCategory } from '@/types/meal-category.type';
import Textarea from '@/components/commons/textarea';
import { Button } from '@/components/ui/button';
import TimePicker, { TimeFields } from './time-picker';

type EditResultSectionProps = {
  imageList: string[];
  mealList: AiResponseDTO[];
};

const EditResultSection = ({ imageList, mealList }: EditResultSectionProps): JSX.Element => {
  const now = new Date();
  const { meridiem, hours, minutes } = getTimeFieldsFromDate(now);
  const mealFormMethods = useForm({
    resolver: zodResolver(mealEditFormSchema),
    defaultValues: {
      mealImages: imageList,
      mealList: mealList,
      date: {
        day: new Date(),
        meridiem,
        hours,
        minutes
      },
      mealCategory: MealCategory.BREAKFAST,
      memo: ''
    },
    mode: 'onBlur'
  });
  const { fields: mealCardList, remove } = useFieldArray({ control: mealFormMethods.control, name: 'mealList' });

  const day = mealFormMethods.getValues('date.day');
  const date = mealFormMethods.watch('date');
  const handleDayChange = (day: Date) => mealFormMethods.setValue('date.day', day);
  const handleTimeChange = (time: TimeFields) => {
    mealFormMethods.setValue('date.meridiem', time.meridiem);
    mealFormMethods.setValue('date.hours', time.hours);
    mealFormMethods.setValue('date.minutes', time.minutes);
  };

  const onSubmit = (data: MealEditFormData) => {
    console.log(data);
  };

  return (
    <div className="px-4 pb-4 pt-2">
      <MealImageCarousel imageList={imageList} />
      <FormProvider {...mealFormMethods}>
        <form onSubmit={mealFormMethods.handleSubmit(onSubmit)}>
          <div className="mt-10 flex flex-col gap-3">
            <Typography className="pl-1">
              음식 정보
              <Typography variant="subTitle2" as="span" className="ml-2">
                {mealCardList.length}
              </Typography>
            </Typography>
            {mealCardList.map((meal, idx) => (
              <EditCard key={meal.id} idx={idx} mealDetail={meal} onRemove={remove} />
            ))}
          </div>

          <section className="my-10 flex w-full flex-col items-start justify-center gap-3">
            <Typography as="h3" variant="body1" className="pl-1">
              식사 시간
            </Typography>
            <GlassBackground className="min-h-auto flex w-full flex-col items-start gap-3 rounded-2xl border-none p-4">
              <div className="scrollbar-hidden flex w-full items-start justify-between gap-2 overflow-x-auto">
                {MEAL_CATEGORY.map((option) => {
                  const field = mealFormMethods.register('mealCategory');
                  const selected = mealFormMethods.watch('mealCategory');
                  return (
                    <TagSelectItem
                      key={option.value}
                      id={option.value}
                      groupName="MEAL_CATEGORY"
                      icon={option.icon}
                      label={option.label}
                      value={option.value}
                      checked={selected === option.value}
                      {...field}
                    />
                  );
                })}
              </div>
              <div className="flex w-full gap-2">
                <MealEditCalendar date={day} onDateChange={handleDayChange} />
                <TimePicker currentTime={date} onTimeChange={handleTimeChange} />
              </div>
            </GlassBackground>
          </section>
          <section className="space-y-3">
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
                {...mealFormMethods.register('memo')}
                className="min-h-60 text-gray-500"
                maxLength={200}
                placeholder="예시) 스트레스로 폭식했다, 기분 좋게 잘먹었다, 이 음식 먹고 속이 안 좋았다."
              />
            </GlassBackground>
          </section>
          <Button type="submit" className="mt-3 w-full">
            제출하기
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditResultSection;

const mealListSchema = z.object({
  id: z.string(),
  userId: z.string(),
  menuName: z.string(),
  weight: z.coerce.number(),
  calories: z.coerce.number(),
  carbohydrate: z.coerce.number(),
  protein: z.coerce.number(),
  fat: z.coerce.number()
});

export const dateSchema = z.object({
  day: z.date(),
  meridiem: z.enum(['오전', '오후']),
  hours: z.string(),
  minutes: z.string()
});

const mealEditFormSchema = z.object({
  mealImages: z.array(z.string()),
  mealList: z.array(mealListSchema),
  date: dateSchema,
  mealCategory: z.nativeEnum(MealCategory),
  memo: z.string()
});

type MealEditFormData = z.infer<typeof mealEditFormSchema>;

const MEAL_CATEGORY = [
  {
    value: MealCategory.BREAKFAST,
    label: '아침',
    icon: 'before:bg-meal-category-breakfast'
  },
  {
    value: MealCategory.LUNCH,
    label: '점심',
    icon: 'before:bg-meal-category-lunch'
  },
  {
    value: MealCategory.DINNER,
    label: '저녁',
    icon: 'before:bg-meal-category-dinner'
  },
  {
    value: MealCategory.SNACK,
    label: '간식',
    icon: 'before:bg-meal-category-snack'
  }
];
export type MealEditFormDataType = z.infer<typeof mealEditFormSchema>;

const getTimeFieldsFromDate = (date: Date = new Date()): TimeFields => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return {
    meridiem: hours < 12 ? '오전' : '오후',
    hours: String(hours % 12 === 0 ? 12 : hours % 12).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0')
  };
};
