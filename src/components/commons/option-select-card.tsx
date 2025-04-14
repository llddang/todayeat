'use client';

import { Typography } from '@/components/ui/typography';

type OptionSelectCardProps = {
  groupName: 'PURPOSE' | 'GENDER' | 'ACTIVITY_LEVEL_OPTIONS';
  title: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  description?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'name' | 'defaultChecked'>;

const OptionSelectCard = ({
  groupName,
  title,
  value,
  checked,
  onChange,
  description,
  ...props
}: OptionSelectCardProps) => {
  const labelClasses = `box-border flex cursor-pointer flex-col gap-2 rounded-2xl border-2 bg-white p-[calc(1.25rem-2px)] text-gray-800 ${
    checked ? 'border-purple-100/40 bg-gradient-radial-purple' : 'border-transparent'
  }`;

  return (
    <div>
      <input
        type="radio"
        id={value}
        name={groupName}
        value={value}
        className="hidden"
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <label className={labelClasses} htmlFor={value}>
        <Typography as="span" variant={checked || description ? 'subTitle2' : 'body1'}>
          {title}
        </Typography>
        {description && (
          <Typography as="p" variant="body3" className="text-gray-550">
            {description}
          </Typography>
        )}
      </label>
    </div>
  );
};

export default OptionSelectCard;
