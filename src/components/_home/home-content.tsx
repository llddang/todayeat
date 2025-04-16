'use client';
import HomeAiFeedbackText from '@/components/_home/home-ai-feedback-text';
import HomeCaloriesSummaryCard from '@/components/_home/home-calories-summary-card';
import HomeMacroNutrientGroup from '@/components/_home/home-macronutrient-group';
import HomeMealContainer from '@/components/_home/home-meal-container';
import CtaExampleFeedbackBanner from '@/components/commons/cta-example-feedback-banner';
import GlassBackground from '@/components/commons/glass-background';
import { getMyMealByDate } from '@/lib/apis/meal.api';
import { useDashboard } from '@/lib/contexts/dashboard.context';
import { useUserStore } from '@/lib/hooks/use-user-store';
import { formatDateWithDash } from '@/lib/utils/date.util';
import { calculateTotalNutrition } from '@/lib/utils/nutrition-calculator.util';
import { MealDTO } from '@/types/DTO/meal.dto';
import { useEffect, useState } from 'react';

const HomeContent = () => {
  const { selectedDate } = useDashboard();
  const { user } = useUserStore();

  const [meals, setMeals] = useState<MealDTO[]>([]);
  const nutrient = calculateTotalNutrition(meals);

  useEffect(() => {
    const formattedDate = formatDateWithDash(selectedDate);
    getMyMealByDate(formattedDate).then(setMeals);
  }, [selectedDate]);

  return (
    <GlassBackground className="flex min-h-0 flex-col gap-4 rounded-[2rem] pb-8 pt-6">
      <HomeAiFeedbackText nutritionData={nutrient} nutritionGoal={user.personalInfo} />
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
      <HomeCaloriesSummaryCard total={nutrient.calories} goal={user.personalInfo?.dailyCaloriesGoal || 0} />
      <HomeMacroNutrientGroup total={nutrient} goal={user.personalInfo} />
      <HomeMealContainer meals={meals} />
    </GlassBackground>
  );
};
export default HomeContent;
