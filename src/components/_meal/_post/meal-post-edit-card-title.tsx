'use client';
import { useFormContext } from 'react-hook-form';

type MealEditCardTitleProps = {
  title: string;
};

const MealEditCardTitle = ({ title }: MealEditCardTitleProps): JSX.Element => {
  const { register } = useFormContext();

  return (
    <div className="flex shrink-0 flex-grow items-center gap-4 self-stretch pl-1">
      <div className="flex flex-1 items-center gap-1">
        <input
          type="text"
          id="menu"
          {...register('menuName')}
          defaultValue={title}
          className="w-0 shrink-0 flex-grow rounded-lg"
        />
      </div>
    </div>
  );
};

export default MealEditCardTitle;
