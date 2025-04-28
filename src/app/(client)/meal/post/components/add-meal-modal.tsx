'use client';

import IconButton from '@/components/commons/icon-button';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { MAX_MENU_NAME_LENGTH, MAX_NUMERIC_LENGTH } from '../edit/constants/meal-edit.constant';
import { formatNumberWithComma } from '@/utils/format.util';
import { parseNumber } from '../edit/utils/meal-edit.util';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAiRequestByText, createFoodAnalysisRequestDetail } from '@/apis/analysis-request.api';
import { generateCaloriesAnalysisByText } from '@/apis/gemini.api';
import { parseGeminiResponse } from '@/lib/gemini';
import { ERROR_MESSAGES } from '../constants/analysis-error.constant';
import { FoodFormValues, formSchema } from '../schemas/add-meal.schema';

type AddMealModalProps = {
  onModalOpenChange: (isModalOpen: boolean) => void;
  onModalInfoChange: (modalInfo: { title: string; content: string }) => void;
  onLoadingChange: (isLoading: boolean) => void;
};

const AddMealModal = ({ onLoadingChange, onModalOpenChange, onModalInfoChange }: AddMealModalProps) => {
  const router = useRouter();
  const form = useForm<FoodFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menuName: '',
      weight: 0
    }
  });

  const onSubmit = async (data: FoodFormValues) => {
    onLoadingChange(true);

    if (!data.menuName) {
      onLoadingChange(false);
      return alert('메뉴명을 입력해주세요.');
    }

    try {
      const { error } = await createAiRequestByText();
      if (error) {
        onModalInfoChange({
          title: ERROR_MESSAGES.LOGIN_REQUIRED.title,
          content: ERROR_MESSAGES.LOGIN_REQUIRED.content
        });
        onLoadingChange(false);
        return onModalOpenChange(true);
      }

      const generatedTextResult = await generateCaloriesAnalysisByText(
        data.menuName,
        data.weight ? Number(data.weight) : 0
      );
      const [parsedResult] = parseGeminiResponse(generatedTextResult);
      if (!parsedResult) {
        onModalInfoChange({
          title: ERROR_MESSAGES.AI_ANALYSIS_FAILED.title,
          content: ERROR_MESSAGES.AI_ANALYSIS_FAILED.content
        });
        onLoadingChange(false);
        return onModalOpenChange(true);
      }
      const newMeal = {
        ...parsedResult,
        menuName: data.menuName
      };
      await createFoodAnalysisRequestDetail(newMeal);
      router.push('/meal/post/edit');
    } catch (err) {
      onLoadingChange(false);
      if (err instanceof Error) {
        onModalInfoChange({
          title: ERROR_MESSAGES.SERVICE_ERROR.title,
          content: ERROR_MESSAGES.SERVICE_ERROR.content
        });
        return onModalOpenChange(true);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">사진 없이 분석하기</Button>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 z-modal flex items-center justify-center bg-black/80">
        <DialogContent className="absolute left-1/2 top-1/2 z-modal w-[25rem] -translate-x-1/2 -translate-y-1/2 gap-1 rounded-2xl bg-white p-6 backdrop-blur-[50px]">
          <div className="flex items-center justify-between gap-4 pl-1">
            <DialogTitle className="flex-1">
              <Typography as="span" variant="title3" className="text-gray-800">
                사진 없이 분석하기
              </Typography>
            </DialogTitle>
            <DialogClose className="" asChild>
              <IconButton icon="before:bg-close-line-icon" alt="닫기 버튼" />
            </DialogClose>
          </div>
          <div className="flex flex-col gap-6">
            <Typography as="span" variant="body2" className="text-gray-700">
              음식 이름을 입력하면 AI가
              <br />
              칼로리와 영양 정보를 분석해 드려요!
            </Typography>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} id="AddMealModalForm">
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="menuName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
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
                      </FormItem>
                    )}
                  />
                </div>
              </form>
              <Button
                type="submit"
                className="w-full typography-subTitle4"
                disabled={!form.formState.isValid}
                form="AddMealModalForm"
              >
                분석 시작하기
              </Button>
            </Form>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default AddMealModal;
