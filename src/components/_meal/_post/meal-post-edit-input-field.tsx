'use client';
import { useFormContext } from 'react-hook-form';
import { MeasurementUnitType } from '@/types/nutrition.type';
import { MEASUREMENT_UNIT } from '@/constants/nutrition.constant';

type MacronutrientInputFieldProps = {
  variety: MeasurementUnitType;
  type?: string;
};

const INPUT_MAX_LENGTH = 4;

const MealEditInputField = ({ variety, type = 'text' }: MacronutrientInputFieldProps): JSX.Element => {
  const { register } = useFormContext();

  const name = MEASUREMENT_UNIT[variety].name;
  const unit = MEASUREMENT_UNIT[variety].unit;

  const handleOnRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
  };
  return (
    <div className="relative">
      <input
        type={type}
        {...register(`${name}`, {
          required: true,
          onChange: handleOnRegisterChange
        })}
        maxLength={INPUT_MAX_LENGTH}
        inputMode="numeric"
        className="flex h-12 w-full items-center rounded-lg border border-gray-300 bg-white px-3 py-2 pl-4 text-[1rem] font-normal leading-[1.4rem] tracking-[-0.02rem]"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm/[20px] tracking-snug">{unit}</span>
    </div>
  );
};

export default MealEditInputField;
