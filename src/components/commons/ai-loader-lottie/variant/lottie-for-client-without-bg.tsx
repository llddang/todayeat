import { lazy } from 'react';
import AiLoaderStar from '@/../public/lottie/ai-loader-star.json';

const LazyLottieComponent = lazy(() => import('react-lottie-player'));

const LottieForClientWithoutBg = () => {
  return (
    <div className="relative h-20 w-20">
      <LazyLottieComponent
        loop
        play
        animationData={AiLoaderStar}
        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 object-contain"
      />
    </div>
  );
};

export default LottieForClientWithoutBg;
