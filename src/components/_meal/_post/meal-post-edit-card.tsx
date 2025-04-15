'use client';
import { useFormContext } from 'react-hook-form';
import { useMemo, useState } from 'react';
import MealEditInputField from './meal-post-edit-input-field';
import MealEditCardTitle from './meal-post-edit-card-title';
import MealEditNutrientBox from './meal-post-edit-nutrient-box';
import IconButton from '@/components/commons/icon-button';
import { Button } from '@/components/ui/button';
import { MacronutrientEnum, MeasurementUnitEnum } from '@/types/nutrition.type';
import { MealDetailDTO } from '@/types/DTO/meal.dto';
import { deleteMealDetail, updateMealDetail } from '@/lib/apis/meal.api';

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
      await updateMealDetail(mealDetail.id, input);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleDelete = async (mealId: string) => {
    await deleteMealDetail(mealId);
  };

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('핸들 온체인지 콘솔 실행', e.target.value);
  };

  return (
    <div className="flex flex-col items-start gap-2 self-stretch rounded-2xl bg-white/50 p-2 backdrop-blur-[50px]">
      {isLoading ? (
        <div>분석중 </div>
      ) : (
        <div className="flex flex-col items-start gap-2 self-stretch rounded-xl bg-white p-3">
          <MealEditCardTitle title={mealDetail.menuName} idx={idx} />
          <div className="flex items-start gap-2 self-stretch">
            <MealEditInputField
              variety={MeasurementUnitEnum.GRAM}
              idx={idx}
              type="text"
              maxLength={4}
              className="flex-1"
            />
            <MealEditInputField
              onChange={handleOnChange}
              variety={MeasurementUnitEnum.KCAL}
              idx={idx}
              type="text"
              maxLength={4}
              className="flex-1"
            />
          </div>
          <div className="flex items-center gap-2 self-stretch pb-1 pl-1 pt-2">
            <MealEditNutrientBox variety={MacronutrientEnum.CARBOHYDRATE} value={mealDetail.carbohydrate} />
            <MealEditNutrientBox variety={MacronutrientEnum.PROTEIN} value={mealDetail.protein} />
            <MealEditNutrientBox variety={MacronutrientEnum.FAT} value={mealDetail.fat} />
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
