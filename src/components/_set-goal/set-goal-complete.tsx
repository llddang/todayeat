import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';

type SetGoalCompleteProps = {
  userName: string;
};

const SetGoalComplete = ({ userName }: SetGoalCompleteProps) => {
  return (
    <div className="before:bg-complete-confetti absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 before:mb-5 before:h-20 before:w-20 before:bg-contain before:content-['']">
      <Typography as="h3" variant="title2">
        목표 설정이 완료됐어요!
      </Typography>
      <Typography as="p" variant="body2" className="text-center text-gray-700">
        이제 {userName}님의 기준에 맞는
        <br />
        식단 피드백을 받아볼 수 있어요
      </Typography>

      <Button className="mt-9">
        <Link href="/">맞춤 피드백 보러가기</Link>
      </Button>
    </div>
  );
};

export default SetGoalComplete;
