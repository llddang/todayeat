export const ERROR_MESSAGES = {
  LOGIN_REQUIRED: {
    title: '로그인이 필요합니다',
    content: '서비스 이용을 위해 로그인 후 다시 시도해주세요.'
  },
  AI_ANALYSIS_FAILED: {
    title: '메뉴 분석에 실패했습니다',
    content: '메뉴명이 정확한지 확인 후 다시 시도해주세요.'
  },
  SERVICE_ERROR: {
    title: '일시적인 오류가 발생했습니다',
    content: '잠시 후 다시 시도해주세요.'
  }
} as const;
