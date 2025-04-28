'use client';

import { FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import SITE_MAP from '@/constants/site-map.constant';
import { useUserStore } from '@/store/user-store';

const FirstSection = ({ setCookie }: { setCookie: () => void }) => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const handleClickCtaButton = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await setCookie();
    if (user.id) {
      router.push(SITE_MAP.HOME);
    } else {
      router.push(SITE_MAP.SIGN_IN);
    }
  };

  return (
    <>
      <Typography variant="title2" as="h2">
        기록은 간편하게, <br /> 분석은 정밀하게
      </Typography>
      <Typography variant="body1" as="p" className="mt-4 text-gray-700">
        사진 한 장이면 식단 분석부터 맞춤 피드백까지.
        <br />
        귀찮은 식단 기록, 이제 투데잇이 대신해 드릴게요!
      </Typography>
      <form onSubmit={handleClickCtaButton}>
        <Button type="submit" className="mt-8">
          사진 올리고 분석 시작하기
        </Button>
      </form>
      <div className="relative ml-8 mt-7 h-[15.875rem] w-[23.375rem] overflow-x-hidden">
        <Image src="/images/onboarding-todayeat-img.png" alt="투데잇 앱을 통한 음식 분석 예시 화면" fill />
      </div>
      <section className="mt-[3.37rem] w-full px-4 py-8 text-left">
        <Typography variant="title3" as="h3">
          기록이 귀찮아서
          <br /> 기록을 포기한 적 있나요?
        </Typography>
        <Typography variant="body1" className="mt-4 text-gray-700">
          매번 음식 이름 찾고 칼로리 계산하는 게 번거로워
          <br /> 기록을 포기하고, 식단을 포기한 적 있나요?
        </Typography>
        <div className="relative mt-8 aspect-[3/2] w-full">
          <Image src="/images/onboarding-problem.png" alt="식단 기록의 불편함을 표현한 이미지" fill />
        </div>
      </section>
    </>
  );
};

export default FirstSection;
