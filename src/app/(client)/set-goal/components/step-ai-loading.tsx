import dynamic from 'next/dynamic';
import { Typography } from '@/components/ui/typography';
import { useEffect } from 'react';

const AiLoaderLottie = dynamic(() => import('@/components/commons/ai-loader-lottie'), {
  ssr: false
});

type StepAiLoadingProps = {
  nextStep: () => void;
};

const StepAiLoading = ({ nextStep }: StepAiLoadingProps) => {
  useEffect(() => {
    setTimeout(() => {
      nextStep();
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
      <AiLoaderLottie />
      <Typography as="h3" variant="title2">
        AI가 칼로리를 계산 중이에요!
      </Typography>
      <Typography as="p" variant="body2" className="text-center text-gray-700">
        입력해주신 정보를 바탕으로
        <br />
        1일 권장 섭취 칼로리를 계산하고 있어요.
      </Typography>
    </div>
  );
};

export default StepAiLoading;
