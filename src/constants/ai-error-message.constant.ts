export const AI_ERROR_KEYS = {
  IMAGE_NOT_FOUND: 'IMAGE_NOT_FOUND',
  GEMINI_PARSE_FAILED: 'GEMINI_PARSE_FAILED',
  GEMINI_GENERATION_FAILED: 'GEMINI_GENERATION_FAILED',
  SUPABASE_INSERT_FAILED: 'SUPABASE_INSERT_FAILED',
  NO_VALID_FOOD_FOUND: 'NO_VALID_FOOD_FOUND',
  MISSING_INPUT: 'MISSING_INPUT',
  INVALID_INPUT: 'INVALID_INPUT',
  UNKNOWN: 'UNKNOWN'
} as const;

export const AI_ERROR_MESSAGE = {
  IMAGE_NOT_FOUND: {
    status: 404,
    message: '이미지를 찾을 수 없습니다.',
    action: '이미지를 다시 업로드해주세요.'
  },
  GEMINI_GENERATION_FAILED: {
    status: 500,
    message: 'AI가 분석하기 어려운 메뉴입니다.',
    action: '잠시 후 다시 시도해주세요.'
  },
  GEMINI_PARSE_FAILED: {
    status: 422,
    message: 'AI 분석 결과를 처리하지 못했습니다.',
    action: '잠시 후 다시 시도해주세요.'
  },
  SUPABASE_INSERT_FAILED: {
    status: 500,
    message: '분석 결과 저장에 실패했습니다.',
    action: '잠시 후 다시 시도해주세요.'
  },
  NO_VALID_FOOD_FOUND: {
    status: 400,
    message: '유효한 음식 이미지를 찾을 수 없습니다.',
    action: '음식이 잘 보이도록 이미지를 다시 업로드해주세요.'
  },
  MISSING_INPUT: {
    status: 400,
    message: '필수 입력값이 누락되었습니다.',
    action: '음식 이름과 무게를 모두 입력해주세요.'
  },
  INVALID_INPUT: {
    status: 400,
    message: '입력 값이 유효하지 않습니다.',
    action: '음식 이름과 무게를 확인해주세요.'
  },
  UNKNOWN: {
    status: 500,
    message: '알 수 없는 오류가 발생했습니다.',
    action: '잠시 후 다시 시도해주세요.'
  }
} as const;

export type AIErrorMessageType = keyof typeof AI_ERROR_MESSAGE;

export const isAIErrorResponse = (key: AIErrorMessageType) => {
  return {
    error: AI_ERROR_MESSAGE[key].message,
    action: AI_ERROR_MESSAGE[key].action
  };
};
