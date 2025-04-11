'use client';
import { deleteMeal } from '@/lib/apis/meal.api';
import Image from 'next/image';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

type MealEditCardTitleProps = {
  title: string;
  mealId: string;
};

const MealEditCardTitle = ({ title, mealId }: MealEditCardTitleProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { register } = useFormContext();

  const handleEditTitleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };

  const handleDeleteMeal = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const confirmed = window.confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.');
    if (!confirmed) return;
    await deleteMeal(mealId);
  };

  return (
    <div className="flex shrink-0 flex-grow items-center gap-4 self-stretch pl-1">
      <div className="flex shrink-0 flex-grow items-center gap-1">
        {!isEditing && <span className="text-base/[22px] font-semibold tracking-[-0.0225rem]">{title}</span>}
        {isEditing && (
          // TODO: Bottom Sheet 넣을자리
          <input type="text" id="menu" {...register('menuName')} className="w-0 shrink-0 flex-grow rounded-lg"></input>
        )}
        <button
          onClick={handleEditTitleButtonClick}
          className="flex h-[1.625rem] w-[1.625rem] items-center justify-center gap-2 rounded-full bg-white p-1.5 backdrop-blur-[10px]"
        >
          <Image src="/icons/edit_3_line.svg" width="14" height="14" alt="icon" className="h-[0.875rem] w-[0.875rem]" />
        </button>
      </div>
      <div className="flex aspect-[1/1] h-8 w-8 items-center justify-center">
        <button
          onClick={handleDeleteMeal}
          className="flex h-[1.625rem] w-[1.625rem] items-center justify-center gap-2 rounded-full bg-white p-1.5 backdrop-blur-[10px]"
        >
          <Image src="/icons/close_line.svg" width="14" height="14" alt="icon" className="h-[0.875rem] w-[0.875rem]" />
        </button>
      </div>
    </div>
  );
};

export default MealEditCardTitle;
