'use client';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormEvent, useState } from 'react';
import MacronutrientBox from '@/components/commons/macronutrient-box';
import IconButton from '@/components/commons/icon-button';
import { Button } from '@/components/ui/button';
import { NutritionEnum } from '@/types/nutrition.type';
import {} from '@/types/DTO/meal.dto';
import { FoodAnalysisRequestsDetailDTO } from '@/types/DTO/food_analysis.dto';
import dynamic from 'next/dynamic';
import { Input } from '@/components/ui/input';

const SetGoalAiLoaderLottie = dynamic(() => import('@/components/_set-goal/set-goal-ai-loader-lottie'), {
  ssr: false
});

type EditCardProps = {
  mealDetail: FoodAnalysisRequestsDetailDTO;
  idx: number;
};

const EditCard = ({ mealDetail, idx }: EditCardProps) => {
  const { control, getValues, register } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);

  const { remove: mealListRemove } = useFieldArray({ control, name: 'mealList' });
  const { remove: mealsRemove } = useFieldArray({ control, name: 'meals' });

  // TODO: 카드에서API 분석요청
  // const menuName = watch(`meals.${idx}.menuName`);
  // const weight = watch(`meals.${idx}.weight`);

  // const isChanged = useMemo(() => {
  //   const isMenuChanged = menuName !== mealDetail.menuName;
  //   const isWeightChanged = weight !== mealDetail.weight;

  //   const isAnalyzed = isMenuChanged || isWeightChanged;
  //   return isAnalyzed;
  // }, [weight, menuName, mealDetail]);

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const input = getValues(`meals.${idx}`);
      if (!input.menuName) {
        alert('메뉴명은 필수항목 입니다.');
        return;
      }
      if (!input.weight || !input.calories) {
        alert('무게와 칼로리를 모르실 경우 0을 입력해주세요.');
      }
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
      mealListRemove(idx);
      mealsRemove(idx);
    }
  };

  const onHandleMaxLengthInput = (e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, MAX_NUMERIC_LENGTH);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 self-stretch rounded-2xl bg-white/50 p-2 backdrop-blur-[50px]">
      {isLoading ? (
        <SetGoalAiLoaderLottie />
      ) : (
        <div className="flex flex-col items-start gap-2 self-stretch rounded-xl bg-white p-3">
          <Input
            onInput={onHandleMaxLengthInput}
            {...register(`meals.${idx}.menuName`, { required: true })}
            defaultValue={mealDetail.menuName}
          />
          <div className="flex items-start gap-2 self-stretch">
            <Input
              measure={MEASUREMENT_UNIT['GRAM'].unit}
              type="number"
              onInput={onHandleMaxLengthInput}
              inputMode="numeric"
              {...register(`meals.${idx}.weight}`, {
                valueAsNumber: true
              })}
              className="flex-1"
              defaultValue={mealDetail.weight}
            />
            <Input
              measure={MEASUREMENT_UNIT['KCAL'].unit}
              type="number"
              className="flex-1"
              {...register(`meals.${idx}.calories}`, {
                valueAsNumber: true
              })}
              defaultValue={mealDetail.calories}
            />
          </div>
          <div className="flex items-center gap-2 self-stretch pb-1 pl-1 pt-2">
            <MacronutrientBox variety={NutritionEnum.CARBOHYDRATE} value={mealDetail.carbohydrate} />
            <MacronutrientBox variety={NutritionEnum.PROTEIN} value={mealDetail.protein} />
            <MacronutrientBox variety={NutritionEnum.FAT} value={mealDetail.fat} />
          </div>
        </div>
      )}
      <div className="flex items-start justify-center gap-2 self-stretch">
        <IconButton icon="before:bg-delete-2-line-icon" alt="삭제 버튼" onClick={handleDelete} />
        <Button
          variant="primary"
          type="button"
          disabled
          onClick={handleAnalyze}
          className="flex flex-1 items-center justify-center"
        >
          재분석 기능은 추후 개발 예정입니다.
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
