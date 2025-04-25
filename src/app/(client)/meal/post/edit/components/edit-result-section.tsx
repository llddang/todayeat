'use client';

import { AiResponseDTO } from '@/types/DTO/ai_analysis.dto';
import { MealCategory } from '@/types/meal-category.type';
import { createMealWithDetails, deleteMealAnalysisDetail } from '@/apis/meal.api';
import { uploadImage } from '@/apis/storage.api';
import SITE_MAP from '@/constants/site-map.constant';
import { formatTimestamp } from '@/utils/format.util';
import { urlToFile } from '../../../utils/file.util';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EditCard from './edit-card';
import MealImageCarousel from '../../../components/meal-images-carousel';
import { Typography } from '@/components/ui/typography';
import GlassBackground from '@/components/commons/glass-background';
import TagSelectItem from '@/components/commons/tag-select-item';
import Textarea from '@/components/commons/textarea';
import { Button } from '@/components/ui/button';
import TimePicker, { TimeFields } from './time-picker';
import { MAX_MEMO_LENGTH, MEAL_CATEGORY } from '../constants/meal-edit.constant';
import MacronutrientBox from '@/components/commons/macronutrient-box';
import { MacronutrientEnum } from '@/types/nutrition.type';
import MacroNutrientPieChart from '@/components/commons/macronutrient-pie-chart';
import EditCalendarDrawer from './edit-calendar-drawer';
import AddMealCardDrawer from './add-meal-card-drawer';

type EditResultSectionProps = {
  imageList: string[];
  initialMealList: Omit<AiResponseDTO, 'id'>[];
};

