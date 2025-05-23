'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { FormControl, FormField, FormItem, FormLabel, Form, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MAX_MENU_NAME_LENGTH, MAX_NUMERIC_LENGTH } from '../edit/_constants/meal-edit.constant';
import { formatNumberWithComma } from '@/utils/format.util';
import { parseNumber } from '../edit/_utils/meal-edit.util';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { generateCaloriesAnalysisByText } from '@/apis/gemini.api';
import { parseGeminiResponse } from '@/lib/gemini';
import { Typography } from '@/components/ui/typography';
import IconButton from '@/components/commons/icon-button';
import AddMealAiLoading from './add-meal-ai-loading';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAiRequestByText, createAiResponse } from '@/apis/analysis-request.api';
import { useRouter } from 'next/navigation';
import Modal from '@/components/commons/modal';
import { ERROR_MESSAGES } from '../_constants/analysis-error.constant';
import { FoodFormValues, formSchema } from '../_schemas/add-meal.schema';
import { revalidate } from '../_utils/revalidate.util';

const AddMealMobile = () => {
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<{ title: string; content: string }>({
    title: '',
    content: ''
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<FoodFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menuName: ''
    },
    mode: 'onBlur'
  });

  const onSubmit = async (data: FoodFormValues) => {
    setIsAnalyzing(true);

    try {
      const { error } = await createAiRequestByText();
      if (error) {
        setModalInfo({
          title: ERROR_MESSAGES.LOGIN_REQUIRED.title,
          content: ERROR_MESSAGES.LOGIN_REQUIRED.content
        });
        setIsAnalyzing(false);
        return setIsModalOpen(true);
      }

      const generatedTextResult = await generateCaloriesAnalysisByText(
        data.menuName,
        data.weight ? Number(data.weight) : 0
      );
      const [parsedResult] = parseGeminiResponse(generatedTextResult);
      if (!parsedResult) {
        setModalInfo({
          title: ERROR_MESSAGES.AI_ANALYSIS_FAILED.title,
          content: ERROR_MESSAGES.AI_ANALYSIS_FAILED.content
        });
        setIsAnalyzing(false);
        return setIsModalOpen(true);
      }
      const newMeal = {
        ...parsedResult,
        menuName: data.menuName
      };
      await createAiResponse(newMeal);
      revalidate();
      router.push('/meal/post/edit');
    } catch (err) {
      setIsAnalyzing(false);
      if (err instanceof Error) {
        setModalInfo({
          title: ERROR_MESSAGES.SERVICE_ERROR.title,
          content: ERROR_MESSAGES.SERVICE_ERROR.content
        });
        return setIsModalOpen(true);
      }
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost">사진 없이 분석하기</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col gap-2 rounded-t-[2rem] bg-white backdrop-blur-[50px]">
          <div className="flex items-center justify-between gap-4 pl-1">
            <DrawerTitle className="flex-1 text-left typography-subTitle2">
              <Typography as="span" variant="subTitle2" className="text-gray-800">
                사진 없이 분석하기
              </Typography>
            </DrawerTitle>
            <DrawerClose className="" asChild>
              <IconButton icon="before:bg-close-line-icon" title="닫기 버튼" />
            </DrawerClose>
          </div>
          <Typography as="span" variant="body2" className="text-gray-700">
            음식 이름을 입력하면 AI가 <br /> 칼로리와 영양 정보를 분석해 드려요!
          </Typography>
          {isAnalyzing ? (
            <AddMealAiLoading />
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="menuName"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
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

                <DrawerFooter>
                  <Button type="submit" className="w-full typography-subTitle4" disabled={!form.formState.isValid}>
                    분석 시작하기
                  </Button>
                </DrawerFooter>
              </form>
            </Form>
          )}
        </div>
      </DrawerContent>
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen} {...modalInfo} />
    </Drawer>
  );
};

export default AddMealMobile;
