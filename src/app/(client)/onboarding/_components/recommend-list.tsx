import { Typography } from '@/components/ui/typography';
import { ReactNode } from 'react';

type RecommendListProps = {
  title: ReactNode;
  description: ReactNode;
  image: string;
};

const RecommendList = ({ title, description, image }: RecommendListProps) => {
  return (
    <li
      className={`relative flex gap-3 p-2 before:block before:h-[3.75rem] before:w-[3.75rem] before:rounded-[0.875rem] before:bg-gray-75 before:bg-[length:2rem_2rem] before:bg-center before:bg-no-repeat before:content-[''] xl:flex-1 ${image}`}
    >
      <div className="flex flex-col gap-2">
        <Typography as="span" variant="subTitle1" className="my-[0.3rem]">
          {title}
        </Typography>
        <Typography as="p" variant="body2" className="text-gray-600">
          {description}
        </Typography>
      </div>
    </li>
  );
};

export default RecommendList;
