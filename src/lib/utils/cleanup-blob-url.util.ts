/**
 * Blob URL을 정리합니다.
 * URL.createObjectURL()로 생성된 Blob URL을 해제하여 메모리 누수를 방지합니다.
 *
 * @param {string | null} url - 정리할 URL 문자열, blob: 프로토콜로 시작하는 URL만 처리됩니다.
 * @returns {void} 반환값 없음
 */
export const cleanupBlobUrl = (url: string | null): void => {
  if (url?.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};
