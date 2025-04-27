'use client';
import { Typography } from '@/components/ui/typography';
import React, { useState } from 'react';
import AddImageForm from './add-image-form';
import useRestoreAnalysisModal from '../hooks/use-restore-analysis-modal';
import RestoreAnalysisModal from './restore-analysis-modal';
import AddMealAiLoading from './add-meal-ai-loading';
import AddMealDrawer from './add-meal-drawer';
import AddMealModal from './add-meal-modal';
import Responsive from '@/components/commons/responsive';
import RetryErrorModal from './retry-error-modal';

type UploadImageSectionProps = {
  isRecorded: boolean;
};

const UploadImageSection = ({ isRecorded }: UploadImageSectionProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showModal, setShowModal, handleApproveClick, handleCancelClick } = useRestoreAnalysisModal(isRecorded);
  const [isError, setIsError] = useState<boolean>(false);
  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-8.75rem)] items-center justify-center xl:min-h-[calc(100vh-4.725rem)]">
        <AddMealAiLoading />
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

      <div className="flex w-full flex-col items-center justify-center gap-2">
        <AddImageForm onLoadingChange={setIsLoading} onOpenRetryErrorModalChange={setIsError} />
        <Responsive mobile={<AddMealDrawer />} pc={<AddMealModal onLoadingChange={setIsLoading} />} />
      </div>
      <RestoreAnalysisModal
        open={showModal}
        onOpenChange={setShowModal}
        onApproveClickHandler={handleApproveClick}
        onCancelClickHandler={handleCancelClick}
      />
      <RetryErrorModal open={isError} onOpenRetryErrorModalChange={setIsError} />
    </div>
  );
};

export default UploadImageSection;
