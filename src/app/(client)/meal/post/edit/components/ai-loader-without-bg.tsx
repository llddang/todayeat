import Lottie from 'react-lottie-player';
import AiLoaderStar from '@/../public/lottie/ai-loader-star.json';

const AiLoaderWithoutBg = () => {
  return (
    <div className="relative flex aspect-square w-20 items-center justify-center">
      <Lottie
        loop
        play
        animationData={AiLoaderStar}
        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default AiLoaderWithoutBg;
