'use client';

import { ChangeEvent, MouseEvent, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormSchema from '@/constants/form-schema.constant';
import { NUTRITION_PURPOSE_OPTIONS } from '@/constants/user-personal-info.constant';
import { updateUserPersonalInfo } from '@/lib/apis/user.api';
import {
  calculateDailyNutrition,
  calculateDailyNutritionGoal,
  getPercentage
} from '@/lib/utils/nutrition-calculator.util';
import { Typography } from '@/components/ui/typography';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SetGoalMacronutrientBox from '@/components/_set-goal/set-goal-macronutrient-box';
import { Button } from '@/components/ui/button';
import { isClient } from '@/lib/utils/predicate.util';
import { UserPhysicalProfileDTO } from '@/types/DTO/user.dto';
import { formatNumberWithComma } from '@/lib/utils/format-number-with-comma';
import { CompleteType } from '@/types/set-goal.type';

type SetGoalCalculateStepProps = {
  userName: string;
  nextStep: (data: string) => void;
  data: CompleteType;
};

export type PersonalMacronutrientData = {
  grams: number;
  percentage: number;
};

const formSchema = z.object({
  calories: FormSchema.ONLY_NUMBER_SCHEMA
});

const isValidUserData = (data: CompleteType): data is UserPhysicalProfileDTO => {
  return (
    data &&
    typeof data === 'object' &&
    'gender' in data &&
    'height' in data &&
    'weight' in data &&
    'age' in data &&
    'activityLevel' in data &&
    'purpose' in data
  );
};

type FormValues = z.infer<typeof formSchema>;

const SetGoalCalculateStep = ({ nextStep, userName, data }: SetGoalCalculateStepProps) => {
  let userPersonalGoal = {
    dailyCaloriesGoal: 0,
    dailyCarbohydrateGoal: 0,
    dailyProteinGoal: 0,
    dailyFatGoal: 0
  };

  if (isClient() && isValidUserData(data)) {
    userPersonalGoal = calculateDailyNutritionGoal({ ...data });
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

  const calculateMacrosData = () => {
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
    return macronutrientData;
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await updateUserPersonalInfo(userPersonalInfos);
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
        <Typography as="h3" variant={'title2'} className="mb-2">
          {userName}님의 <br /> 목표에 맞춰 계산했어요!
        </Typography>
        <Typography as="span" variant={'body2'} className="text-gray-600">
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
                  <FormItem>
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
          <SetGoalMacronutrientBox label="탄수화물" data={calculateMacrosData().carbohydrate} />
          <SetGoalMacronutrientBox label="단백질" data={calculateMacrosData().protein} />
          <SetGoalMacronutrientBox label="지방" data={calculateMacrosData().fat} />
        </div>
      </div>
      <div className="fixed bottom-4 left-1/2 w-[calc(100%-2.5rem)] -translate-x-1/2">
        <Button onClick={(e) => handleSubmit(e)} className="w-full">
          목표 설정하기
        </Button>
        <Button onClick={() => nextStep('step1')} className="mt-2 w-full bg-transparent text-gray-600">
          목표 다시 설정하기
        </Button>
      </div>
    </>
  );
};

export default SetGoalCalculateStep;
