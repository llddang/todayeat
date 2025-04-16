import Lottie from 'react-lottie-player';
import AiLoaderStar from '@/../public/lottie/ai-loader-star.json';
import AiLoaderBg from '@/../public/lottie/ai-loader-bg.json';

const SetGoalAiLoaderLottie = () => {
  return (
    <div className="relative">
      <Lottie
        loop
        play
        animationData={AiLoaderStar}
        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2"
      />
      <Lottie loop play animationData={AiLoaderBg} className="h-40 w-40" />
    </div>
  );
};

export default SetGoalAiLoaderLottie;
