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
  const response = await fetch(url);
  const buffer: ArrayBuffer = await response.arrayBuffer();

  const mimeType = response.headers.get('content-type') || 'image/jpeg';

  return {
    inlineData: {
      data: Buffer.from(buffer).toString('base64'),
      mimeType
    }
  };
};
