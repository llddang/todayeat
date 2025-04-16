import Link from 'next/link';

type CtaExampleFeedbackBannerProps = {
  title: string;
  description: string;
};

const CtaExampleFeedbackBanner = ({ title, description }: CtaExampleFeedbackBannerProps) => {
  return (
    <div className="relative mb-4 rounded-2xl p-4 bg-gradient-radial-purple after:absolute after:bottom-5 after:right-5 after:block after:h-12 after:w-12 after:bg-sparkle-illustration after:content-['']">
      <div className="px-1">
        <h3 className="mb-2 flex items-center gap-1 font-semibold tracking-tight before:block before:h-5 before:w-5 before:bg-info-icon before:bg-contain before:content-['']">
          {title}
        </h3>
        <p className="mb-4 text-sm tracking-snug">{description}</p>
      </div>
      <Link
        href="목표 설정하기"
        className="tracking-t inline-block rounded-[3.125rem] bg-white px-6 py-3 text-sm font-semibold leading-none tracking-snug"
      >
        목표 설정하기
      </Link>
    </div>
  );
};

export default CtaExampleFeedbackBanner;
