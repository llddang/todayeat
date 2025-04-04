import ImageContent from '@/types/gemini.type';

export const convertImageFileToBase64 = async (file: File): Promise<ImageContent> => {
  const mimeType = file.type;
  const arrayBuffer = await file.arrayBuffer();
  const base64 = btoa(
    new Uint8Array(arrayBuffer).reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, '')
  );

  return {
    inlineData: {
      data: base64,
      mimeType
    }
  };
};

export const convertImageUrlToBase64 = async (url: string): Promise<ImageContent> => {
  'use server';
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`이미지 불러오기 실패: ${response.status} ${response.statusText}`);
    }

    const buffer: ArrayBuffer = await response.arrayBuffer();
    const mimeType = response.headers.get('content-type') || 'image/jpeg';
    return {
      inlineData: {
        data: Buffer.from(buffer).toString('base64'),
        mimeType
      }
    };
  } catch (error) {
    console.error('이미지 인코딩 실패 :', error);
    throw new Error('이미지 인코딩에 실패하였습니다.');
  }
};
