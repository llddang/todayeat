'use client';
import CtaExampleFeedbackBanner from '@/components/commons/cta-example-feedback-banner';
import GlassBackground from '@/components/commons/glass-background';
import { Typography } from '@/components/ui/typography';
import { getMyMealByDate } from '@/lib/apis/meal.api';
import { useDashboard } from '@/app/(home)/contexts/dashboard.context';
import { formatDateWithDash } from '@/lib/utils/format.util';
import { calculateTotalNutrition } from '@/lib/utils/nutrition-calculator.util';
import { useUserStore } from '@/store/user-store';
import { MealDTO } from '@/types/DTO/meal.dto';
import { useEffect, useState } from 'react';
import HomeAiFeedbackText from './home-ai-feedback-text';
import HomeCaloriesSummaryCard from './home-calories-summary-card';
import HomeMacroNutrientGroup from './home-macronutrient-group';
import HomeMealEmptyCard from './home-meal-empty-card';
import HomeMealCard from './home-meal-card';

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
      <section>
        <Typography as="h3" variant="subTitle2" className="mb-4 pt-3 text-gray-900">
          식단 기록
        </Typography>
        {meals.length === 0 ? (
          <HomeMealEmptyCard />
        ) : (
          <ul className="flex flex-col gap-4">
            {meals.map((meal) => (
              <HomeMealCard key={meal.id} meal={meal} />
            ))}
          </ul>
        )}
      </section>
    </GlassBackground>
  );
};
export default HomeContent;
