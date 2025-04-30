'use client';

import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import IconButton from '@/components/commons/icon-button';
import { Typography } from '@/components/ui/typography';
import MealPostAddMealAiLoading from '@/app/(client)/meal/post/_components/add-meal-ai-loading';
import { useUserStore } from '@/store/user.store';
import { generateCaloriesAnalysisByText } from '@/apis/gemini.api';
import { parseGeminiResponse } from '@/lib/gemini';
import { AiResponseDTO } from '@/types/DTO/ai_analysis.dto';
import { formatNumberWithComma } from '@/utils/format.util';
import { MAX_MENU_NAME_LENGTH, MAX_NUMERIC_LENGTH } from '../_constants/meal-edit.constant';
import { parseNumber } from '../_utils/meal-edit.util';
import { ERROR_MESSAGES } from '../_constants/error-message.constant';

type FoodFormValues = {
  menuName: string;
  weight: string;
};

type AddMealCardDrawerProps = {
  onAddMeal: (meal: Omit<AiResponseDTO, 'id'>) => void;
  onOpenModalChange: (isOpen: boolean) => void;
  onModalInfoChange: (modalInfo: { title: string; description: string }) => void;
};

const AddMealCardDrawer = ({ onAddMeal, onOpenModalChange, onModalInfoChange }: AddMealCardDrawerProps) => {
  const user = useUserStore((state) => state.user);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FoodFormValues>({
    defaultValues: {
      menuName: '',
      weight: ''
    }
  });

  const canSubmit = form.watch('menuName').trim().length > 0;

  const onSubmit = async (data: FoodFormValues) => {
    try {
      setIsAnalyzing(true);

      const generatedTextResult = await generateCaloriesAnalysisByText(
        data.menuName,
        data.weight ? Number(data.weight) : 0
      );
      const [aiResult] = parseGeminiResponse(generatedTextResult);
      if (!aiResult) {
        onModalInfoChange(ERROR_MESSAGES.AI_ANALYSIS_FAILED);
        setIsAnalyzing(false);
        return onOpenModalChange(true);
      }

      const newMeal = {
        ...aiResult,
        userId: user.id,
        menuName: data.menuName
      };

      onAddMeal(newMeal);
      form.reset();
      setIsAnalyzing(false);
      setIsOpen(false);
    } catch (err) {
      console.error('에러 발생:', err);
      setIsAnalyzing(false);
      onModalInfoChange(ERROR_MESSAGES.AI_ANALYSIS_FAILED_DEFAULT);
      return onOpenModalChange(true);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(onSubmit)(e);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <div className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl bg-white px-4 py-5 xl:min-h-[16.125rem]">
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
