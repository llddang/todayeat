import { Typography } from '@/components/ui/typography';
import { getEmojiForPersonalInfo } from '@/lib/utils/get-emoji-for-personal-info.util';
import React from 'react';

type MyPageUserInfoListProps = {
  title: string;
  description: string | number;
};

const MyPageUserInfoList = ({ title, description }: MyPageUserInfoListProps) => {
  const emoji = getEmojiForPersonalInfo(title, description as string);
  const displayText = emoji ? `${emoji} ${description}` : description;

  return (
    <li className="flex justify-between gap-4">
      <Typography as="span" variant="body1" className="pl-1 text-gray-600">
        {title}
      </Typography>
      <Typography as="span" variant="body1" className="flex-1 text-right">
        {displayText}
      </Typography>
    </li>
  );
};

export default MyPageUserInfoList;
