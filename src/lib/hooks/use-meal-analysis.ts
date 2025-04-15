import { useState } from 'react';
import { getUser } from '../apis/user.api';

const useMealAnalysis = (onLoadingChange: (isLoading: boolean) => void) => {
  const [images, setImages] = useState<File[]>([]);

  const handleAnalyzeSubmit = async (): Promise<void> => {
    if (images.length === 0) {
      return;
    }

    try {
      onLoadingChange(true);

      const formData = new FormData();
      const { id: userId } = await getUser();
      formData.append('userId', userId);

      images.forEach((file) => {
        formData.append('files', file);
      });
      const res = await fetch('/api/gemini/food-image-analysis', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        return alert('분석에 실패하였습니다. 잠시후 다시 시도해주세요');
      }
    } catch (err) {
      console.error(err);
      return alert('분석중 오류가 발생했습니다. ');
    } finally {
      onLoadingChange(false);
    }
  };

  return {
    images,
    setImages,
    handleAnalyzeSubmit
  };
};
export default useMealAnalysis;
