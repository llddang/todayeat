import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import React, { ChangeEvent, InputHTMLAttributes } from 'react';

export type TagSelectItemProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange' | 'value' | 'name' | 'defaultChecked' | 'children'
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
          id={value}
          value={value}
          className="hidden"
          name={groupName}
          checked={checked}
          onChange={onChange}
          {...props}
        />
        <label
          className={cn(
            'inline-flex h-11 items-center justify-center gap-1.5 whitespace-nowrap text-nowrap rounded-[6.25rem] px-4',
            'before:block before:h-4 before:w-4 before:bg-contain before:bg-center before:bg-no-repeat before:content-[""]',
            checked ? 'bg-gray-900 text-gray-50' : 'bg-white text-gray-700',
            icon
          )}
          htmlFor={value}
        >
          <Typography as="span" variant={checked ? 'subTitle3' : 'body2'}>
            {label}
          </Typography>
        </label>
      </div>
    );
  }
);
TagSelectItem.displayName = 'TagSelectItem';

export default TagSelectItem;
