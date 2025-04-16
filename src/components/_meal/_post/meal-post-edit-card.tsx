'use client';
import { useFormContext } from 'react-hook-form';
import { useMemo, useState } from 'react';
import MealPostEditInputField from './meal-post-edit-input-field';
import MealPostEditCardTitle from './meal-post-edit-card-title';
import MacronutrientBox from '@/components/commons/macronutrient-box';
import IconButton from '@/components/commons/icon-button';
import { Button } from '@/components/ui/button';
import { NutritionEnum, MeasurementUnitEnum } from '@/types/nutrition.type';
import { MealDetailDTO } from '@/types/DTO/meal.dto';
import { createFoodAnalysisRequestDetail } from '@/lib/apis/meal.api';

type MealPostEditCardProps = {
  mealDetail: MealDetailDTO;
  idx: number;
};

const MealPostEditCard = ({ mealDetail, idx }: MealPostEditCardProps) => {
  const { getValues, watch } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);

  const menuName = watch(`meals.${idx}.menuName`);
  const weight = watch(`meals.${idx}.weight`);

  const isChanged = useMemo(() => {
    const isMenuChanged = menuName !== mealDetail.menuName;
    const isWeightChanged = weight !== mealDetail.weight;

    const isAnalyzed = isMenuChanged || isWeightChanged;
    return isAnalyzed;
  }, [weight, menuName, mealDetail]);

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const input = getValues(`meals.${idx}`);
      //TODO: Gemini 분석요청 API + supabase 임시테이블 저장(비확실)
      if (!input.menuName) {
        alert('메뉴명은 필수항목 입니다.');
        return;
      }
      if (!input.weight || !input.calories) {
        alert('무게와 칼로리를 모르실 경우 0을 입력해주세요.');
      }

      await createFoodAnalysisRequestDetail(input);
    } catch (error) {
      console.error('식단 분석요청에 실패하였습니다.', error);

      alert('분석에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };
  // TODO: 임시테이블 삭제요청
  // const handleDelete = async (mealId: string) => {
  //   const isConfirm = window.confirm('정말 삭제하시겠습니까?');
  //   if (isConfirm) {
  //   }
  // };

  return (
    <div className="flex flex-col items-start gap-2 self-stretch rounded-2xl bg-white/50 p-2 backdrop-blur-[50px]">
      {isLoading ? (
        <div>분석중 </div>
      ) : (
        <div className="flex flex-col items-start gap-2 self-stretch rounded-xl bg-white p-3">
          <MealPostEditCardTitle title={mealDetail.menuName} idx={idx} />
          <div className="flex items-start gap-2 self-stretch">
            <MealPostEditInputField
              variety={MeasurementUnitEnum.GRAM}
              idx={idx}
              type="number"
              maxLength={4}
              className="flex-1"
            />
            <MealPostEditInputField
              variety={MeasurementUnitEnum.KCAL}
              idx={idx}
              type="number"
              maxLength={4}
              className="flex-1"
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
        <IconButton
          icon="before:bg-delete-2-line-icon"
          alt="삭제 버튼"
          // onClick={() => {
          //   handleDelete(mealDetail.id);
          // }}
        />
        <Button
          variant="primary"
          type="button"
          disabled={!isChanged || isLoading}
          onClick={handleAnalyze}
          className="flex flex-1 items-center justify-center"
        >
          다시 분석하기
        </Button>
      </div>
    </div>
  );
};

export default MealPostEditCard;
