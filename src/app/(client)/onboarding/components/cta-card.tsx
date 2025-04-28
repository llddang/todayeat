'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { useUserStore } from '@/store/user-store';
import SITE_MAP from '@/constants/site-map.constant';
import { FormEvent } from 'react';

const CtaCard = ({ setCookie }: { setCookie: () => void }) => {
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
    <section className="px-4 pt-10 xl:px-0 xl:pt-[3.75rem]">
      <div className="h-full w-full rounded-2xl px-4 py-8 bg-gradient-radial-purple xl:py-10">
        <Typography as="h3" variant="title3">
          오늘 어떤 음식을 먹었나요?
        </Typography>
        <Typography variant="body2" className="mt-3 text-gray-800">
          지금 바로 오늘 먹은 음식 사진을 올리고 <br />
          칼로리, 영양소 분석부터 피드백까지 받아보세요!
        </Typography>
        <form onSubmit={handleClickCtaButton}>
          <Button type="submit" className="mt-6 text-gray-800" variant="secondary">
            사진 올리고 분석 시작하기
          </Button>
        </form>
      </div>
    </section>
  );
};

export default CtaCard;
