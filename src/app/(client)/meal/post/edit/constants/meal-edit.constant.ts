export const MAX_NUMERIC_LENGTH = 4;
export const MAX_MENU_NAME_LENGTH = 16;

export const MEASUREMENT_UNIT = {
  KCAL: {
    label: '칼로리',
    name: 'calories',
    unit: 'kcal'
  },
  GRAM: {
    label: '그램',
    name: 'weight',
    unit: 'g'
  }
} as const;

export const MEAL_CATEGORY = [
  {
    value: 'BREAKFAST',
    label: '아침',
    icon: 'before:bg-meal-category-breakfast'
  },
  {
    value: 'LUNCH',
    label: '점심',
    icon: 'before:bg-meal-category-lunch'
  },
  {
    value: 'DINNER',
    label: '저녁',
    icon: 'before:bg-meal-category-dinner'
  },
  {
    value: 'SNACK',
    label: '간식',
    icon: 'before:bg-meal-category-snack'
  }
] as const;

export type MeasurementUnitValues = {
  label: string;
  name: string;
  unit: string;
};

export type MeasurementUnitType = 'KCAL' | 'GRAM';

export type MealCategoryType = (typeof MEAL_CATEGORY)[number]['value'];
