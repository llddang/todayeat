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

const mimeTypeToExtension = (mimeType: string): string => {
  switch (mimeType) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/webp':
      return 'webp';
    case 'image/gif':
      return 'gif';
    case 'image/svg+xml':
      return 'svg';
    default:
      return 'bin'; // fallback
  }
};

export const urlToFile = async (url: string, idx: number): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const contentType = response.headers.get('Content-Type') || 'application/octet-stream';
  const ext = mimeTypeToExtension(contentType);
  const filename = `image_${Date.now()}.${idx}.${ext}`;
  return new File([blob], filename, { type: contentType });
};
