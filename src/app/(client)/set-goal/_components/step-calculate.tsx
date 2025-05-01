'use client';

import { ChangeEvent, MouseEvent, Suspense, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import formSchema from '@/schemas/form-schema.schema';
import { NUTRITION_PURPOSE_OPTIONS } from '@/constants/user-personal-info.constant';
import { getUser, updateUserPersonalInfo } from '@/apis/user.api';
import { calculateDailyNutrition } from '@/utils/nutrition-calculator.util';
import { Typography } from '@/components/ui/typography';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/user.store';
import MacronutrientBox from './macronutrient-box';
import { StepCompleteType } from '../_types/funnel.type';
import { formatNumberWithComma } from '@/utils/format.util';
import { useClientCalculation } from '../_hooks/use-client-calculation';
import { useToast } from '@/hooks/use-toast';

type StepCalculateProps = {
  nextStep: (data: string) => void;
  data: StepCompleteType;
};

const caloriesFormSchema = z.object({
  calories: formSchema.CALORIES_SCHEMA
});

type FormValues = z.infer<typeof caloriesFormSchema>;

const StepCalculate = ({ nextStep, data }: StepCalculateProps) => {
  const { toast } = useToast();
  const userName = useUserStore((state) => state.user?.nickname);
  const setUser = useUserStore((state) => state.setUser);

  const userPersonalGoal = useClientCalculation(data);
  const [userPersonalInfos, setUserPersonalInfos] = useState({
    ...data,
    ...userPersonalGoal
  });

  const defaultRatio = { carbohydrate: 0, protein: 0, fat: 0 };
  const purposeRatio = data.purpose ? NUTRITION_PURPOSE_OPTIONS[data.purpose]?.ratio : defaultRatio;

  const form = useForm<FormValues>({
    resolver: zodResolver(caloriesFormSchema),
    defaultValues: {
      calories: String(userPersonalInfos.dailyCaloriesGoal) || ''
    },
    mode: 'onBlur'
  });

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await updateUserPersonalInfo(userPersonalInfos);
      const user = await getUser();
      setUser(user);
      nextStep('complete');
    } catch (error) {
      toast({
        description: '목표 계산 및 업데이트 중 문제가 생겼습니다.',
        icon: 'before:bg-toast-fail',
        duration: 3000
      });
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
        <Typography as="h3" variant="title3" className="mb-2 xl:mt-2">
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
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </form>
      </Form>
      <div className="space-y-2 pb-40 xl:pb-0">
        <Typography as="span" variant="body3" className="ml-1">
          목표 칼로리 기준 영양소 권장량
        </Typography>
        <div className="grid grid-cols-2 gap-2">
          <Suspense>
            <MacronutrientBox
              label="CARBOHYDRATE"
              gram={userPersonalInfos.dailyCarbohydrateGoal}
              ratio={purposeRatio.carbohydrate}
            />
            <MacronutrientBox label="PROTEIN" gram={userPersonalInfos.dailyProteinGoal} ratio={purposeRatio.protein} />
            <MacronutrientBox label="FAT" gram={userPersonalInfos.dailyFatGoal} ratio={purposeRatio.fat} />
          </Suspense>
        </div>
      </div>
      <div className="fixed bottom-[calc(env(safe-area-inset-bottom,1.5rem)+1.5rem)] left-1/2 w-[calc(100%-2.5rem)] -translate-x-1/2 xl:relative xl:bottom-auto xl:left-auto xl:mt-6 xl:w-full xl:-translate-x-0">
        <Button disabled={!form.formState.isValid} onClick={handleSubmit} className="w-full">
          목표 설정하기
        </Button>
        <Button
          onClick={() => nextStep('step1')}
          className="mt-2 w-full bg-transparent text-gray-600 hover:bg-transparent"
        >
          목표 다시 설정하기
        </Button>
      </div>
    </>
  );
};

export default StepCalculate;
