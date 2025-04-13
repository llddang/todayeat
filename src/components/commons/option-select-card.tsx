'use client';

import { Typography } from '@/components/ui/typography';

type OptionSelectCardProps = {
  groupName: 'PURPOSE' | 'GENDER' | 'ACTIVITY_LEVEL_OPTIONS';
  title: string;
  value: string;
  description?: string;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'name' | 'defaultChecked'>;

const OptionSelectCard = ({
  groupName,
  title,
  value,
  description,
  checked,
  onChange,
  ...props
}: OptionSelectCardProps) => {
  const labelClasses = `box-border flex w-full cursor-pointer flex-col items-start gap-2 rounded-2xl border-2 border-transparent bg-white p-[calc(1.25rem-2px)] text-gray-800 ${
    checked ? 'border-purple-100/40 bg-gradient-radial-purple' : ''
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
        <Typography as="span" variant={description ? 'subTitle2' : 'body1'}>
          {title}
        </Typography>
        {description && (
          <Typography as="p" variant="body3" className="text-left text-gray-550">
            {description}
          </Typography>
        )}
      </label>
    </div>
  );
};

export default OptionSelectCard;
