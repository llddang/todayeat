import AuthSignInForm from '@/components/_auth/auth-sign-in-form';
import AuthSignInWithGoogleButton from '@/components/_auth/auth-sign-in-with-google-button';
import AuthSignInWithKakaoButton from '@/components/_auth/auth-sign-in-with-kakao-button';
import Link from 'next/link';

const SignInPage = () => {
  return (
    <section>
      <h2>로그인</h2>
      <AuthSignInForm />
      <p>
        아직 계정이 없으신가요? <Link href="/sign-up">회원가입으로</Link>
      </p>
      <AuthSignInWithGoogleButton />
      <AuthSignInWithKakaoButton />
    </section>
  );
};
export default SignInPage;
