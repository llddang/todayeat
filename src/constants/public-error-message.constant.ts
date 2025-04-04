const PUBLIC_ERROR_MESSAGE = {
  UNAUTHENTICATED: {
    code: 'UNAUTHENTICATED',
    message: '로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.'
  },
  EXPIRED_EMAIL_TOKEN: {
    code: 'EXPIRED_EMAIL_TOKEN',
    message: '이용했거나 만료된 url 입니다. 메일을 재발송해주세요'
  }
} as const;
export default PUBLIC_ERROR_MESSAGE;

export type PublicErrorMessageKey = keyof typeof PUBLIC_ERROR_MESSAGE;
export const isPublicErrorMessage = (code: string): code is PublicErrorMessageKey => {
  return code in PUBLIC_ERROR_MESSAGE;
};
