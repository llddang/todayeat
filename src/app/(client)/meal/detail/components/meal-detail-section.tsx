'use client';

import { MealDTO } from '@/types/DTO/meal.dto';
import MealImageCarousel from '../../components/meal-images-carousel';
import { calculateTotalNutrition } from '@/utils/nutrition-calculator.util';
import { MealCategory, MealCategoryType } from '@/types/meal-category.type';
import TagSelectItem from '@/components/commons/tag-select-item';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import TotalNutritionChart from './total-nutrition-chart';
import MealList from './meal-list';

type MealDetailSectionProps = {
  meal: MealDTO;
  onCategoryChange?: (category: MealCategoryType) => void;
};

const MealDetailSection = ({ meal }: MealDetailSectionProps): JSX.Element => {
  const { id, userId, ateAt, mealCategory, memo, foodImages, mealDetails } = meal;
  const [selectedCategory, setSelectedCategory] = useState<MealCategoryType>(mealCategory);

  const imageList = validateFoodImages(foodImages);
  const totalNutrition = calculateTotalNutrition([meal]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value as MealCategoryType;
    setSelectedCategory(category);
  };

  //TODO: 달력/시간 추가하기
  //TODO: FORM 제출에서 UPDATE 로직추가하기

  return (
    <div className="px-4 pb-4 pt-2">
      <MealImageCarousel imageList={imageList} />

      <div className="flex flex-col gap-10">
        <TotalNutritionChart totalNutrition={totalNutrition} />
        <MealList mealDetails={mealDetails} />
        <div className="mt-4 flex w-full items-start justify-between gap-2 overflow-x-auto">
          {MEAL_CATEGORY.map((option) => (
            <TagSelectItem
              key={option.value}
              id={option.value}
              groupName="MEAL_CATEGORY"
              icon={option.icon}
              label={option.label}
              value={option.value}
              checked={selectedCategory === option.value}
              onChange={handleCategoryChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealDetailSection;

const validateFoodImages = (foodImages: string[] | null): string[] => {
  if (Array.isArray(foodImages)) {
    return foodImages;
  }

  return [];
};

const MEAL_CATEGORY = [
  {
    value: MealCategory.BREAKFAST,
    label: '아침',
    icon: 'before:bg-meal-category-breakfast'
  },
  {
    value: MealCategory.LUNCH,
    label: '점심',
    icon: 'before:bg-meal-category-lunch'
  },
  {
    value: MealCategory.DINNER,
    label: '저녁',
    icon: 'before:bg-meal-category-dinner'
  },
  {
    value: MealCategory.SNACK,
    label: '간식',
    icon: 'before:bg-meal-category-snack'
  }
];
