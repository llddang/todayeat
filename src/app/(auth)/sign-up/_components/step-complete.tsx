import ButtonLink from '@/components/commons/button-link';
import { Typography } from '@/components/ui/typography';
import SITE_MAP from '@/constants/site-map.constant';

const StepComplete = () => {
  return (
    <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-9 px-4">
      <div className="flex flex-col items-center before:h-20 before:w-20 before:bg-complete-confetti before:bg-contain before:bg-center before:bg-no-repeat">
        <Typography as="h3" variant="title3" className="mt-8">
          가입이 완료되었어요!
        </Typography>
        <Typography as="p" variant="body2" className="mt-3 text-center text-gray-700">
          이제 사진을 올리면 음식 이름부터
          <br />
          칼로리, 영양소까지 AI가 자동으로 분석해줘요.
          <br />
          <br />첫 번째 기록, 지금 해볼까요?
        </Typography>
      </div>

      <div className="flex flex-col gap-2">
        <ButtonLink href={SITE_MAP.MEAL_POST}>사진 올리고 분석하기</ButtonLink>
        <ButtonLink href={SITE_MAP.HOME} variant="ghost">
          나중에 할게요
        </ButtonLink>
      </div>
    </div>
  );
};

export default StepComplete;
