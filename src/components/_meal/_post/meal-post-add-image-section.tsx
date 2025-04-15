'use client';

import MealPostAddImage from './meal-post-add-image';
import { Button } from '@/components/ui/button';
import useMealAnalysis from '@/lib/hooks/use-meal-analysis';

type MealPostAddImageSectionProps = {
  onLoadingChange: (isLoading: boolean) => void;
};

const MealPostAddImageSection = ({ onLoadingChange }: MealPostAddImageSectionProps): JSX.Element => {
  const { images, setImages, handleAnalyzeSubmit } = useMealAnalysis(onLoadingChange);

  return (
    <form className="flex flex-col items-center justify-center gap-7">
      <MealPostAddImage onImagesChange={setImages} />
      <Button variant="primary" onClick={handleAnalyzeSubmit} disabled={!images.length}>
        사진 올리고 분석하기
      </Button>
    </form>
  );
};

export default MealPostAddImageSection;
