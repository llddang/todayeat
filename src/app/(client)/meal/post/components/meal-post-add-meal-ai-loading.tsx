import dynamic from 'next/dynamic';
import { Typography } from '@/components/ui/typography';

const AiLoaderLottie = dynamic(() => import('@/components/commons/ai-loader-lottie'), {
  ssr: false
});

const MealPostAddMealAiLoading = () => {
  return (
    <div className="flex flex-col items-center">
      <AiLoaderLottie />
      <Typography as="span" variant="subTitle1">
        AI가 음식 정보를 분석 중이에요!
      </Typography>
      <Typography as="p" variant="body2" className="pt-2 text-center text-gray-700">
        조금만 기다려 주세요. <br />
        입력하신 정보를 바탕으로 분석 결과를 만들고 있어요!
      </Typography>
    </div>
  );
};

export default MealPostAddMealAiLoading;
