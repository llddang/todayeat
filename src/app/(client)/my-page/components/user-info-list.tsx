import { Typography } from '@/components/ui/typography';

type UserInfoListProps = {
  title: string;
  description: string | number;
};

const UserInfoList = ({ title, description }: UserInfoListProps) => {
  return (
    <li className="flex justify-between gap-4">
      <Typography as="span" variant="body1" className="pl-1 text-gray-600">
        {title}
      </Typography>
      <Typography as="span" variant="body1" className="flex-1 text-right">
        {description}
      </Typography>
    </li>
  );
};

export default UserInfoList;
