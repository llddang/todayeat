'use client';

import { signInWithKakao } from '@/libs/apis/auth-browser.api';

const AuthSignInWithKakaoButton = () => {
  return (
    <form action={signInWithKakao}>
      <button>카카오 로그인</button>
    </form>
  );
};
export default AuthSignInWithKakaoButton;
