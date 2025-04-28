'use client';

import { useRouter } from 'next/navigation';
import { SignInAnonymously } from '@/apis/auth-server.api';
import { Button } from '@/components/ui/button';
import SITE_MAP from '@/constants/site-map.constant';

const AnonymousSignInButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        SignInAnonymously();
        router.push(SITE_MAP.HOME);
      }}
      className="flex gap-2 before:block before:h-[1.125rem] before:w-[1.125rem] before:bg-user-fill-icon before:bg-contain before:bg-center before:bg-no-repeat"
    >
      게스트 로그인
    </Button>
  );
};
export default AnonymousSignInButton;
