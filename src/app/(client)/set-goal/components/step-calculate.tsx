'use client';

import { ChangeEvent, MouseEvent, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormSchema from '@/constants/form-schema.constant';
import { NUTRITION_PURPOSE_OPTIONS } from '@/constants/user-personal-info.constant';
import { getUser, updateUserPersonalInfo } from '@/lib/apis/user.api';
import {
  calculateDailyNutrition,
  calculateDailyNutritionGoal,
  getPercentage
} from '@/lib/utils/nutrition-calculator.util';
import { Typography } from '@/components/ui/typography';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { isClient } from '@/lib/utils/predicate.util';
import USER_PHYSICAL_PROFILE_SCHEMA from '@/constants/user-schema.constant';
import { useUserStore } from '@/store/user-store';
import MacronutrientBox from './macronutrient-box';
import { StepCompleteType } from '../types/funnel.type';
import { formatNumberWithComma } from '@/lib/utils/format.util';

type StepCalculateProps = {
  userName: string;
  nextStep: (data: string) => void;
  data: StepCompleteType;
};

export type PersonalMacronutrientData = {
  grams: number;
  percentage: number;
};

const formSchema = z.object({
  calories: FormSchema.ONLY_NUMBER_SCHEMA
});

type FormValues = z.infer<typeof formSchema>;

const StepCalculate = ({ nextStep, userName, data }: StepCalculateProps) => {
  const setUser = useUserStore((state) => state.setUser);

  let userPersonalGoal = {
    dailyCaloriesGoal: 0,
    dailyCarbohydrateGoal: 0,
    dailyProteinGoal: 0,
    dailyFatGoal: 0
  };

  if (isClient()) {
    const parseResult = USER_PHYSICAL_PROFILE_SCHEMA.safeParse(data);
    if (parseResult.success) {
      userPersonalGoal = calculateDailyNutritionGoal(parseResult.data);
    }
  }

  const [userPersonalInfos, setUserPersonalInfos] = useState({
    ...data,
    ...userPersonalGoal
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      calories: String(userPersonalInfos.dailyCaloriesGoal) || ''
    }
  });

  const totalMacros =
    userPersonalInfos.dailyCarbohydrateGoal + userPersonalInfos.dailyProteinGoal + userPersonalInfos.dailyFatGoal;

  const macronutrientData = {
    carbohydrate: {
      grams: userPersonalInfos.dailyCarbohydrateGoal,
      percentage: getPercentage(userPersonalInfos.dailyCarbohydrateGoal, totalMacros)
    },
    protein: {
      grams: userPersonalInfos.dailyProteinGoal,
      percentage: getPercentage(userPersonalInfos.dailyProteinGoal, totalMacros)
    },
    fat: {
      grams: userPersonalInfos.dailyFatGoal,
      percentage: getPercentage(userPersonalInfos.dailyFatGoal, totalMacros)
    }
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await updateUserPersonalInfo(userPersonalInfos);
      const user = await getUser();
      setUser(user);
      nextStep('complete');
    } catch (error) {
      console.error('목표 계산 및 업데이트 중 오류 발생:', error);
    }
  };

  const handleChangeCalories = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<{ calories: string }, 'calories'>
  ) => {
    const newCalories = e.target.value.replace(/[^\d]/g, '');
    field.onChange(newCalories);

    const { ratio } = NUTRITION_PURPOSE_OPTIONS[userPersonalInfos.purpose];
    const newUserPersonalGoal = {
      dailyCaloriesGoal: Number(newCalories),
      ...calculateDailyNutrition(Number(newCalories), ratio)
    };
    setUserPersonalInfos({ ...data, ...newUserPersonalGoal });
  };

  return (
    <>
      <div>
        <Typography as="h3" variant="title2" className="mb-2">
          {userName}님의 <br /> 목표에 맞춰 계산했어요!
        </Typography>
        <Typography as="span" variant="body2" className="text-gray-600">
          필요하면 칼로리를 수정할 수 있어요
        </Typography>
      </div>
      <Form {...form}>
        <form className="relative w-full">
          <div className="space-y-[2.3rem]">
            <FormField
              control={form.control}
              name="calories"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-2">
                    <FormLabel>1일 목표 칼로리</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        inputMode="numeric"
                        measure="kcal"
                        value={formatNumberWithComma(Number(field.value))}
                        onChange={(e) => handleChangeCalories(e, field)}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>
        </form>
      </Form>
      <div className="space-y-2">
        <Typography as="span" variant="body3" className="ml-1">
          목표 칼로리 기준 영양소 권장량
        </Typography>
        <div className="grid grid-cols-2 gap-2">
          <MacronutrientBox label="CARBOHYDRATE" data={macronutrientData.carbohydrate} />
          <MacronutrientBox label="PROTEIN" data={macronutrientData.protein} />
          <MacronutrientBox label="FAT" data={macronutrientData.fat} />
        </div>
      </div>
      <div className="fixed bottom-4 left-1/2 w-[calc(100%-2.5rem)] -translate-x-1/2">
        <Button onClick={handleSubmit} className="w-full">
          목표 설정하기
        </Button>
        <Button onClick={() => nextStep('step1')} className="mt-2 w-full bg-transparent text-gray-600">
          목표 다시 설정하기
        </Button>
      </div>
    </>
  );
};

export default StepCalculate;
