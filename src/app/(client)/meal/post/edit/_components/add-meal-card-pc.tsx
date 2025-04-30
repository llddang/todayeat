import IconButton from '@/components/commons/icon-button';
import { Typography } from '@/components/ui/typography';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from '@radix-ui/react-dialog';
import AddMealAiLoading from '../../_components/add-meal-ai-loading';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MAX_MENU_NAME_LENGTH, MAX_NUMERIC_LENGTH } from '../_constants/meal-edit.constant';
import { formatNumberWithComma } from '@/utils/format.util';
import { parseNumber } from '../_utils/meal-edit.util';
import { Button } from '@/components/ui/button';
import { parseGeminiResponse } from '@/lib/gemini';
import { generateCaloriesAnalysisByText } from '@/apis/gemini.api';
import { useUserStore } from '@/store/user-store';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiResponseDTO } from '@/types/DTO/ai_analysis.dto';
import { ERROR_MESSAGES } from '../_constants/error-message.constant';
type FoodFormValues = {
  menuName: string;
  weight: string;
};

type AddMealCardPcProps = {
  onAddMeal: (meal: Omit<AiResponseDTO, 'id'>) => void;
  onOpenModalChange: (isOpen: boolean) => void;
  onModalInfoChange: (modalInfo: { title: string; description: string }) => void;
};

const AddMealCardPc = ({ onAddMeal, onOpenModalChange, onModalInfoChange }: AddMealCardPcProps) => {
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
        return onOpenModalChange(true);
      }

      const newMeal = {
        ...aiResult,
        userId: user.id,
        menuName: data.menuName
      };

      onAddMeal(newMeal);
      form.reset();
      setIsOpen(false);
    } catch (err) {
      console.error('에러 발생:', err);
      onModalInfoChange(ERROR_MESSAGES.AI_ANALYSIS_FAILED_DEFAULT);
      return onOpenModalChange(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(onSubmit)(e);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
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
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-modal bg-black/80">
          <DialogContent className="fixed left-1/2 top-1/2 z-modal w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between gap-4 pl-1">
              <DialogTitle className="flex-1 text-left typography-subTitle2">
                <Typography as="span" variant="subTitle2" className="text-gray-800">
                  음식 추가하기
                </Typography>
              </DialogTitle>
              <DialogClose className="" asChild>
                <IconButton icon="before:bg-close-line-icon" alt="닫기 버튼" />
              </DialogClose>
            </div>

            {isAnalyzing ? (
              <AddMealAiLoading />
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

                <Button type="submit" disabled={!canSubmit} className="w-full typography-subTitle4">
                  AI에게 분석 요청하기
                </Button>
              </form>
            )}
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
};

export default AddMealCardPc;
