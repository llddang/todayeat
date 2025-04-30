import ButtonLink from '@/components/commons/button-link';
import { Typography } from '@/components/ui/typography';
import SITE_MAP from '@/constants/site-map.constant';

const StepComplete = () => {
  return (
    <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-9 px-4">
      <div className="flex flex-col items-center before:h-20 before:w-20 before:bg-complete-confetti before:bg-contain before:bg-center before:bg-no-repeat">
        <Typography as="h3" variant="title3" className="mt-8">
          비밀번호가 재설정되었어요!
        </Typography>
        <Typography as="p" variant="body2" className="mt-3 text-center text-gray-700">
          재설정된 비밀번호로 로그인에 성공했어요.
          <br />
          지금 바로 투데잇을 이용해 보세요!
        </Typography>
      </div>

      <div className="flex flex-col gap-2">
        <ButtonLink href={SITE_MAP.HOME}>홈으로 이동</ButtonLink>
      </div>
    </div>
  );
};

export default StepComplete;
