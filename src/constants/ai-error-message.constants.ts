export const AI_ERROR_KEYS = {
  IMAGE_NOT_FOUND: 'IMAGE_NOT_FOUND',
  PARSE_FAILED: 'PARSE_FAILED',
  GEMINI_GENERATION_FAILED: 'GEMINI_GENERATION_FAILED',
  SUPABASE_INSERT_FAILED: 'SUPABASE_INSERT_FAILED',
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
    message: 'AI 분석에 실패했습니다.',
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
  UNKNOWN: {
    status: 500,
    message: '알 수 없는 오류가 발생했습니다.',
    action: '잠시 후 다시 시도해주세요.'
  }
} as const;

export type AIErrorMessageType = keyof typeof AI_ERROR_MESSAGE;

export function isAIErrorResponse(key: AIErrorMessageType) {
  return {
    error: AI_ERROR_MESSAGE[key].message,
    action: AI_ERROR_MESSAGE[key].action
  };
}
