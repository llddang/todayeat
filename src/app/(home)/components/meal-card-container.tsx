import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import MealEmptyCard from './meal-empty-card';
import MealCard from './meal-card';
import { MealDTO } from '@/types/DTO/meal.dto';
import { useState } from 'react';
import ScrollbarContainer from './scrollbar-container';
import Modal from '@/components/commons/modal';
import { deleteMeals } from '@/apis/meal.api';
import { useCalendar } from '../contexts/calendar.context';
import { useDashboard } from '../contexts/dashboard.context';
import { formatDateWithDash } from '@/utils/format.util';

type MealCardContainerProps = {
  meals: MealDTO[];
  onMealsChange: (meals: MealDTO[]) => void;
};
const MealCardContainer = ({ meals, onMealsChange }: MealCardContainerProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isConfirmModalOpen, setConfirmIsModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [idsToDelete, setIdsToDelete] = useState<string[]>([]);

  const { selectedDate } = useDashboard();
  const { setDailyMealCalories } = useCalendar();

  const filteredMeals = meals.filter((meal) => !idsToDelete.includes(meal.id));

  const deleteMealCard = (mealId: string) => {
    setIdsToDelete((prev) => [...prev, mealId]);
  };

  const handleToggleDeleteMeal = () => {
    setIsEditMode((prev) => !prev);
    setIdsToDelete([]);
  };

  const handleDeleteMealConfirm = async () => {
    setIsEditMode(false);

    try {
      await deleteMeals(idsToDelete);
      onMealsChange(filteredMeals);
      const calories = filteredMeals.flatMap((meal) => meal.mealDetails).reduce((acc, meal) => acc + meal.calories, 0);
      setDailyMealCalories({ [formatDateWithDash(selectedDate)]: calories });
    } catch {
      setIsAlertModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col xl:flex-1">
        <ScrollbarContainer className="h-0 flex-1 xl:pr-4">
          <div className="flex items-center justify-between pr-2 xl:mb-2">
            <Typography as="h3" variant="subTitle2" className="text-gray-900">
              식단 기록
            </Typography>
            {meals.length !== 0 && (
              <Button variant="icon" size="sm" onClick={handleToggleDeleteMeal}>
                {isEditMode ? '편집 취소' : '편집'}
              </Button>
            )}
          </div>
          {meals.length === 0 ? (
            <MealEmptyCard />
          ) : (
            <ul className="flex flex-col gap-4 pr-2 pt-2">
              {filteredMeals.map((meal) => (
                <MealCard key={meal.id} meal={meal} editMode={isEditMode} onDelete={deleteMealCard} />
              ))}
            </ul>
          )}
        </ScrollbarContainer>
        {isEditMode && (
          <div className="mt-6 flex flex-shrink-0 gap-2">
            <Button onClick={handleToggleDeleteMeal} variant="secondary" className="flex-1">
              편집 취소
            </Button>
            <Button onClick={() => setConfirmIsModalOpen(true)} className="flex-1">
              편집 완료
            </Button>
          </div>
        )}
      </div>
      <Modal
        open={isConfirmModalOpen}
        onOpenChange={setConfirmIsModalOpen}
        title="변경된 내용을 적용할까요?"
        content="삭제된 식단 기록은 되돌릴 수 없어요."
        confirmText="완료"
        onConfirm={handleDeleteMealConfirm}
      />
      <Modal
        open={isAlertModalOpen}
        onOpenChange={setIsAlertModalOpen}
        title="예상하지 못한 오류가 발생했습니다."
        content="잠시 후 다시 시도해주세요."
      />
    </>
  );
};

export default MealCardContainer;
