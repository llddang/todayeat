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
