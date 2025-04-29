import ClientOnly from '../client-only';
import LottieForClient from './variant/lottie-for-client';
import LottieForServer from './variant/lottie-for-server';
import LottieForClientWithoutBg from './variant/lottie-for-client-without-bg';
import LottieForServerWithoutBg from './variant/lottie-for-server-without-bg';

type AiLoaderLottieProps = {
  withBackground?: boolean;
};

const AiLoaderLottie = ({ withBackground = true }: AiLoaderLottieProps) => {
  return (
    <ClientOnly fallback={withBackground ? <LottieForServer /> : <LottieForServerWithoutBg />}>
      {withBackground ? <LottieForClient /> : <LottieForClientWithoutBg />}
    </ClientOnly>
  );
};

export default AiLoaderLottie;
