'use client';

import SITE_MAP from '@/constants/site-map.constant';
import { Button } from '@/components/ui/button';
import { getUser } from '@/apis/user.api';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import AddImageList from '@/app/(client)/meal/post/components/add-image-list';

type AddImageFormProps = {
  onLoadingChange: (isLoading: boolean) => void;
  onOpenRetryErrorModalChange: (open: boolean) => void;
};

const AddImageForm = ({ onLoadingChange, onOpenRetryErrorModalChange }: AddImageFormProps): JSX.Element => {
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
        onLoadingChange(false);
        onOpenRetryErrorModalChange(true);
        return;
      }
      router.replace(SITE_MAP.MEAL_POST_EDIT);
    } catch (err) {
      console.error(err);
      onLoadingChange(false);
      return onOpenRetryErrorModalChange(true);
    }
  };

  return (
    <form onSubmit={handleAnalyzeSubmit} className="flex w-full flex-col items-center justify-center gap-7">
      <AddImageList onImagesChange={setImages} />
      <Button type="submit" variant="primary" disabled={!images.length}>
        사진 올리고 분석하기
      </Button>
    </form>
  );
};

export default AddImageForm;
