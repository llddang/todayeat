'use client';

import { Button } from '@/components/ui/button';
import { signInWithGoogle } from '@/apis/auth-browser.api';

const AuthSignInWithGoogleButton = () => {
  return (
    <Button
      onClick={signInWithGoogle}
      variant="secondary"
      className="flex gap-1 before:block before:h-5 before:w-5 before:bg-google-logo before:bg-contain before:bg-center before:bg-no-repeat"
    >
      구글로 계속하기
    </Button>
  );
};
export default AuthSignInWithGoogleButton;
