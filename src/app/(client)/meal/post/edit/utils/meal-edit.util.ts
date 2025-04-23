export const parseNumber = (value: string): number => {
  return Number(value.replace(/,/g, ''));
};

export const formatNumberWithComma = (value: number | undefined): string => {
  if (value === undefined) return '';
  return value.toLocaleString();
};

export const handleNumericInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  onChange: (value: number | undefined) => void,
  allowEmpty: boolean = false
) => {
  const value = e.target.value.replace(/[^0-9]/g, '');
  if (allowEmpty && value === '') {
    onChange(undefined);
  } else {
    onChange(value ? Number(value) : 0);
  }
};

export const getFormattedNumericValue = (value: number | undefined, allowEmpty: boolean = false): string => {
  if (value === undefined) return allowEmpty ? '' : '0';
  return formatNumberWithComma(value);
};
