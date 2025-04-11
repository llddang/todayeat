// 퍼널의 URL 쿼리 파라미터 키값
export const FUNNEL_QUERY_PARAM = 'step';

const MACRO_NAME_MAP: Record<string, string> = {
  CARBOHYDRATE: '탄수화물',
  PROTEIN: '단백질',
  FAT: '지방'
} as const;

export const MACRO_COLOR_MAP: Record<string, string> = {
  [MACRO_NAME_MAP.CARBOHYDRATE]: 'bg-purple-100',
  [MACRO_NAME_MAP.PROTEIN]: 'bg-teal-100',
  [MACRO_NAME_MAP.FAT]: 'bg-blue-75'
} as const;
