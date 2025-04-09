const MACRO_NAME_MAP: Record<string, string> = {
  carbohydrate: '탄수화물',
  protein: '단백질',
  fat: '지방'
};

// TODO config 설정 시 컬러 변경 필요
export const MACRO_COLOR_MAP: Record<string, string> = {
  [MACRO_NAME_MAP.carbohydrate]: 'bg-[#E3C0FA]',
  [MACRO_NAME_MAP.protein]: 'bg-[#9BE7D6]',
  [MACRO_NAME_MAP.fat]: 'bg-[#B8E7FF]'
};
