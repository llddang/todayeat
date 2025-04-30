export const ERROR_MESSAGES = {
  AI_ANALYSIS_FAILED: {
    title: 'AI가 분석하기 어려운 메뉴입니다.',
    description: '메뉴명을 확인해 주세요.'
  },
  MEAL_POST_FAILED: {
    title: ' 식사 정보 등록에 실패했습니다.',
    description: '잠시 후 다시 시도해 주세요.'
  },
  MEAL_DELETE_FAILED: {
    title: '식사 카드 삭제에 실패했습니다.',
    description: '잠시 후 다시 시도해 주세요.'
  },
  AI_ANALYSIS_FAILED_DEFAULT: {
    title: 'AI 분석 중 문제가 발생했습니다.',
    description: '잠시 후 다시 시도해 주세요.'
  }
} as const;
