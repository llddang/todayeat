import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/shadcn';
import React, { InputHTMLAttributes } from 'react';

export type TagSelectItemProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'name' | 'defaultChecked' | 'children'
> & {
  groupName: 'MEAL_CATEGORY';
  icon: string;
  label: string;
  id: string;
  checked?: boolean;
};

const TagSelectItem = React.forwardRef<HTMLInputElement, TagSelectItemProps>(
  ({ groupName, id, icon, label, checked, ...props }, ref) => {
    return (
      <div>
        <input ref={ref} type="radio" id={id} name={groupName} className="hidden" {...props} />
        <label
          htmlFor={id}
          className={cn(
            'inline-flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-[6.25rem] px-4',
            'before:block before:h-4 before:w-4 before:bg-contain before:bg-center before:bg-no-repeat before:content-[""]',
            checked ? 'bg-gray-900 text-gray-50' : 'bg-white text-gray-700',
            icon
          )}
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
