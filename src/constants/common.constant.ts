// 퍼널의 URL 쿼리 파라미터 키값
export const FUNNEL_QUERY_PARAM = 'step';

const MACRO_NAME_MAP: Record<string, string> = {
  CARBOHYDRATE: '탄수화물',
  PROTEIN: '단백질',
  FAT: '지방'
} as const;

// TODO config 설정 시 컬러 변경 필요
export const MACRO_COLOR_MAP: Record<string, string> = {
  [MACRO_NAME_MAP.CARBOHYDRATE]: 'bg-[#E3C0FA]',
  [MACRO_NAME_MAP.PROTEIN]: 'bg-[#9BE7D6]',
  [MACRO_NAME_MAP.FAT]: 'bg-[#B8E7FF]'
} as const;
