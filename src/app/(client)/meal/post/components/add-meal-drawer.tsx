import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { FormControl, FormField, FormItem, FormLabel, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MAX_MENU_NAME_LENGTH, MAX_NUMERIC_LENGTH } from '../edit/constants/meal-edit.constant';
import { formatNumberWithComma } from '@/utils/format.util';
import { parseNumber } from '../edit/utils/meal-edit.util';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { generateCaloriesAnalysisByText } from '@/apis/gemini.api';
import { parseGeminiResponse } from '@/lib/gemini';
import { Typography } from '@/components/ui/typography';
import IconButton from '@/components/commons/icon-button';
import AddMealAiLoading from './add-meal-ai-loading';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAiRequestByText, createFoodAnalysisRequestDetail } from '@/apis/analysis-request.api';
import { useRouter } from 'next/navigation';
const formSchema = z.object({
  menuName: z.string().min(1, '메뉴명을 입력해주세요'),
  weight: z.coerce.number().optional()
});

type FoodFormValues = z.infer<typeof formSchema>;

const AddMealDrawer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();
  const form = useForm<FoodFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menuName: '',
      weight: 0
    }
  });

  const isSubmit = form.watch('menuName')?.trim().length > 0;

  const onSubmit = async (data: FoodFormValues) => {
    setIsAnalyzing(true);

    if (!data.menuName) {
      alert('메뉴명을 입력해주세요.');
      setIsAnalyzing(false);
      return;
    }

    try {
      const { error } = await createAiRequestByText();
      if (error) {
        throw new Error('AI 요청 실패하였습니다. 로그인 상태를 확인해주세요.');
      }
      console.log(data);
    } catch (err) {
      console.error('AI 요청 실패하였습니다. 로그인 상태를 확인해주세요.', err);
    }
    try {
      const generatedTextResult = await generateCaloriesAnalysisByText(
        data.menuName,
        data.weight ? Number(data.weight) : 0
      );
      const parsedResult = parseGeminiResponse(generatedTextResult);
      if (parsedResult.length === 0) {
        alert('AI 분석에 실패하였습니다. 메뉴명이 옳바른지 확인해주세요.');
        setIsAnalyzing(false);
        return;
      }
      const aiResult = parsedResult[0];
      const newMeal = {
        menuName: data.menuName,
        weight: aiResult.weight,
        calories: aiResult.calories,
        carbohydrate: aiResult.carbohydrate,
        protein: aiResult.protein,
        fat: aiResult.fat
      };
      await createFoodAnalysisRequestDetail(newMeal);
      router.push('/meal/post/edit');
    } catch (err) {
      console.error('에러 발생:', err);
      setIsAnalyzing(false);
      alert('AI 분석 중 문제가 발생했어요. 다시 시도해 주세요.');
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
              <IconButton icon="before:bg-close-line-icon" alt="닫기 버튼" />
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
                  <Button type="submit" className="w-full typography-subTitle4" disabled={!isSubmit}>
                    분석 시작하기
                  </Button>
                </DrawerFooter>
              </form>
            </Form>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AddMealDrawer;
