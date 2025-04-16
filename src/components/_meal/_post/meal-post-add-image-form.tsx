'use client';

import SITE_MAP from '@/constants/site-map.constant';
import MealPostAddImage from './meal-post-add-image';
import { Button } from '@/components/ui/button';
import { getUser } from '@/lib/apis/user.api';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

type MealPostAddImageFormProps = {
  onLoadingChange: (isLoading: boolean) => void;
};

const MealPostAddImageForm = ({ onLoadingChange }: MealPostAddImageFormProps): JSX.Element => {
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter();
  const handleAnalyzeSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (images.length === 0) {
      alert('이미지를 최소 1개 이상 선택해 주세요.');
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
        throw new Error('분석에 실패하였습니다. 잠시후 다시 시도해주세요');
      }

      router.replace(SITE_MAP.MEAL_POST_EDIT);
    } catch (err) {
      console.error(err);
      return alert('분석중 오류가 발생했습니다. ');
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <form onSubmit={handleAnalyzeSubmit} className="flex flex-col items-center justify-center gap-7">
      <MealPostAddImage onImagesChange={setImages} />
      <Button type="submit" variant="primary" disabled={!images.length}>
        사진 올리고 분석하기
      </Button>
    </form>
  );
};

export default MealPostAddImageForm;
