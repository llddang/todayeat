export const ERROR_MESSAGES = {
  AI_ANALYSIS_FAILED: {
    title: 'AI 분석에 실패하였습니다.',
    description: '메뉴명을 다시 입력해주세요.'
  },
  MEAL_POST_FAILED: {
    title: ' 식사 정보 등록에 실패했습니다.',
    description: '잠시 후 다시 시도해주세요.'
  },
  INVALID_DATA: {
    title: '데이터 형식이 올바르지 않습니다.',
    description: '데이터 형식을 확인해주세요.'
  },
  MEAL_DELETE_FAILED: {
    title: '식사 카드 삭제에 실패했습니다.',
    description: '잠시 후 다시 시도해주세요.'
  },
  AI_ANALYSIS_FAILED_DEFAULT: {
    title: 'AI 분석 중 문제가 발생했습니다.',
    description: '잠시 후 다시 시도해주세요.'
  }
} as const;
