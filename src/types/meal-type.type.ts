export const MealTypeMap = {
  BREAKFAST: {
    value: 'BREAKFAST', // 데이터베이스에 저장될 값
    label: '아침' // 화면에 표시될 값
  },
  LUNCH: {
    value: 'LUNCH',
    label: '점심'
  },
  DINNER: {
    value: 'DINNER',
    label: '저녁'
  },
  SNACK: {
    value: 'SNACK',
    label: '간식'
  }
} as const;

export type MealTypeKey = keyof typeof MealTypeMap;
export type MealTypeValue = (typeof MealTypeMap)[MealTypeKey]['label'];
export type MealTypeItem = (typeof MealTypeMap)[MealTypeKey];

export const MealTypeArray: MealTypeItem[] = Object.values(MealTypeMap);
