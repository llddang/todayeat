'use client';

import { AiResponseDTO } from '@/types/DTO/ai_analysis.dto';
import { MealCategory } from '@/types/meal-category.type';
import { createMealWithDetails } from '@/apis/meal.api';
import { uploadImage } from '@/apis/storage.api';
import { formatTimestamp } from '@/utils/format.util';
import { urlToFile } from '../../../_utils/file.util';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState, useCallback, KeyboardEvent } from 'react';
import EditCard from './edit-card';
import MealImageCarousel from '../../../_components/meal-images-carousel';
import { Typography } from '@/components/ui/typography';
import GlassBackground from '@/components/commons/glass-background';
import TagSelectItem from '@/components/commons/tag-select-item';
import { Button } from '@/components/ui/button';
import SITE_MAP from '@/constants/site-map.constant';
import MacronutrientBox from '@/components/commons/macronutrient-box';
import MacronutrientPieChart from '@/components/commons/macronutrient-pie-chart';
import { MacronutrientEnum } from '@/types/nutrition.type';
import { MAX_MEMO_LENGTH } from '../_constants/meal-edit.constant';
import { MEAL_CATEGORY } from '../../../_constants/category.constant';
import MemoBox from '../../../[id]/_components/memo-box';
import Responsive from '@/components/commons/responsive';
import TimePickerPc from '../../../_components/time-picker-pc';
import AddMealCardPc from './add-meal-card-pc';
import Modal from '@/components/commons/modal';
import { ERROR_MESSAGES } from '../_constants/error-message.constant';
import { CreateMealDTO } from '@/types/DTO/meal.dto';
import { deleteAnalysisData } from '@/apis/analysis-request.api';
import { ErrorMessage, handleError } from '../../../_utils/error.util';
import MealCalendarPc from '../../../_components/meal-calendar-pc';
import { getTimeFieldsFromDate } from '@/utils/date.util';
import AddMealCardMobile from './add-meal-card-mobile';
import MealCalendarMobile from '../../../_components/meal-calendar-mobile';
import TimePickerMobile, { TimeFields } from '../../../_components/time-picker-mobile';

type EditResultSectionProps = {
  imageList: string[];
  initialMealList: Omit<AiResponseDTO, 'id'>[];
};

