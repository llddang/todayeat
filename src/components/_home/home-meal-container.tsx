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

  return (
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
  );
};
export default HomeMealContainer;
