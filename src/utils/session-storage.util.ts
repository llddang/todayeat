import { isServer } from '@/utils/predicate.util';

/**
 * 세션 스토리지에서 데이터를 가져오는 함수
 * @param {string} id 가져올 데이터의 키 값
 * @param {<R>} defaultValue 데이터가 없거나 파싱 실패 시 반환할 기본값
 * @returns 파싱된 데이터 또는 기본값
 */
export const getSessionStorageItem = <R>(id: string, defaultValue: R): R => {
  if (isServer()) return defaultValue as R;

  const sessionData = sessionStorage.getItem(id) ?? '{}';
  let parsedData: R;

  try {
    parsedData = JSON.parse(sessionData);
  } catch (parseError) {
    console.error('Failed to parse session data:', parseError);
    parsedData = {} as R;
    sessionStorage.setItem(id, JSON.stringify(defaultValue));
  }

  return parsedData;
};

/**
 * 세션 스토리지에 데이터를 저장하는 함수
 * @param {string} id 저장할 데이터의 키 값
 * @param {unknown} item 저장할 데이터 객체
 * @returns 저장 성공 여부 (서버 환경에서는 false 반환)
 */
export const setSessionStorageItem = (id: string, item: unknown): boolean => {
  if (isServer()) return false;

  try {
    sessionStorage.setItem(id, JSON.stringify(item));
    return true;
  } catch (error) {
    console.error('Failed to set item from session storage:', error);
    return false;
  }
};

/**
 * 세션 스토리지에서 특정 데이터를 삭제하는 함수
 * @param {string} id 삭제할 데이터의 키 값
 * @returns 삭제 성공 여부 (서버 환경에서는 false 반환)
 */
export const removeSessionStorageItem = (id: string): boolean => {
  if (isServer()) return false;

  try {
    sessionStorage.removeItem(id);
    return true;
  } catch (error) {
    console.error('Failed to remove item from session storage:', error);
    return false;
  }
};
