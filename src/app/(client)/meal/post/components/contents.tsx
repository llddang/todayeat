'use client';
import { Typography } from '@/components/ui/typography';
import React, { useState } from 'react';
import MealPostAddImageForm from '../../../../../components/_meal/_post/meal-post-add-image-form';
import useMealPostModal from '@/lib/hooks/use-meal-post-modal';
import MealPostAddMealAiLoading from '../../../../../components/_meal/_post/meal-post-add-meal-ai-loading';
import Modal from './modal';

type ContentsProps = {
  isRecorded: boolean;
};

const Contents = ({ isRecorded }: ContentsProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showModal, setShowModal, handleApproveClick, handleCancelClick } = useMealPostModal(isRecorded);

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-60px)] items-center justify-center">
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
      <Modal
        open={showModal}
        onOpenChange={setShowModal}
        onApproveClickHandler={handleApproveClick}
        onCancelClickHandler={handleCancelClick}
      />
      <MealPostAddImageForm onLoadingChange={setIsLoading} />
    </div>
  );
};

export default Contents;