const EditResultSection = ({ imageList, initialMealList }: EditResultSectionProps): JSX.Element => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [totalNutrient, setTotalNutrient] = useState({ calories: 0, protein: 0, carbohydrate: 0, fat: 0 });
  const { meridiem, hours, minutes } = getTimeFieldsFromDate();

  const mealFormMethods = useForm({
    resolver: zodResolver(mealEditFormSchema),
    defaultValues: {
      mealImages: imageList,
      mealList: initialMealList,
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
  const {
    fields: mealCardList,
    remove,
    append
  } = useFieldArray({
    control: mealFormMethods.control,
    name: 'mealList'
  });
  const day = mealFormMethods.getValues('date.day');
  const date = mealFormMethods.getValues('date');

  useEffect(() => {
    const sumTotalNutrient = mealCardList.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        carbohydrate: acc.carbohydrate + meal.carbohydrate,
        protein: acc.protein + meal.protein,
        fat: acc.fat + meal.fat
      }),
      { calories: 0, protein: 0, carbohydrate: 0, fat: 0 }
    );
    setTotalNutrient(sumTotalNutrient);
  }, [mealCardList]);

  const handleDayChange = (day: Date) => mealFormMethods.setValue('date.day', day);
  const handleTimeChange = (time: TimeFields) => {
    mealFormMethods.setValue('date.meridiem', time.meridiem);
    mealFormMethods.setValue('date.hours', time.hours);
    mealFormMethods.setValue('date.minutes', time.minutes);
  };

  const onSubmit = async (form: MealEditFormData) => {
    setIsLoading(true);
    try {
      if (!form) {
        return alert(' 데이터 형식이 올바르지 않습니다.');
      }

      const { date, memo, mealCategory, mealList, mealImages } = form;
      const ateAt = formatTimestamp(date);
      const storedImageUrls = await uploadMealImages(mealImages);

      const newMeals = {
        foodImages: storedImageUrls,
        ateAt,
        mealCategory,
        memo
      };
      const { mealDetails } = await createMealWithDetails(
        newMeals,
        mealList.map((meal) => ({
          menuName: meal.menuName,
          weight: meal.weight,
          calories: meal.calories,
          carbohydrate: meal.carbohydrate,
          protein: meal.protein,
          fat: meal.fat
        }))
      );
      if (mealDetails) {
        await deleteMealAnalysisDetail();
        router.push(SITE_MAP.HOME);
      }
    } catch (err) {
      alert('식사 정보 등록에 실패했습니다. 잠시후 다시 시도해주세요');
      console.error('식사 정보 등록에 실패했습니다.', err);
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMeal = (newMeal: Omit<AiResponseDTO, 'id'>) => {
    append(newMeal);
  };

  const handleRemoveMeal = (index: number) => {
    remove(index);
    const currentValues = mealFormMethods.getValues();
    mealFormMethods.reset(currentValues);
  };

  const mealCategoryField = mealFormMethods.register('mealCategory');
  const selectedMealCategory = mealFormMethods.watch('mealCategory');

  return (
    <div className="flex flex-col gap-6 px-4 pb-4 pt-2">
      <MealImageCarousel imageList={imageList} />
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <Typography as="p" variant="body1" className="px-1">
            총 영양 정보
          </Typography>
          <div className="flex min-h-[13.125rem] w-full min-w-0 items-center justify-center gap-3 rounded-2xl bg-white/50 p-3 backdrop-blur-[50px]">
            <MacroNutrientPieChart data={totalNutrient} displayCalories={true} className="w-[14.5625rem]" />
            <div className="flex w-[5.75rem] flex-col items-start justify-center gap-4 px-1">
              <MacronutrientBox variety={MacronutrientEnum.CARBOHYDRATE} value={totalNutrient.carbohydrate} />
              <MacronutrientBox variety={MacronutrientEnum.PROTEIN} value={totalNutrient.protein} />
              <MacronutrientBox variety={MacronutrientEnum.FAT} value={totalNutrient.fat} />
            </div>
          </div>
        </div>
        <FormProvider {...mealFormMethods}>
          <form onSubmit={mealFormMethods.handleSubmit(onSubmit)}>
            <section className="flex flex-col gap-3">
              <Typography className="pl-1">
                음식 정보
                <Typography variant="subTitle2" as="span" className="ml-2">
                  {mealCardList.length}
                </Typography>
              </Typography>
              {mealCardList.map((meal, idx) => (
                <EditCard key={meal.id} idx={idx} mealDetail={meal} onRemove={() => handleRemoveMeal(idx)} />
              ))}
              <AddMealCardDrawer onAddMeal={handleAddMeal} />
            </section>
            <section className="my-10 flex w-full flex-col items-start justify-center gap-3">
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
                      checked={selectedMealCategory === option.value}
                      {...mealCategoryField}
                    />
                  ))}
                </div>
                <div className="flex w-full gap-2">
                  <EditCalendarDrawer date={day} onDateChange={handleDayChange} />
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
                  maxLength={MAX_MEMO_LENGTH}
                  placeholder="예시) 스트레스로 폭식했다, 기분 좋게 잘먹었다, 이 음식 먹고 속이 안 좋았다."
                />
              </GlassBackground>
            </section>
            <Button type="submit" className="mt-3 w-full" disabled={isLoading}>
              제출하기
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default EditResultSection;

const mealListSchema = z.object({
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
export type MealEditFormDataType = z.infer<typeof mealEditFormSchema>;

const uploadMealImages = async (imageUrls: string[]): Promise<string[]> => {
  const files = await Promise.all(imageUrls.map((url, idx) => urlToFile(url, idx)));
  const storedImageUrls: string[] = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);
    const { data: fileUrl } = await uploadImage('meal', formData);
    if (fileUrl) {
      storedImageUrls.push(fileUrl);
    }
  }

  return storedImageUrls;
};
const getTimeFieldsFromDate = (date: Date = new Date()): TimeFields => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const meridiem = hours < 12 ? '오전' : '오후';
  const formattedHours = String(hours % 12 || 12).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return {
    meridiem,
    hours: formattedHours,
    minutes: formattedMinutes
  };
};
