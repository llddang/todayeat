import Link from 'next/link';

const CtaExampleFeedbackBanner = () => {
  return (
    <div className="bg-gradient-radial-purple after:bg-sparkle-illustration relative mb-4 rounded-2xl p-4 after:absolute after:bottom-5 after:right-5 after:block after:h-12 after:w-12 after:content-['']">
      <h3 className="before:bg-info-icon mb-2 flex items-center gap-1 font-semibold tracking-tight before:block before:h-5 before:w-5 before:bg-contain before:content-['']">
        현재는 예시 피드백이에요
      </h3>
      <p className="tracking-snug mb-4 text-sm">
        지금 바로 1일 목표 칼로리를 설정하고,
        <br />
        나에게 딱 맞는 식단 피드백을 받아보세요!
      </p>
      <Link
        href="목표 설정하기"
        className="tracking-t tracking-snug inline-block rounded-[3.125rem] bg-white px-6 py-3 text-sm font-semibold leading-none"
      >
        목표 설정하기
      </Link>
    </div>
  );
};

export default CtaExampleFeedbackBanner;
