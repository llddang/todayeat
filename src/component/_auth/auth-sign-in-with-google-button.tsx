'use client';

import { signInWithGoogle } from '@/libs/apis/auth-browser.api';

const AuthSignInWithGoogleButton = () => {
  return <button onClick={signInWithGoogle}>구글 로그인</button>;
};
export default AuthSignInWithGoogleButton;
