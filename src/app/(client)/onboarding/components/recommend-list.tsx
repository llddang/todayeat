import { Typography } from '@/components/ui/typography';

type RecommedListProps = {
  title: React.ReactNode;
  description: React.ReactNode;
  image: string;
};

const RecommedList = ({ title, description, image }: RecommedListProps) => {
  return (
    <li className="relative flex gap-3 p-2">
      <div
        className={`h-[3.75rem] w-[3.75rem] flex-shrink-0 rounded-[0.875rem] bg-gray-75 bg-[length:2rem_2rem] bg-center bg-no-repeat ${image}`}
      ></div>
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

export default RecommedList;
