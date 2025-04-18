/**
 * 현재 코드가 클라이언트(브라우저) 환경에서 실행되고 있는지 확인하는 함수입니다.
 * @returns boolean
 */
export const isClient = (): boolean => {
  return typeof window !== 'undefined' || typeof document !== 'undefined' || typeof navigator !== 'undefined';
};

/**
 * 현재 코드가 서버 환경에서 실행되고 있는지 확인하는 함수입니다.
 * @returns boolean
 */
export const isServer = (): boolean => {
  return typeof window === 'undefined' && typeof document === 'undefined' && typeof navigator === 'undefined';
};
