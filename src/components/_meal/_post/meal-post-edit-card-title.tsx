'use client';
import { Input } from '@/components/ui/input';
import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

type MealEditCardTitleProps = InputHTMLAttributes<HTMLInputElement> & {
  title: string;
  idx: number;
};

const MealEditCardTitle = ({ title, idx }: MealEditCardTitleProps): JSX.Element => {
  const { register } = useFormContext();

  return <Input type="text" {...register(`meals.${[idx]}.menuName`, { required: true })} defaultValue={title} />;
};

export default MealEditCardTitle;
