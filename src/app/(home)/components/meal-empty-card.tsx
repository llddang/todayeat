import { Typography } from '@/components/ui/typography';
import SITE_MAP from '@/constants/site-map.constant';
import { cn } from '@/lib/shadcn';
import Link from 'next/link';

const MealEmptyCard = () => {
  return (
    <Link
      href={SITE_MAP.MEAL_POST}
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-2xl bg-white px-4 py-7 text-center',
        'before:h-10 before:w-10 before:bg-image-upload-illustration before:bg-contain before:bg-center before:bg-no-repeat'
      )}
    >
      <div>
        <Typography variant="subTitle2" className="text-gray-900">
          오늘의 식사를 간편하게 남겨보세요!
        </Typography>
        <Typography variant="body3" className="mt-2 text-gray-600">
          사진을 올리면 AI가 알아서 분석해 드려요.
          <br />
          지금 첫 식사를 기록해 보세요!
        </Typography>
      </div>
    </Link>
  );
};
export default MealEmptyCard;
