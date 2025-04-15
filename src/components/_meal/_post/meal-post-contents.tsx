'use client';
import { Typography } from '@/components/ui/typography';
import React, { useState } from 'react';
import MealPostAddImageSection from './meal-post-add-image-section';

type MealPostContentsProps = {
  initialImages?: string[];
};

const MealPostContents = ({ initialImages = [] }: MealPostContentsProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center gap-7 px-4 py-8">
      {isLoading ? (
        <div>loading</div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center gap-2">
            <Typography variant="title2" as="p">
              오늘의 식사를 간편하게 남겨보세요!
            </Typography>
            <Typography variant="body2" as="p" className="whitespace-pre-line text-center">
              음식 사진을 올리면 AI가 <br /> 음식 종류와 영양소를 분석해 드려요
            </Typography>
          </div>
          <MealPostAddImageSection initialImages={initialImages} onLoadingChange={setIsLoading} />
        </>
      )}
    </div>
  );
};

export default MealPostContents;
