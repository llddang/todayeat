'use client';
import { useFormContext } from 'react-hook-form';
import { useMemo, useState } from 'react';
import MealPostEditInputField from './meal-post-edit-input-field';
import MealPostEditCardTitle from './meal-post-edit-card-title';
import MealPostEditNutrientBox from './meal-post-edit-nutrient-box';
import IconButton from '@/components/commons/icon-button';
import { Button } from '@/components/ui/button';
import { MacronutrientEnum, MeasurementUnitEnum } from '@/types/nutrition.type';
import { MealDetailDTO } from '@/types/DTO/meal.dto';
import { updateMealDetail } from '@/lib/apis/meal.api';

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
      await updateMealDetail(mealDetail.id, input);
    } catch (error) {
      console.error('식단 분석요청에 실패하였습니다.', error);
      alert('분석에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (mealId: string) => {
    // TODO: 임시테이블 삭제요청
  };

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
            <MealPostEditNutrientBox variety={MacronutrientEnum.CARBOHYDRATE} value={mealDetail.carbohydrate} />
            <MealPostEditNutrientBox variety={MacronutrientEnum.PROTEIN} value={mealDetail.protein} />
            <MealPostEditNutrientBox variety={MacronutrientEnum.FAT} value={mealDetail.fat} />
          </div>
        </div>
      )}
      <div className="flex items-start justify-center gap-2 self-stretch">
        <IconButton
          icon="before:bg-delete-2-line-icon"
          alt="삭제 버튼"
          onClick={() => {
            handleDelete(mealDetail.id);
          }}
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
