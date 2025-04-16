'use client';

import MealPostEditCard from '@/components/_meal/_post/meal-post-edit-card';
import MealImageCarousel from '@/components/_meal/meal-images-carousel';
import TagSelectItem from '@/components/commons/tag-select-item';
import Textarea from '@/components/commons/textarea';
import { Typography } from '@/components/ui/typography';
import { getFoodAnalysisDetail, getFoodImagesById } from '@/lib/apis/analysis-request.api';
import { getUser } from '@/lib/apis/user.api';
import { FoodAnalysisRequestsDetailDTO } from '@/types/DTO/food_analysis.dto';
import { MealCategory } from '@/types/meal-category.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
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
import { urlToFile } from '@/lib/utils/file.util';
import { uploadImage } from '@/lib/apis/storage.api';
import { formatToDateTimeString } from '@/lib/utils/date.util';
import { createMealWithDetails } from '@/lib/apis/meal.api';
import { MealDTO } from '@/types/DTO/meal.dto';

const MealPostEditPage = () => {
  const mealFormMethods = useForm<MealFormData>({
    resolver: zodResolver(mealEditFormSchema),
    defaultValues: {
      meals: [],
      mealList: [],
      mealCategory: MealCategory.BREAKFAST,
      date: {
        meridiem: '오전',
        hours: '09',
        minutes: '00'
      }
    }
  });

  useEffect(() => {
    const fetchFoodAnalysisRequests = async () => {
      const { id: userId } = await getUser();
      const { data: initialImages } = await getFoodImagesById(userId);
      const mealList = await getFoodAnalysisDetail();

      if (initialImages) {
        setFoodImages(initialImages?.image_urls);
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
  const [tempTime, setTempTime] = useState<MealFormData['date']>({
    meridiem: '오전',
    hours: '12',
    minutes: '00'
  });

  const date = mealFormMethods.watch('date');
  const mealList = mealFormMethods.watch('mealList');

  const onSubmit = async (data: MealFormData) => {
    const files = await Promise.all(foodImages.map((url, idx) => urlToFile(url, idx)));
    const imagesFormData = new FormData();

    if (!data) {
      return alert(' 데이터 형식이 올바르지 않습니다.');
    }

    const ateAt = formatToDateTimeString(data.date);
    const { memo, mealCategory } = data;
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
    const { mealDetails } = await createMealWithDetails(
      newMeals as Pick<MealDTO, 'ateAt' | 'foodImages' | 'memo' | 'mealCategory'>,
      newMealDetails
    );
    console.log('mealDetails', mealDetails);
  };
  return (
    <div className="w-[450px]">
      <FormProvider {...mealFormMethods}>
        <form
          onSubmit={mealFormMethods.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center rounded-xl px-4 pb-4 pt-2"
        >
          <MealImageCarousel imageList={foodImages} pagination={true} />
          <div className="flex flex-col items-center gap-4">
            {mealList.map((meal, idx) => (
              <MealPostEditCard key={idx} idx={idx} mealDetail={meal} />
            ))}
          </div>
          <section className="my-10 flex w-full flex-col items-start justify-center gap-3 p-4">
            <Typography as="h3" variant="body1">
              식사 시간
            </Typography>
            <div className="flex w-full flex-col items-start gap-3 p-4">
              <div className="flex items-start gap-2">
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

              <Drawer
                onOpenChange={(open) => {
                  if (open) {
                    const currenTime = mealFormMethods.getValues('date');
                    setTempTime(currenTime);
                  }
                }}
              >
                <DrawerTrigger>{`${date.meridiem} ${date.hours}:${date.minutes}`}</DrawerTrigger>
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
          </section>

          <section className="flex flex-col items-center gap-3">
            <Typography as="h3" variant="body1">
              식사 일기
            </Typography>
            <div className="flex w-full flex-col gap-3 rounded-2xl bg-white/50 p-4 backdrop-blur-[50px]">
              <div className="flex items-start gap-1">
                <img src="/icons/edit_4_line.svg" className="h-[1.125rem] w-[1.125rem]" alt="메모" />
                <Typography as="span" variant="subTitle3" className="text-gray-600">
                  음식을 먹을 때 어떤 기분이었는지 간단하게 적어주세요. 식습관을 돌아보는데 큰 도움이 돼요!
                </Typography>
              </div>
              <Textarea
                {...mealFormMethods.register('memo')}
                className="text-gray-500"
                maxLength={200}
                placeholder="예시) 스트레스로 폭식했다. 기분 좋게 잘먹었다, 이 음식 먹고 속이 안좋았다."
              />
            </div>
          </section>
          <button type="submit">제출하기</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default MealPostEditPage;

export const mealInputSchema = z.object({
  menuName: z.string(),
  weight: z.coerce.number(),
  calories: z.coerce.number()
});

export const mealListSchema = z.object({
  userId: z.string(),
  menuName: z.string(),
  weight: z.coerce.number(),
  calories: z.coerce.number(),
  carbohydrate: z.coerce.number(),
  protein: z.coerce.number(),
  fat: z.number()
});

export const mealEditFormSchema = z.object({
  meals: z.array(mealInputSchema),
  mealList: z.array(mealListSchema),
  mealCategory: z.nativeEnum(MealCategory),
  date: z.object({
    meridiem: z.enum(['오전', '오후']),
    hours: z.string(),
    minutes: z.string()
  }),
  memo: z.string().max(200, '').optional()
});

export type MealFormData = z.infer<typeof mealEditFormSchema>;
export type mealInputSchema = z.infer<typeof mealInputSchema>;
export type mealListSchema = z.infer<typeof mealListSchema>;
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
