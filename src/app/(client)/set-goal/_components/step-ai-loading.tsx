import { useEffect } from 'react';
import { Typography } from '@/components/ui/typography';
import AiLoaderLottie from '@/components/commons/ai-loader-lottie';

type StepAiLoadingProps = {
  nextStep: () => void;
};

const StepAiLoading = ({ nextStep }: StepAiLoadingProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      nextStep();
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
      <AiLoaderLottie />
      <Typography as="h3" variant="title3">
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
