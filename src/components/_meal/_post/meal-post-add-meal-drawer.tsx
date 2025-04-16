'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import IconButton from '@/components/commons/icon-button';
import { Typography } from '@/components/ui/typography';
import MealPostAddMealAiLoading from '@/components/_meal/_post/meal-post-add-meal-ai-loading';
import MealPostAddMealCard from '@/components/_meal/_post/meal-post-add-meal-card';
import { useUserStore } from '@/lib/hooks/use-user-store';

type FoodFormValues = {
  menuName: string;
  weight: string;
};

const MealPostAddMealDrawer = () => {
  const { user } = useUserStore();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FoodFormValues>({
    defaultValues: {
      menuName: '',
      weight: ''
    }
  });

  const canSubmit = form.watch('menuName')?.trim().length > 0;

  const onSubmit = async (data: FoodFormValues) => {
    try {
      setIsAnalyzing(true);

      const requestRes = await fetch('/api/meal-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          menuName: data.menuName,
          weight: data.weight ? Number(data.weight) : 0
        })
      });

      if (!requestRes.ok) {
        const errorData = await requestRes.json();
        throw new Error(errorData.message || '요청 생성 실패');
      }

      const requestDetail = await requestRes.json();

      const geminiRes = await fetch('/api/gemini/calories-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: requestDetail.id,
          userId: user.id,
          menuName: requestDetail.menu_name,
          weight: requestDetail.weight
        })
      });

      if (!geminiRes.ok) {
        const errorData = await geminiRes.json();
        throw new Error(errorData.message || 'AI 분석 실패');
      }

      form.reset();
      setIsAnalyzing(false);
      setIsOpen(false);
    } catch (err) {
      console.error('에러 발생:', err);
      setIsAnalyzing(false);
      alert('AI 분석 중 문제가 발생했어요. 다시 시도해 주세요.');
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
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
            <IconButton icon="before:bg-close-line-icon" alt="닫기 버튼" />
          </DrawerClose>
        </div>

        {isAnalyzing ? (
          <MealPostAddMealAiLoading />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="menuName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
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
                    <FormItem className="space-y-2">
                      <FormLabel>먹은 양 (선택)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          inputMode="numeric"
                          measure="g"
                          placeholder="숫자를 입력할 수 있어요"
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                              field.onChange(value);
                            }
                          }}
                        />
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
