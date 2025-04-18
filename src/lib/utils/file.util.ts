/**
 * 파일명을 S3 객체 키에서 사용 가능한 안전한 형식으로 변환합니다.
 *
 * 이 함수는 S3에서 허용되지 않는 문자를 제거하거나 안전한 문자로 대체합니다.
 * 특별한 처리가 필요한 문자들도 적절히 처리합니다.
 *
 * @param {string} filename - 변환할 원본 파일명
 * @param {string} [replacement='_'] - 안전하지 않은 문자를 대체할 문자
 * @returns {string} S3에서 사용 가능한 안전한 파일명
 */
export function sanitizeFilename(filename: string, replacement: string = '_'): string {
  if (!filename || typeof filename !== 'string') {
    return '';
  }
  const safeChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_/!-.*'() &$@=;:+,?";

  let sanitized = '';
  for (const char of filename) {
    sanitized += safeChars.includes(char) ? char : replacement;
  }

  // 시작과 끝의 공백 제거
  sanitized = sanitized.trim();

  // 연속된 대체 문자를 하나로 압축 (예: '___' -> '_')
  const regexPattern = new RegExp(`\\${replacement}{2,}`, 'g');
  sanitized = sanitized.replace(regexPattern, replacement);

  // 파일명 시작/끝에 있는 대체 문자 제거
  const startEndPattern = new RegExp(`^\\${replacement}|\\${replacement}$`, 'g');
  sanitized = sanitized.replace(startEndPattern, '');

  // 빈 문자열이 되면 기본값 설정
  if (sanitized === '') sanitized = 'file';

  return sanitized;
}
