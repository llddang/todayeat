'use client';
import { Typography } from '@/components/ui/typography';
import React, { useState } from 'react';
import MealPostAddImageForm from './meal-post-add-image-form';
import MealPostModal from './meal-post-modal';
import useMealPostModal from '@/lib/hooks/use-meal-post-modal';

type MealPostContentsProps = {
  isRecorded: boolean;
};

const MealPostContents = ({ isRecorded }: MealPostContentsProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showModal, setShowModal, handleApproveClick, handleCancelClick } = useMealPostModal(isRecorded);

  // TODO: 로딩 UI merge되면 수정하기
  if (isLoading) return <div>loading</div>;

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
      <MealPostModal
        open={showModal}
        onOpenChange={setShowModal}
        onApproveClickHandler={handleApproveClick}
        onCancelClickHandler={handleCancelClick}
      />
      <MealPostAddImageForm onLoadingChange={setIsLoading} />
    </div>
  );
};

export default MealPostContents;
