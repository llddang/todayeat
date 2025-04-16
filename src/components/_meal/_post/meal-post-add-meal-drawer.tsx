'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import IconButton from '@/components/commons/icon-button';
import { Typography } from '@/components/ui/typography';
import MealPostEditAiLoading from '@/components/_meal/_post/meal-post-add-meal-ai-loading';
import MealPostAddMealCard from '@/components/_meal/_post/meal-post-add-meal-card';

type FoodFormValues = {
  menuName: string;
  weight: string;
};

const MealPostAddMealDrawer = () => {
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const form = useForm<FoodFormValues>({
    defaultValues: {
      menuName: '',
      weight: ''
    }
  });

  const canSubmit = form.watch('menuName')?.trim().length > 0;

  const onSubmit = async (data: FoodFormValues) => {
    setIsAnalyzing(true);
    console.log('AI 분석 요청', data);

    await new Promise((res) => setTimeout(res, 2000));
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <MealPostAddMealCard />
      </DrawerTrigger>

      <DrawerContent>
        <div className="mb-2 flex items-center justify-between pl-1">
          <DrawerTitle className="text-left typography-subTitle2">
            <Typography as="span" variant="subTitle2" className="text-gray-800">
              음식 추가하기
            </Typography>
          </DrawerTitle>
          <DrawerClose className="" asChild>
            <IconButton icon="before:bg-close-line-icon" alt="삭제 버튼" />
          </DrawerClose>
        </div>

        {isAnalyzing ? (
          <MealPostEditAiLoading />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="menuName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>먹은 음식</FormLabel>
                      <FormControl>
                        <Input placeholder="예시) 김치찌개, 닭가슴살, 크림파스타" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>먹은 양 (선택)</FormLabel>
                      <FormControl>
                        <Input {...field} inputMode="numeric" measure="g" placeholder="숫자를 입력할 수 있어요" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DrawerFooter>
                <Button type="submit" disabled={!canSubmit} className="typography-subTitle4">
                  AI에게 분석 요청하기
                </Button>
              </DrawerFooter>
            </form>
          </Form>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default MealPostAddMealDrawer;
