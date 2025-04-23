'use client';
import CtaExampleFeedbackBanner from '@/components/commons/cta-example-feedback-banner';
import GlassBackground from '@/components/commons/glass-background';
import { Typography } from '@/components/ui/typography';
import { getMyMealByDate } from '@/apis/meal.api';
import { useDashboard } from '@/app/(home)/contexts/dashboard.context';
import { formatDateWithDash } from '@/utils/format.util';
import { calculateTotalNutrition } from '@/utils/nutrition-calculator.util';
import { useUserStore } from '@/store/user-store';
import { MealDTO } from '@/types/DTO/meal.dto';
import { useEffect, useState } from 'react';
import AiFeedbackText from './ai-feedback-text';
import CaloriesSummaryCard from './calories-summary-card';
import MacroNutrientGroup from './macronutrient-group';
import MealEmptyCard from './meal-empty-card';
import MealCard from './meal-card';
import ScrollbarContainer from './scrollbar-container';

const HomeContent = () => {
  const { selectedDate } = useDashboard();
  const user = useUserStore((state) => state.user);

  const [meals, setMeals] = useState<MealDTO[]>([]);
  const nutrient = calculateTotalNutrition(meals);

  useEffect(() => {
    const formattedDate = formatDateWithDash(selectedDate);
    getMyMealByDate(formattedDate).then(setMeals);
  }, [selectedDate]);

  return (
    <GlassBackground className="flex min-h-0 flex-1 flex-col gap-7 rounded-[2rem] pb-8 pt-6 xl:flex-row xl:gap-8 xl:py-6 xl:pl-6 xl:pr-3">
      <ScrollbarContainer className="xl:flex-1 xl:pr-4" contentClassName="space-y-4">
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
          <MacroNutrientGroup total={nutrient} goal={user.personalInfo} />
        </div>
      </ScrollbarContainer>
      <ScrollbarContainer className="xl:flex-1 xl:pr-4">
        <Typography as="h3" variant="subTitle2" className="mb-4 text-gray-900">
          식단 기록
        </Typography>
        {meals.length === 0 ? (
          <MealEmptyCard />
        ) : (
          <ul className="flex flex-col gap-4">
            {meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </ul>
        )}
      </ScrollbarContainer>
    </GlassBackground>
  );
};
export default HomeContent;
