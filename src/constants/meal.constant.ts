import { StaticImageData } from 'next/image';
import { MealCategoryType } from '@/types/meal-category.type';
import { MB } from '@/constants/common.constant';

export const MEAL_CATEGORY_OPTIONS: { [key in MealCategoryType]: { name: string; icon: string } } = {
  BREAKFAST: { name: '아침', icon: 'before:bg-meal-category-breakfast' },
  LUNCH: { name: '점심', icon: 'before:bg-meal-category-lunch' },
  DINNER: { name: '저녁', icon: 'before:bg-meal-category-dinner' },
  SNACK: { name: '간식', icon: 'before:bg-meal-category-snack' }
} as const;

export const MAX_FILE_SIZE = 10 * MB;
export const MAX_MEAL_IMAGE_COUNT = 3;
