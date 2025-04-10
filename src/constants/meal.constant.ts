import { StaticImageData } from 'next/image';
import { MealCategoryType } from '@/types/meal-category.type';
import BREAKFAST from '@/../public/meal-category/breakfast.svg';
import LUNCH from '@/../public/meal-category/lunch.svg';
import DINNER from '@/../public/meal-category/dinner.svg';
import SNACK from '@/../public/meal-category/snack.svg';

export const MEAL_CATEGORY_OPTIONS: { [key in MealCategoryType]: { name: string; icon: StaticImageData } } = {
  BREAKFAST: { name: '아침', icon: BREAKFAST },
  LUNCH: { name: '점심', icon: LUNCH },
  DINNER: { name: '저녁', icon: DINNER },
  SNACK: { name: '간식', icon: SNACK }
} as const;
