import ButtonLink from '@/components/commons/button-link';
import { Typography } from '@/components/ui/typography';
import SITE_MAP from '@/constants/site-map.constant';

// TODO: 디자인 완료되면 반영하기
const StepComplete = () => {
  return (
    <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-9 px-4">
      <div className="flex flex-col items-center before:h-20 before:w-20 before:bg-complete-confetti before:bg-contain before:bg-center before:bg-no-repeat">
        <Typography as="h3" variant="title2" className="mt-8">
          비밀번호가 변경되었어요!
        </Typography>
        <Typography as="p" variant="body2" className="mt-3 text-center text-gray-700">
          새로운 비밀번호로 로그인 해주세요.
        </Typography>
      </div>

      <div className="flex flex-col gap-2">
        <ButtonLink href={SITE_MAP.SIGN_IN}>로그인하기</ButtonLink>
      </div>
    </div>
  );
};

export default StepComplete;
