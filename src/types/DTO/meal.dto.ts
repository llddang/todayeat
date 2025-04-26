import { SnakeCaseObject } from '@/types/common.type';
import { MealCategoryType } from '@/types/meal-category.type';

export type MealDetailDTO = {
  id: string;
  mealId: string;
  menuName: string;
  calories: number;
  carbohydrate: number;
  protein: number;
  fat: number;
  weight: number;
};

export type MealDTO = {
  id: string;
  createdAt: string;
  userId: string;
  foodImages: string[] | null;
  ateAt: string;
  mealCategory: MealCategoryType;
  memo: string | null;
  mealDetails: MealDetailDTO[];
};
export type MealOverviewDTO = Omit<MealDTO, 'mealDetails'>;
export type CreateMealDTO = Pick<MealDTO, 'foodImages' | 'ateAt' | 'mealCategory' | 'memo'>;
export type CreateMealDetailDTO = Omit<MealDetailDTO, 'id' | 'mealId'>;

export type MealSnakeCaseDTO = SnakeCaseObject<MealDTO>;
export type MealDetailSnakeCaseDTO = SnakeCaseObject<MealDetailDTO>;
export type MealOverviewSnakeCaseDTO = SnakeCaseObject<MealOverviewDTO>;
