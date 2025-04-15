'use client';
import { useFormContext } from 'react-hook-form';
import { MeasurementUnitType } from '@/types/nutrition.type';
import { MEASUREMENT_UNIT } from '@/constants/nutrition.constant';
import { Input } from '@/components/ui/input';
import { InputHTMLAttributes } from 'react';

type MealPostEditInputFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'maxLength'> & {
  variety: MeasurementUnitType;
  type?: string;
  maxLength: number;
  idx: number;
};

const MealEditInputField = ({
  variety,
  maxLength,
  type = 'text',
  idx,
  ...props
}: MealPostEditInputFieldProps): JSX.Element => {
  const { register } = useFormContext();
  const { name, unit } = MEASUREMENT_UNIT[variety];

  const handleOnRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e);
  };
  return (
    <Input
      className={props.className}
      type={type}
      onInput={(e) => {
        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
      }}
      {...register(`meals.${idx}.${name}`, {
        required: true,
        onChange: handleOnRegisterChange,
        valueAsNumber: true
      })}
      maxLength={maxLength}
      inputMode="numeric"
      measure={unit}
    />
  );
};

export default MealEditInputField;
