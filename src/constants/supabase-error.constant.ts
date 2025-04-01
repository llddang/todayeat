export const AUTH_ERROR_MESSAGE = {
  anonymous_provider_disabled: {
    message: '익명 로그인이 비활성화되었습니다.',
    action: '다른 로그인 방식을 이용해주세요.'
  },
  bad_code_verifier: {
    message: '인증 코드 검증에 실패했습니다.',
    action: '다시 로그인을 시도해주세요.'
  },
  bad_json: {
    message: '요청 형식이 올바르지 않습니다.',
    action: '다시 시도하거나 관리자에게 문의하세요.'
  },
  bad_jwt: {
    message: '인증 토큰이 유효하지 않습니다.',
    action: '다시 로그인해주세요.'
  },
  bad_oauth_callback: {
    message: 'OAuth 콜백 정보가 올바르지 않습니다.',
    action: '다시 로그인을 시도하거나 다른 로그인 방식을 이용해주세요.'
  },
  bad_oauth_state: {
    message: 'OAuth 상태 정보가 올바르지 않습니다.',
    action: '다시 로그인을 시도해주세요.'
  },
  conflict: {
    message: '요청 처리 중 충돌이 발생했습니다.',
    action: '잠시 후 다시 시도해주세요.'
  },
  email_address_invalid: {
    message: '유효하지 않은 이메일 주소입니다.',
    action: '다른 이메일 주소를 사용해주세요.'
  },
  email_exists: {
    message: '이미 사용 중인 이메일입니다.',
    action: '다른 이메일을 사용하거나 비밀번호 재설정을 시도하세요.'
  },
  flow_state_expired: {
    message: '인증 세션이 만료되었습니다.',
    action: '다시 로그인을 시도해주세요.'
  },
  flow_state_not_found: {
    message: '인증 세션을 찾을 수 없습니다.',
    action: '다시 로그인을 시도해주세요.'
  },
  hook_payload_invalid_content_type: {
    message: '요청 형식이 올바르지 않습니다.',
    action: '관리자에게 문의하세요.'
  },
  hook_payload_over_size_limit: {
    message: '요청 데이터가 너무 큽니다.',
    action: '관리자에게 문의하세요.'
  },
  identity_not_found: {
    message: '계정 정보를 찾을 수 없습니다.',
    action: '다시 로그인하거나 관리자에게 문의하세요.'
  },
  invalid_credentials: {
    message: '로그인 정보가 올바르지 않습니다.',
    action: '이메일과 비밀번호를 확인 후 다시 시도해주세요.'
  },
  over_email_send_rate_limit: {
    message: '너무 많은 이메일이 발송되었습니다.',
    action: '잠시 후 다시 시도해주세요.'
  },
  over_request_rate_limit: {
    message: '너무 많은 요청이 발생했습니다.',
    action: '잠시 후 다시 시도해주세요.'
  },
  refresh_token_not_found: {
    message: '세션을 찾을 수 없습니다.',
    action: '다시 로그인해주세요.'
  },
  refresh_token_already_used: {
    message: '세션이 만료되었습니다.',
    action: '다시 로그인해주세요.'
  },
  request_timeout: {
    message: '요청 처리 시간이 초과되었습니다.',
    action: '잠시 후 다시 시도해주세요.'
  },
  same_password: {
    message: '동일한 비밀번호로 변경할 수 없습니다.',
    action: '기존과 다른 비밀번호를 사용해 주세요.'
  },
  session_expired: {
    message: '세션이 만료되었습니다.',
    action: '다시 로그인해주세요.'
  },
  session_not_found: {
    message: '세션을 찾을 수 없습니다.',
    action: '다시 로그인해주세요.'
  },
  unexpected_audience: {
    message: '토큰 대상이 일치하지 않습니다.',
    action: '다시 로그인해주세요.'
  },
  unexpected_failure: {
    message: '예상치 못한 오류가 발생했습니다.',
    action: '잠시 후 다시 시도하거나 관리자에게 문의하세요.'
  },
  user_already_exists: {
    message: '이미 가입된 사용자입니다.',
    action: '로그인하거나 다른 정보로 가입해주세요.'
  },
  user_not_found: {
    message: '사용자를 찾을 수 없습니다.',
    action: '이메일이나 비밀번호를 확인 후 다시 시도해주세요.'
  },
  validation_failed: {
    message: '입력 정보가 올바르지 않습니다.',
    action: '입력 정보를 확인 후 다시 시도해주세요.'
  },
  weak_password: {
    message: '비밀번호가 안전하지 않습니다.',
    action: '더 강력한 비밀번호를 사용해주세요.'
  }
};
export type AuthErrorMessageType = keyof typeof AUTH_ERROR_MESSAGE;
export function isAuthErrorMessageType(code: string): code is AuthErrorMessageType {
  return code in AUTH_ERROR_MESSAGE;
}

export const STORAGE_ERROR_MESSAGE = {
  '400': {
    message: '요청 형식이 올바르지 않습니다.',
    action: '입력 값을 확인하고 다시 시도해주세요.'
  },
  '401': {
    message: '인증에 실패했습니다.',
    action: '로그인 상태를 확인하거나 다시 로그인해주세요.'
  },
  '403': {
    message: '접근 권한이 없습니다.',
    action: '권한을 확인하거나 관리자에게 문의해주세요.'
  },
  '404': {
    message: '요청하신 리소스를 찾을 수 없습니다.',
    action: '경로나 파일명을 확인하고 다시 시도해주세요.'
  },
  '409': {
    message: '리소스 충돌이 발생했습니다.',
    action: '다른 이름을 사용하거나 기존 리소스를 확인해주세요.'
  },
  '411': {
    message: '콘텐츠 길이 정보가 누락되었습니다.',
    action: '요청 헤더를 확인하고 다시 시도해주세요.'
  },
  '413': {
    message: '파일 크기가 너무 큽니다.',
    action: '더 작은 파일을 업로드하거나 프로젝트 설정을 확인해주세요.'
  },
  '416': {
    message: '요청한 범위가 유효하지 않습니다.',
    action: '파일 크기와 범위 설정을 확인해주세요.'
  },
  '423': {
    message: '리소스가 잠겨 있습니다.',
    action: '잠시 후 다시 시도해주세요.'
  },
  '500': {
    message: '서버에 문제가 생겼습니다.',
    action: '관리자에게 문의해주세요.'
  },
  '503': {
    message: '서비스를 일시적으로 사용할 수 없습니다.',
    action: '잠시 후 다시 시도해주세요.'
  },
  '504': {
    message: '서버 응답 시간이 초과되었습니다.',
    action: '잠시 후 다시 시도하거나 관리자에게 문의해주세요.'
  }
} as const;
export type StorageErrorMessageType = keyof typeof STORAGE_ERROR_MESSAGE;
export function isStorageErrorMessageType(code: string): code is StorageErrorMessageType {
  return code in STORAGE_ERROR_MESSAGE;
}
