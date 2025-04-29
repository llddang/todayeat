import { lazy } from 'react';
import AiLoaderStar from '@/../public/lottie/ai-loader-star.json';
import AiLoaderBg from '@/../public/lottie/ai-loader-bg.json';

const LazyLottieComponent = lazy(() => import('react-lottie-player'));

const LottieForClient = () => {
  return (
    <div className="relative h-40 w-40">
      <LazyLottieComponent
        loop
        play
        animationData={AiLoaderStar}
        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 object-contain"
      />
      <LazyLottieComponent loop play animationData={AiLoaderBg} className="h-full w-full object-contain" />
    </div>
  );
};

export default LottieForClient;
