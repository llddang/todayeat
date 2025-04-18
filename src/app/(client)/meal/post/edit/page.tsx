'use client';

import MealImageCarousel from '@/app/(client)/meal/components/meal-images-carousel';
import TagSelectItem from '@/components/commons/tag-select-item';
import Textarea from '@/components/commons/textarea';
import { Typography } from '@/components/ui/typography';
import { getAiResponses, getFoodImagesById } from '@/apis/analysis-request.api';
import { getUser } from '@/apis/user.api';
import { MealCategory } from '@/types/meal-category.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import Picker from 'react-mobile-picker';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import IconButton from '@/components/commons/icon-button';
import { uploadImage } from '@/apis/storage.api';
import { formatTimestamp } from '@/utils/format.util';
import { createMealWithDetails, deleteMealAnalysisDetail } from '@/apis/meal.api';
import { MealDTO } from '@/types/DTO/meal.dto';
import MealEditCalendar from '@/app/(client)/meal/post/edit/components/meal-edit-calendar';
import GlassBackground from '@/components/commons/glass-background';
import { useRouter } from 'next/navigation';
import SITE_MAP from '@/constants/site-map.constant';
import dynamic from 'next/dynamic';
import EditCard from './components/edit-card';
import { urlToFile } from '../../utils/file.util';
const AiLoaderLottie = dynamic(() => import('@/components/commons/ai-loader-lottie'), {
  ssr: false
});

const MealPostEditPage = () => {
  const mealFormMethods = useForm<MealEditFormDataType>({
    resolver: zodResolver(mealEditFormSchema),
    defaultValues: {
      meals: [],
      mealList: [],
      mealCategory: MealCategory.BREAKFAST,
      memo: '',
      date: {
        meridiem: '오전',
        hours: '09',
        minutes: '00'
      },
      day: new Date()
    }
  });

  const day = mealFormMethods.getValues('day');
  const handleDayChange = (day: Date) => mealFormMethods.setValue('day', day);

  useEffect(() => {
    const fetchFoodAnalysisRequests = async () => {
      const { id: userId } = await getUser();
      const { data: initialImages } = await getFoodImagesById(userId);
      const mealList = await getAiResponses();

      if (initialImages) {
        setFoodImages(initialImages?.imageUrls);
      }
      if (mealList) {
        mealFormMethods.setValue('mealList', mealList);
        mealFormMethods.setValue(
          'meals',
          mealList.map((meal) => ({
            menuName: meal.menuName,
            weight: meal.weight,
            calories: meal.calories
          }))
        );
      }
    };
    fetchFoodAnalysisRequests();
  }, []);

  const [foodImages, setFoodImages] = useState<string[]>([]);
  const [tempTime, setTempTime] = useState<MealEditFormDataType['date']>({
    meridiem: '오전',
    hours: '12',
    minutes: '00'
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const date = mealFormMethods.watch('date');
  const mealList = mealFormMethods.watch('mealList');

  const onSubmit = async (data: MealEditFormDataType) => {
    const files = await Promise.all(foodImages.map((url, idx) => urlToFile(url, idx)));
    const imagesFormData = new FormData();
    setIsLoading(true);
    try {
      if (!data) {
        return alert(' 데이터 형식이 올바르지 않습니다.');
      }

      const { date, day, memo, mealCategory } = data;
      const ateAt = formatTimestamp(day, date);

      for (const file of files) {
        imagesFormData.append('file', file);
        await uploadImage('meal', imagesFormData);
      }

      const newMeals = {
        foodImages,
        ateAt,
        mealCategory,
        memo
      };

      const newMealDetails = mealList.map((meal) => ({
        menuName: meal.menuName,
        weight: meal.weight,
        calories: meal.calories,
        carbohydrate: meal.carbohydrate,
        protein: meal.protein,
        fat: meal.fat
      }));

      console.log(newMealDetails);

      const { mealDetails } = await createMealWithDetails(
        newMeals as Pick<MealDTO, 'ateAt' | 'foodImages' | 'memo' | 'mealCategory'>,
        newMealDetails
      );
      if (mealDetails) {
        await deleteMealAnalysisDetail();
        setIsLoading(false);
        router.push(SITE_MAP.HOME);
      }
    } catch (err) {
      alert('식사 정보 등록에 실패하였습니다. 잠시후 다시 시도해주세요');
      console.error('등록에 실패 했습니다. ', err);
    }
  };

  if (isLoading)
    return (
      <div className="flex min-h-[calc(100vh-60px)] items-center justify-center">
        <AiLoaderLottie />
      </div>
    );

  return (
    <div className="px-4 pb-4 pt-2">
      <FormProvider {...mealFormMethods}>
        <form onSubmit={mealFormMethods.handleSubmit(onSubmit)} className="flex flex-col justify-center rounded-xl">
          <MealImageCarousel imageList={foodImages} pagination={true} />

          <div className="mt-10 flex flex-col gap-3">
            <Typography className="pl-1">
              음식 정보
              <Typography variant="subTitle2" as="span" className="ml-2">
                {mealList.length}
              </Typography>
            </Typography>
            {mealList.map((meal, idx) => (
              <EditCard key={idx} idx={idx} mealDetail={meal} />
            ))}
          </div>

          <section className="my-10 flex w-full flex-col items-start justify-center gap-3">
            <Typography as="h3" variant="body1" className="pl-1">
              식사 시간
            </Typography>
            <GlassBackground className="min-h-auto flex w-full flex-col items-start gap-3 rounded-2xl border-none p-4">
              <div className="flex w-full flex-wrap items-start justify-between gap-2">
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
                <Drawer
                  onOpenChange={(open) => {
                    if (open) {
                      const currenTime = mealFormMethods.getValues('date');
                      setTempTime(currenTime);
                    }
                  }}
                >
                  <DrawerTrigger className="flex flex-1 items-center justify-between gap-2 rounded-lg border-[1px] border-gray-300 bg-white py-[0.81rem] pl-4 pr-3 after:block after:aspect-square after:w-[1.375rem] after:bg-down-line-gray-600-icon after:bg-center after:content-['']">
                    <Typography
                      as="span"
                      variant="body1"
                    >{`${date.meridiem} ${date.hours}:${date.minutes}`}</Typography>
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
                      data-test="test"
                      itemHeight={48}
                      value={tempTime}
                      onChange={(changedTime) => setTempTime(changedTime)}
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
                        <Button
                          type="button"
                          onClick={() => {
                            mealFormMethods.setValue('date', tempTime);
                          }}
                        >
                          설정
                        </Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
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

export default MealPostEditPage;

const mealInputSchema = z.object({
  menuName: z.string(),
  weight: z.coerce.number(),
  calories: z.coerce.number()
});

const mealListSchema = z.object({
  userId: z.string(),
  menuName: z.string(),
  weight: z.coerce.number(),
  calories: z.coerce.number(),
  carbohydrate: z.coerce.number(),
  protein: z.coerce.number(),
  fat: z.number()
});

const mealEditFormSchema = z.object({
  meals: z.array(mealInputSchema),
  mealList: z.array(mealListSchema),
  mealCategory: z.nativeEnum(MealCategory),
  date: z.object({
    meridiem: z.enum(['오전', '오후']),
    hours: z.string(),
    minutes: z.string()
  }),
  day: z.date(),
  memo: z.string().max(200, '').optional()
});

export type MealEditFormDataType = z.infer<typeof mealEditFormSchema>;
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

const hours = Array.from({ length: 13 }, (_, i) => String(i).padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
const selections = {
  meridiem: ['오전', '오후'],
  hours: hours,
  minutes: minutes
};
