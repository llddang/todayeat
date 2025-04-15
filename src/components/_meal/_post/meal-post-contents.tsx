'use client';
import { Typography } from '@/components/ui/typography';
import React, { useState } from 'react';
import MealPostAddImageSection from './meal-post-add-image-section';
import MealPostModal from './meal-post-modal';
import useMealPostModal from '@/lib/hooks/use-meal-post-modal';

type MealPostContentsProps = {
  isRecord: boolean;
};

const MealPostContents = ({ isRecord }: MealPostContentsProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showModal, setShowModal, handleApproveClick, handleCancelClick } = useMealPostModal(isRecord);

  if (isLoading) return <div>loading</div>;

  return (
    <div className="flex flex-col items-center gap-7 px-4 py-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <Typography variant="title2" as="p">
          오늘의 식사를 간편하게 남겨보세요!
        </Typography>
        <Typography variant="body2" as="p" className="whitespace-pre-line text-center">
          음식 사진을 올리면 AI가 <br /> 음식 종류와 영양소를 분석해 드려요
        </Typography>
      </div>
      <MealPostModal
        open={showModal}
        onOpenChange={setShowModal}
        onApproveClickHandler={handleApproveClick}
        onCancelClickHandler={handleCancelClick}
      />
      <MealPostAddImageSection onLoadingChange={setIsLoading} />
    </div>
  );
};

export default MealPostContents;
