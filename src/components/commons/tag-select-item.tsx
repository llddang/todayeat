import { Typography } from '@/components/ui/typography';
import React, { ChangeEvent, InputHTMLAttributes } from 'react';

export type TagSelectItemProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange' | 'value' | 'name' | 'defaultChecked'
> & {
  groupName: 'MEAL_CATEGORY';
  icon: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
const TagSelectItem = React.forwardRef<HTMLInputElement, TagSelectItemProps>(
  ({ groupName, value, checked, icon, onChange, label, ...props }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          type="radio"
          id={label}
          value={value}
          className="hidden"
          name={groupName}
          checked={checked}
          onChange={onChange}
          {...props}
        />
        <label
          className={`inline-flex h-11 items-center justify-center gap-[0.375rem] rounded-[6.25rem] px-4 ${checked ? 'bg-gray-900 text-gray-50' : 'bg-white text-gray-700'} before:block before:h-4 before:w-4 before:bg-contain before:bg-center ${icon}`}
          htmlFor={label}
        >
          <Typography as="span" variant={checked ? 'subTitle3' : 'body2'}>
            {value}
          </Typography>
        </label>
      </div>
    );
  }
);
TagSelectItem.displayName = 'TagSelectItem';

export default TagSelectItem;
