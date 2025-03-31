'use client';

import { Button } from '@/components/ui/button';
import { signInWithKakao } from '@/lib/apis/auth-browser.api';

const AuthSignInWithKakaoButton = () => {
  return <Button onClick={signInWithKakao}>카카오 로그인</Button>;
};
export default AuthSignInWithKakaoButton;
