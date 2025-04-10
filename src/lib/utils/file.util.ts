/**
 * 파일명이 S3 객체 키로 안전한 문자만 포함하는지 검증합니다.
 *
 * 이 함수는 파일명이 Amazon S3 객체 키에서 특별한 처리 없이 사용할 수 있는
 * 안전한 문자와 특별한 처리가 필요하지만 여전히 유효한 일부 문자만 포함하는지 확인합니다.
 *
 * 안전한 문자는 다음과 같습니다:
 * - 영숫자 (a-z, A-Z, 0-9)
 * - 밑줄 (_)
 * - 슬래시 (/)
 * - 느낌표 (!)
 * - 하이픈 (-)
 * - 마침표 (.)
 * - 별표 (*)
 * - 작은따옴표 (')
 * - 괄호 ( () )
 * - 공백 ( )
 * - 앰퍼샌드 (&)
 * - 달러 기호 ($)
 * - 골뱅이 (@)
 * - 등호 (=)
 * - 세미콜론 (;)
 * - 콜론 (:)
 * - 더하기 기호 (+)
 * - 쉼표 (,)
 * - 물음표 (?)
 *
 * @see {@link https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html AWS S3 객체 키 문서}
 *
 * @param {string} filename - 검증할 파일명
 * @returns {boolean} - 파일명이 S3 안전 문자만 포함하면 true, 그렇지 않으면 false 반환
 */
export const isValidFilename = (filename: string): boolean => {
  // only allow s3 safe characters and characters which require special handling for now
  // https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html
  return /^(\w|\/|!|-|\.|\*|'|\(|\)| |&|\$|@|=|;|:|\+|,|\?)*$/.test(filename);
};

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

/**
 * 파일의 고유 식별자(ID)를 생성하는 함수
 *
 * 파일의 내재적 속성(이름, 크기, 마지막 수정 시간, MIME 타입)을 조합하여
 * 해시 알고리즘을 적용해 고유한 식별자를 생성합니다.
 * 이 식별자는 같은 파일에 대해 항상 동일하게 유지됩니다.
 *
 * @param {File} file - 식별자를 생성할 File 객체
 * @returns {string} 형식: '[해시값]-[파일크기]-[파일명]' 형태의 고유 식별자
 *
 */
export const getFileId = (file: File): string => {
  const fileInfo = [file.name, file.size.toString(), file.lastModified.toString(), file.type].join('|');

  let hash = 0;
  for (let i = 0; i < fileInfo.length; i++) {
    const char = fileInfo.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return `${hash.toString(16)}-${file.size}-${file.name.replace(/\s+/g, '_')}`;
};
