import { Typography } from '@/components/ui/typography';
import Image, { StaticImageData } from 'next/image';

type IntroduceListProps = {
  order: string;
  description: React.ReactNode;
  image: StaticImageData;
};

const IntroduceList = ({ order, description, image }: IntroduceListProps) => {
  return (
    <li className="rounded-2xl px-6 py-6 bg-gradient-radial-purple-2 xl:flex-1">
      <div className="flex gap-2">
        <Typography as="span" variant="subTitle1" className="text-purple-200">
          {order}
        </Typography>
        <Typography as="p" variant="subTitle1" className="text-gray-800">
          {description}
        </Typography>
      </div>
      <div className="relative mt-4 aspect-[2/2.5] w-full p-4">
        <div className="relative h-full w-full">
          <Image src={image} fill alt={`식사 기록 화면 미리보기 ${order}`} sizes="80vw" />
        </div>
      </div>
    </li>
  );
};

export default IntroduceList;
