import Image from 'next/image';
import LottiePreview from '@/../public/images/lottie-preview-without-bg.png';

const LottieForServerWithoutBg = () => {
  return (
    <div className="relative h-20 w-20">
      <Image src={LottiePreview} alt="로딩 미리보기" fill priority sizes="60vw" />
    </div>
  );
};

export default LottieForServerWithoutBg;
