'use server';

import { ImageContent } from '@/types/gemini.type';

export const convertImageUrlToBase64 = async (url: string): Promise<ImageContent> => {
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
