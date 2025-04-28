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
      <div className="xl:flex xl:items-center xl:justify-between xl:pb-[6.25rem] xl:pt-[7.5rem]">
        <div className="xl:flex xl:flex-col xl:items-start xl:justify-center">
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
        </div>
        <div className="relative ml-8 mt-7 aspect-[23.375/15.875] w-[23.375rem] overflow-x-hidden xl:ml-0 xl:mr-5 xl:mt-0 xl:w-[40rem]">
          <Image src="/images/onboarding-todayeat-img.png" alt="투데잇 앱을 통한 음식 분석 예시 화면" fill />
        </div>
      </div>
      <section className="mt-[3.37rem] w-full px-4 py-8 text-left xl:flex xl:justify-between xl:px-0 xl:py-[3.75rem]">
        <div>
          <Typography variant="title3" as="h3" className="xl:typography-title2">
            기록이 귀찮아서
            <br /> 기록을 포기한 적 있나요?
          </Typography>
          <Typography variant="body1" className="mt-4 text-gray-700">
            매번 음식 이름 찾고 칼로리 계산하는 게 번거로워
            <br /> 기록을 포기하고, 식단을 포기한 적 있나요?
          </Typography>
        </div>
        <div className="relative mt-8 aspect-[3/2] w-full xl:mt-0 xl:w-[38rem]">
          <Image src="/images/onboarding-problem.png" alt="식단 기록의 불편함을 표현한 이미지" fill sizes="80vw" />
        </div>
      </section>
    </>
  );
};

export default FirstSection;
