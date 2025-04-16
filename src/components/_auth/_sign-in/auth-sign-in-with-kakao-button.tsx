'use client';

import { Button } from '@/components/ui/button';
import { signInWithKakao } from '@/lib/apis/auth-browser.api';

const AuthSignInWithKakaoButton = () => {
  return (
    <Button
      onClick={signInWithKakao}
      className="bg-kakao before:bg-kakao-logo flex items-center justify-center gap-2 text-black/85 before:block before:h-[1.125rem] before:w-[1.125rem] before:bg-contain before:bg-center before:bg-no-repeat hover:bg-opacity-70"
    >
      카카오로 계속하기
    </Button>
  );
};
export default AuthSignInWithKakaoButton;