const EditResultSection = ({ imageList, initialMealList }: EditResultSectionProps): JSX.Element => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<{ title: string; description: string }>({
    title: '',
    description: ''
  });

  const mealFormMethods = useForm<MealEditFormData>({
    resolver: zodResolver(mealEditFormSchema),
    defaultValues: {
      mealImages: imageList,
      mealList: initialMealList,
      date: getTimeFieldsFromDate(),
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
  const mealList = mealFormMethods.watch('mealList');
  const totalNutrient = mealList.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      carbohydrate: acc.carbohydrate + meal.carbohydrate,
      protein: acc.protein + meal.protein,
      fat: acc.fat + meal.fat
    }),
    { calories: 0, protein: 0, carbohydrate: 0, fat: 0 }
  );

  const handleAddMeal = useCallback((newMeal: Omit<AiResponseDTO, 'id'>) => append(newMeal), [append]);
  const handleRemoveMeal = useCallback((index: number) => remove(index), [remove]);
  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'TEXTAREA') return;
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  const handleDayChange = (day: Date) => mealFormMethods.setValue('date.day', day);
  const handleTimeChange = (time: TimeFields) => {
    mealFormMethods.setValue('date.meridiem', time.meridiem);
    mealFormMethods.setValue('date.hours', time.hours);
    mealFormMethods.setValue('date.minutes', time.minutes);
  };

  const onSubmit = async (form: MealEditFormData) => {
    setIsLoading(true);
    try {
      const { date, memo, mealCategory, mealList, mealImages } = form;
      const ateAt = formatTimestamp(date);
      const storedImageUrls = await uploadMealImages(mealImages);
      const newMeals = { foodImages: storedImageUrls, ateAt, mealCategory, memo };
      await Promise.all([createMeal(newMeals, mealList), deleteAnalysis()]);
      router.push(SITE_MAP.HOME);
    } catch (error) {
      const isKnownError = typeof error === 'object' && error !== null && 'title' in error && 'description' in error;
      error = isKnownError ? error : ERROR_MESSAGES.AI_ANALYSIS_FAILED_DEFAULT;
      setModalInfo(error as ErrorMessage);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const mealCategoryField = mealFormMethods.register('mealCategory');
  const selectedMealCategory = mealFormMethods.watch('mealCategory');
  const day = mealFormMethods.watch('date.day');
  const date = mealFormMethods.getValues('date');

  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-4 pt-2 desktop-width xl:w-full xl:flex-row xl:gap-5 xl:px-[3.125rem]">
      <MealImageCarousel imageList={imageList} />
      <div className="flex flex-col gap-10 xl:mx-auto xl:w-[45rem]">
        <div className="flex flex-col gap-3 xl:min-h-[13.125rem]">
          <Typography as="p" variant="body1" className="px-1">
            총 영양 정보
          </Typography>
          <div className="min-w-auto flex min-h-[13.125rem] w-full items-center justify-center gap-3 rounded-2xl bg-white/50 p-3 backdrop-blur-[50px] xl:p-0">
            <MacronutrientPieChart data={totalNutrient} displayCalories={true} className="w-[14.5625rem]" />
            <div className="flex w-[5.75rem] flex-col items-start justify-center gap-4 px-1">
              <MacronutrientBox variety={MacronutrientEnum.CARBOHYDRATE} value={totalNutrient.carbohydrate} />
              <MacronutrientBox variety={MacronutrientEnum.PROTEIN} value={totalNutrient.protein} />
              <MacronutrientBox variety={MacronutrientEnum.FAT} value={totalNutrient.fat} />
            </div>
          </div>
        </div>

        <FormProvider {...mealFormMethods}>
          <form onSubmit={mealFormMethods.handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
            <section className="flex flex-col gap-3">
              <Typography className="pl-1">
                음식 정보
                <Typography variant="subTitle2" as="span" className="ml-2">
                  {mealCardList.length}
                </Typography>
              </Typography>
              <div className="flex flex-col gap-3 xl:grid xl:grid-cols-2">
                {mealCardList.map((meal, idx) => (
                  <EditCard
                    key={meal.id}
                    idx={idx}
                    mealDetail={meal}
                    onRemove={() => handleRemoveMeal(idx)}
                    onHandleError={() => {
                      setModalInfo(ERROR_MESSAGES.AI_ANALYSIS_FAILED);
                      setIsModalOpen(true);
                    }}
                  />
                ))}
                <Responsive
                  pc={
                    <AddMealCardPc
                      onAddMeal={handleAddMeal}
                      onOpenModalChange={setIsModalOpen}
                      onModalInfoChange={setModalInfo}
                    />
                  }
                  mobile={
                    <AddMealCardMobile
                      onAddMeal={handleAddMeal}
                      onOpenModalChange={setIsModalOpen}
                      onModalInfoChange={setModalInfo}
                    />
                  }
                  mode="js"
                />
              </div>
            </section>

            <section className="my-10 flex w-full flex-col items-start justify-center gap-3">
              <Typography as="h3" variant="body1" className="pl-1">
                식사 시간
              </Typography>
              <GlassBackground className="flex min-h-full w-full flex-col items-start gap-3 rounded-2xl border-none p-4">
                <div className="scrollbar-hidden flex h-11 w-full gap-2 overflow-x-auto">
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
                  <Responsive
                    pc={<MealCalendarPc date={day} onDateChange={handleDayChange} />}
                    mobile={<MealCalendarMobile date={day} onDateChange={handleDayChange} />}
                    mode="js"
                  />
                  <Responsive
                    pc={<TimePickerPc currentTime={date} onTimeChange={handleTimeChange} />}
                    mobile={<TimePickerMobile currentTime={date} onTimeChange={handleTimeChange} />}
                    mode="js"
                  />
                </div>
              </GlassBackground>
            </section>
            <MemoBox maxLength={MAX_MEMO_LENGTH} {...mealFormMethods.register('memo')} />
            <div className="flex w-full justify-end">
              <Button type="submit" className="mt-3 w-full xl:w-auto" disabled={isLoading}>
                기록 저장하기
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>

      <Modal open={isModalOpen} onOpenChange={setIsModalOpen} title={modalInfo.title} content={modalInfo.description} />
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

const dateSchema = z.object({
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

const uploadMealImages = async (imageUrls: string[]): Promise<string[]> => {
  const files = await Promise.all(imageUrls.map((url, idx) => urlToFile(url, idx)));
  const storedImageUrls: string[] = [];

  for (const file of files) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { data: fileUrl } = await uploadImage('meal', formData);
      if (fileUrl) {
        storedImageUrls.push(fileUrl);
      } else {
        handleError(ERROR_MESSAGES.AI_ANALYSIS_FAILED);
      }
    } catch (error) {
      console.error('이미지 업로드 중 오류:', error);
      handleError(ERROR_MESSAGES.AI_ANALYSIS_FAILED_DEFAULT);
    }
  }
  return storedImageUrls;
};

const createMeal = async (newMeals: CreateMealDTO, mealList: Omit<AiResponseDTO, 'id'>[]) => {
  try {
    const mealDetails = mealList.map((meal) => ({
      menuName: meal.menuName,
      weight: meal.weight,
      calories: meal.calories,
      carbohydrate: meal.carbohydrate,
      protein: meal.protein,
      fat: meal.fat
    }));

    return await createMealWithDetails(newMeals, mealDetails);
  } catch (error) {
    console.error('식사 생성 중 오류:', error);
    handleError(ERROR_MESSAGES.MEAL_POST_FAILED);
  }
};

const deleteAnalysis = async () => {
  try {
    await deleteAnalysisData();
  } catch (error) {
    console.error('분석 데이터 삭제 중 오류:', error);
    handleError(ERROR_MESSAGES.MEAL_DELETE_FAILED);
  }
};
