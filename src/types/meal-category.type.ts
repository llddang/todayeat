export const MealCategory = {
  BREAKFAST: 'BREAKFAST',
  LUNCH: 'LUNCH',
  DINNER: 'DINNER',
  SNACK: 'SNACK'
} as const;
export type MealCategoryType = keyof typeof MealCategory;
