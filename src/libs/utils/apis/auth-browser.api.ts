import ENV from '@/constants/env.constant';
import { browserClient } from '@/libs/utils/supabase/client.util';

/** 구글을 통해 로그인하는 함수 */
export const signInWithGoogle = async () => {
  browserClient.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${ENV.PROJECT_URL}/api/auth/callback`
    }
  });
};

/** 카카오를 통해 로그인하는 함수 */
export const signInWithKakao = async () => {
  browserClient.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `${ENV.PROJECT_URL}/api/auth/callback`
    }
  });
};
