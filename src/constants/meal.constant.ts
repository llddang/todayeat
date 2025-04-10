import { StaticImageData } from 'next/image';
import { MealCategoryType } from '@/types/meal-category.type';
import BREAKFAST from '@/../public/illustrations/meal-category-breakfast.svg';
import LUNCH from '@/../public/illustrations/meal-category-lunch.svg';
import DINNER from '@/../public/illustrations/meal-category-dinner.svg';
import SNACK from '@/../public/illustrations/meal-category-snack.svg';

export const MEAL_CATEGORY_OPTIONS: { [key in MealCategoryType]: { name: string; icon: StaticImageData } } = {
  BREAKFAST: { name: '아침', icon: BREAKFAST },
  LUNCH: { name: '점심', icon: LUNCH },
  DINNER: { name: '저녁', icon: DINNER },
  SNACK: { name: '간식', icon: SNACK }
} as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
export const MAX_MEAL_IMAGE_COUNT = 3;
