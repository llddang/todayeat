'use client';
import { Typography } from '@/components/ui/typography';
import dynamic from 'next/dynamic';

const SetGoalAiLoaderLottie = dynamic(() => import('@/components/_set-goal/set-goal-ai-loader-lottie'), {
  ssr: false
});

const Report = () => {
  return (
    <div className="relative flex h-[calc(100vh-14rem)] w-full items-center">
      <div className="flex w-full flex-col items-center gap-2 text-center">
        <SetGoalAiLoaderLottie />
        <Typography>
          비밀번호 변경 페이지는 <br />
          추후 개발될 예정이에요!
        </Typography>
      </div>
    </div>
  );
};

export default Report;
