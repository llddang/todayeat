'use client';

import { Button } from '@/components/ui/button';
import { signInWithGoogle } from '@/libs/apis/auth-browser.api';

const AuthSignInWithGoogleButton = () => {
  return <Button onClick={signInWithGoogle}>구글 로그인</Button>;
};
export default AuthSignInWithGoogleButton;
