'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { useMemo, useState } from 'react';
import MacronutrientBox from '@/components/commons/macronutrient-box';
import IconButton from '@/components/commons/icon-button';
import { Button } from '@/components/ui/button';
import { MacronutrientEnum } from '@/types/nutrition.type';
import {} from '@/types/DTO/meal.dto';
import { AiResponseDTO } from '@/types/DTO/ai_analysis.dto';
import dynamic from 'next/dynamic';
import { Input } from '@/components/ui/input';
import { formatNumberWithComma } from '@/utils/format.util';
import { parseGeminiResponse } from '@/lib/gemini';
import { generateCaloriesAnalysisByText } from '@/apis/gemini.api';
import { Typography } from '@/components/ui/typography';

const AiLoaderWithoutBg = dynamic(() => import('./ai-loader-without-bg'), {
  ssr: false
});

type EditCardProps = {
  mealDetail: AiResponseDTO;
  idx: number;
  onRemove: (idx: number) => void;
};

const EditCard = ({ mealDetail, idx, onRemove }: EditCardProps) => {
  const { control, register, watch, setValue, getValues } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);

  const menuName = watch(`mealList.${idx}.menuName`);
  const weight = watch(`mealList.${idx}.weight`);
  const menuDetail = watch(`mealList.${idx}`);
  const isChanged = useMemo(() => {
    const isMenuChanged = menuName !== mealDetail.menuName;
    const isWeightChanged = weight !== mealDetail.weight;
    const isAnalyzed = isMenuChanged || isWeightChanged;
    return isAnalyzed;
  }, [weight, menuName, mealDetail]);

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const generatedTextResult = await generateCaloriesAnalysisByText(menuName, weight);
      const parsedResult = parseGeminiResponse(generatedTextResult);
      const aiResult = parsedResult[0];

      const meal = getValues(`mealList.${idx}`);
      const newDetail = { ...meal, ...aiResult };
      setValue(`mealList.${idx}`, newDetail);
    } catch (error) {
      console.error('식단 분석요청에 실패하였습니다.', error);
      alert('분석에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    const isConfirm = window.confirm('정말 삭제하시겠습니까?');
    if (isConfirm) {
      onRemove(idx);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 self-stretch rounded-2xl bg-white/50 p-2 backdrop-blur-[50px]">
      {isLoading ? (
        <div className="flex h-[11.875rem] w-full flex-col items-center justify-center rounded-xl bg-white">
          <AiLoaderWithoutBg />
          <Typography as="span" variant="subTitle1" className="w-full text-center">
            AI가 다시 분석하고 있어요!
          </Typography>
          <Typography as="span" variant="body3" className="w-full pt-2 text-center text-gray-700">
            조금만 기다려 주세요. <br />
            칼로리와 영양 정보를 분석 중이에요!
          </Typography>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-2 self-stretch rounded-xl bg-white p-3">
          <Input {...register(`mealList.${idx}.menuName`, { required: true })} maxLength={10} />
          <div className="flex items-start gap-2 self-stretch">
            <Controller
              control={control}
              name={`mealList.${idx}.weight`}
              defaultValue={mealDetail.weight}
              render={({ field: { value, onChange, ...rest } }) => (
                <Input
                  {...rest}
                  type="text"
                  inputMode="numeric"
                  maxLength={MAX_NUMERIC_LENGTH}
                  measure={MEASUREMENT_UNIT['GRAM'].unit}
                  value={value !== undefined ? formatNumberWithComma(value) : ''}
                  onChange={(e) => onChange(parseNumber(e.target.value))}
                  className="flex-1"
                />
              )}
            />
            <Controller
              control={control}
              name={`mealList.${idx}.calories`}
              defaultValue={mealDetail.calories}
              render={({ field: { value, onChange, ...rest } }) => (
                <Input
                  {...rest}
                  type="text"
                  inputMode="numeric"
                  measure={MEASUREMENT_UNIT['KCAL'].unit}
                  maxLength={MAX_NUMERIC_LENGTH}
                  value={value !== undefined ? formatNumberWithComma(value) : ''}
                  onChange={(e) => onChange(parseNumber(e.target.value))}
                  className="flex-1"
                />
              )}
            />
          </div>
          <div className="flex items-center gap-2 self-stretch pb-1 pl-1 pt-2">
            <MacronutrientBox variety={MacronutrientEnum.CARBOHYDRATE} value={menuDetail.carbohydrate} />
            <MacronutrientBox variety={MacronutrientEnum.PROTEIN} value={menuDetail.protein} />
            <MacronutrientBox variety={MacronutrientEnum.FAT} value={menuDetail.fat} />
          </div>
        </div>
      )}
      <div className="flex items-start justify-center gap-2 self-stretch">
        <IconButton icon="before:bg-delete-2-line-icon" alt="삭제 버튼" onClick={handleDelete} />
        <Button
          variant="primary"
          type="button"
          disabled={!isChanged}
          onClick={handleAnalyze}
          className="flex flex-1 items-center justify-center"
        >
          다시 분석하기
        </Button>
      </div>
    </div>
  );
};

export default EditCard;

const MAX_NUMERIC_LENGTH = 4;

const MEASUREMENT_UNIT: Record<MeasurementUnitType, MeasurementUnitValues> = {
  KCAL: {
    label: '칼로리',
    name: 'calories',
    unit: 'kcal'
  },
  GRAM: {
    label: '그램',
    name: 'weight',
    unit: 'g'
  }
} as const;

type MeasurementUnitValues = {
  label: string;
  name: string;
  unit: string;
};

type MeasurementUnitType = 'KCAL' | 'GRAM';

const parseNumber = (value: string) => {
  return Number(value.replace(/,/g, ''));
};
