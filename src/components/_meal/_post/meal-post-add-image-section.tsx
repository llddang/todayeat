'use client';

import MealPostModal from './meal-post-modal';
import MealPostAddImage from './meal-post-add-image';
import { Button } from '@/components/ui/button';
import useMealPostModal from '@/lib/hooks/use-meal-post-modal';
import useMealAnalysis from '@/lib/hooks/use-meal-analysis';

type MealPostAddImageSectionProps = {
  initialImages?: string[];
  onLoadingChange: (isLoading: boolean) => void;
};

const MealPostAddImageSection = ({
  initialImages = [],
  onLoadingChange
}: MealPostAddImageSectionProps): JSX.Element => {
  const { showModal, setShowModal, handleApproveClick, handleCancelClick } = useMealPostModal(initialImages);

  const { images, setImages, handleAnalyzeSubmit } = useMealAnalysis(onLoadingChange);

  return (
    <section className="flex flex-col items-center justify-center gap-7">
      <MealPostModal
        open={showModal}
        onOpenChange={setShowModal}
        onApproveClickHandler={handleApproveClick}
        onCancelClickHandler={handleCancelClick}
      />
      <MealPostAddImage onImagesChange={setImages} />
      <Button variant="primary" onClick={handleAnalyzeSubmit} disabled={!images.length}>
        사진 올리고 분석하기
      </Button>
    </section>
  );
};

export default MealPostAddImageSection;
