'use client';
import CtaExampleFeedbackBanner from '@/components/commons/cta-example-feedback-banner';
import GlassBackground from '@/components/commons/glass-background';
import { getMyMealByDate } from '@/apis/meal.api';
import { useDashboard } from '@/app/(home)/contexts/dashboard.context';
import { calculateTotalNutrition } from '@/utils/nutrition-calculator.util';
import { useUserStore } from '@/store/user-store';
import { MealDTO } from '@/types/DTO/meal.dto';
import { useEffect, useState } from 'react';
import AiFeedbackText from './ai-feedback-text';
import CaloriesSummaryCard from './calories-summary-card';
import MacronutrientGroup from './macronutrient-group';
import ScrollbarContainer from './scrollbar-container';
import MealCardContainer from './meal-card-container';

const HomeContent = () => {
  const { selectedDate } = useDashboard();
  const user = useUserStore((state) => state.user);

  const [meals, setMeals] = useState<MealDTO[]>([]);
  const nutrient = calculateTotalNutrition(meals);

  useEffect(() => {
    getMyMealByDate(selectedDate).then(setMeals);
  }, [selectedDate]);

  return (
    <GlassBackground className="flex min-h-0 flex-1 flex-col gap-7 rounded-[2rem] pb-8 pr-3 pt-6 xl:flex-row xl:gap-8 xl:py-6 xl:pl-6 xl:pr-2">
      <ScrollbarContainer className="pr-2 xl:flex-1 xl:pr-4" contentClassName="space-y-4">
        <AiFeedbackText nutritionData={nutrient} nutritionGoal={user.personalInfo} />
        {!user.personalInfo && (
          <CtaExampleFeedbackBanner
            title="현재는 예시 피드백이에요"
            description={
              <>
                지금 바로 1일 목표 칼로리를 설정하고,
                <br />
                나에게 딱 맞는 식단 피드백을 받아보세요!
              </>
            }
          />
        )}
        <div className="space-y-3">
          <CaloriesSummaryCard total={nutrient.calories} goal={user.personalInfo?.dailyCaloriesGoal || 0} />
          <MacronutrientGroup total={nutrient} goal={user.personalInfo} />
        </div>
      </ScrollbarContainer>
      <MealCardContainer meals={meals} onMealsChange={setMeals} />
    </GlassBackground>
  );
};
export default HomeContent;
