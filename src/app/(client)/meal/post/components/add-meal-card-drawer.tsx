'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import IconButton from '@/components/commons/icon-button';
import { Typography } from '@/components/ui/typography';
import MealPostAddMealAiLoading from '@/app/(client)/meal/post/components/add-meal-ai-loading';
import { useUserStore } from '@/store/user-store';
import { generateCaloriesAnalysisByText } from '@/apis/gemini.api';
import { parseGeminiResponse } from '@/lib/gemini';
import { AiResponseDTO } from '@/types/DTO/ai_analysis.dto';
import { formatNumberWithComma } from '@/utils/format.util';
import { parseNumber } from '../edit/utils/meal-edit.util';
import { MAX_MENU_NAME_LENGTH, MAX_NUMERIC_LENGTH } from '../edit/constants/meal-edit.constant';

type FoodFormValues = {
  menuName: string;
  weight: string;
};

type AddMealCardDrawerProps = {
  onAddMeal: (meal: Omit<AiResponseDTO, 'id'>) => void;
};

const AddMealCardDrawer = ({ onAddMeal }: AddMealCardDrawerProps) => {
  const user = useUserStore((state) => state.user);
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

      const generatedTextResult = await generateCaloriesAnalysisByText(
        data.menuName,
        data.weight ? Number(data.weight) : 0
      );
      const parsedResult = parseGeminiResponse(generatedTextResult);
      if (parsedResult.length === 0) {
        alert('AI 분석에 실패하였습니다. 메뉴명을 다시 입력해주세요.');
        setIsAnalyzing(false);
        return;
      }
      const aiResult = parsedResult[0];

      const newMeal = {
        userId: user.id,
        menuName: data.menuName,
        weight: aiResult.weight,
        calories: aiResult.calories,
        carbohydrate: aiResult.carbohydrate,
        protein: aiResult.protein,
        fat: aiResult.fat
      };

      onAddMeal(newMeal);
      form.reset();
      setIsAnalyzing(false);
      setIsOpen(false);
    } catch (err) {
      console.error('에러 발생:', err);
      setIsAnalyzing(false);
      alert('AI 분석 중 문제가 발생했어요. 다시 시도해 주세요.');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(onSubmit)(e);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <div className="flex cursor-pointer flex-col items-center gap-3 rounded-2xl bg-white px-4 py-5">
          <IconButton
            size="md"
            icon="before:bg-add-line-icon"
            alt="음식 추가"
            className="bg-gray-100 hover:bg-gray-100"
          />
          <Typography as="span" variant="body3" className="text-gray-800">
            음식 추가하기
          </Typography>
        </div>
      </DrawerTrigger>

      <DrawerContent>
        <div className="flex items-center justify-between gap-4 pl-1">
          <DrawerTitle className="flex-1 text-left typography-subTitle2">
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
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="menuName"
                render={({ field }) => (
                  <FormItem className="space-y-2 pt-3">
                    <FormLabel className="text-gray-900">먹은 음식</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="예시) 김치찌개, 닭가슴살, 크림파스타"
                        type="text"
                        maxLength={MAX_MENU_NAME_LENGTH}
                        {...field}
                      />
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
                    <FormLabel className="text-gray-900">먹은 양 (선택)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        inputMode="numeric"
                        maxLength={MAX_NUMERIC_LENGTH}
                        measure="g"
                        placeholder="숫자를 입력할 수 있어요"
                        value={field.value ? formatNumberWithComma(Number(field.value)) : ''}
                        onChange={(e) => {
                          field.onChange(parseNumber(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DrawerFooter>
              <Button type="submit" disabled={!canSubmit} className="w-full typography-subTitle4">
                AI에게 분석 요청하기
              </Button>
            </DrawerFooter>
          </form>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default AddMealCardDrawer;
