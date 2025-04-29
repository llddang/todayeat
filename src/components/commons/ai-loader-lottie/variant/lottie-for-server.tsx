import Image from 'next/image';
import LottiePreview from '@/../public/images/lottie-preview.png';

const LottieForServer = () => {
  return (
    <div className="relative h-40 w-40">
      <Image src={LottiePreview} alt="로딩 미리보기" fill priority sizes="60vw" />
    </div>
  );
};

export default LottieForServer;
