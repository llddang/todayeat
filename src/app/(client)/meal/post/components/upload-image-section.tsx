'use client';
import { Typography } from '@/components/ui/typography';
import React, { useState } from 'react';
import MealPostAddMealAiLoading from './meal-post-add-meal-ai-loading';
import MealPostAddImageForm from './meal-post-add-image-form';
import useRestoreAnalysisModal from '../hooks/use-restore-analysis-modal';
import RestoreAnalysisModal from './restore-analysis-modal';

type UploadImageSectionProps = {
  isRecorded: boolean;
};

const UploadImageSection = ({ isRecorded }: UploadImageSectionProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showModal, setShowModal, handleApproveClick, handleCancelClick } = useRestoreAnalysisModal(isRecorded);

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-8.75rem)] items-center justify-center xl:min-h-[calc(100vh-4.725rem)]">
        <MealPostAddMealAiLoading />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-7 px-4 py-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <Typography variant="title2" as="p">
          오늘의 식사를 간편하게 남겨보세요!
        </Typography>
        <Typography className="text-center">
          음식 사진을 올리면 AI가 <br /> 음식 종류와 영양소를 분석해 드려요
        </Typography>
      </div>
      <RestoreAnalysisModal
        open={showModal}
        onOpenChange={setShowModal}
        onApproveClickHandler={handleApproveClick}
        onCancelClickHandler={handleCancelClick}
      />
      <MealPostAddImageForm onLoadingChange={setIsLoading} />
    </div>
  );
};

export default UploadImageSection;
