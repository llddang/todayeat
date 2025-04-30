import { getKoreaTime } from '@/utils/date.util';

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
  const filename = `image_${getKoreaTime()}.${idx}.${ext}`;
  return new File([blob], filename, { type: contentType });
};
