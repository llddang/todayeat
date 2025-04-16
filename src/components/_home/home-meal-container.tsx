'use client';

import HomeMealCard from '@/components/_home/home-meal-card';
import HomeMealEmptyCard from '@/components/_home/home-meal-empty-card';
import { Typography } from '@/components/ui/typography';
import { getMyMealByDate } from '@/lib/apis/meal.api';
import { useDashboard } from '@/lib/contexts/dashboard.context';
import { formatDateWithDash } from '@/lib/utils/date.util';
import { MealDTO } from '@/types/DTO/meal.dto';
import { useEffect, useState } from 'react';

const HomeMealContainer = () => {
  const { selectedDate } = useDashboard();

  const [meals, setMeals] = useState<MealDTO[]>([]);

  useEffect(() => {
    const formattedDate = formatDateWithDash(selectedDate);
    getMyMealByDate(formattedDate).then(setMeals);
  }, [selectedDate]);

  if (meals.length === 0) return <HomeMealEmptyCard />;
  return (
    <section className="flex flex-col gap-4">
      <Typography as="h3" variant="subTitle2" className="pt-3 text-gray-900">
        식단 기록
      </Typography>
      {meals.map((meal) => (
        <HomeMealCard key={meal.id} meal={meal} />
      ))}
    </section>
  );
};
export default HomeMealContainer;
