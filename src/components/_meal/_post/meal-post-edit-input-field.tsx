'use client';
import { useFormContext } from 'react-hook-form';
import { MeasurementUnitType } from '@/types/nutrition.type';
import { MEASUREMENT_UNIT } from '@/constants/nutrition.constant';
import { Input } from '@/components/ui/input';
import { FormEvent, InputHTMLAttributes } from 'react';

type MealPostEditInputFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'maxLength' | 'name' | 'onBlur' | 'onChange'
> & {
  variety: MeasurementUnitType;
  type?: string;
  maxLength: number;
  idx: number;
};

const MealPostEditInputField = ({
  variety,
  maxLength,
  type = 'text',
  idx,
  ...props
}: MealPostEditInputFieldProps): JSX.Element => {
  const { register } = useFormContext();
  const { name: fieldName, unit } = MEASUREMENT_UNIT[variety];
  const handleNumericInput = (e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, maxLength);
  };
  return (
    <Input
      className={props.className}
      type={type}
      onInput={handleNumericInput}
      {...register(`meals.${idx}.${fieldName}`, {
        valueAsNumber: true
      })}
      inputMode="numeric"
      measure={unit}
    />
  );
};

export default MealPostEditInputField;
