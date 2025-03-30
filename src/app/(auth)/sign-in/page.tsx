import AuthSignInForm from '@/components/_auth/auth-sign-in-form';
import AuthSignInWithGoogleButton from '@/components/_auth/auth-sign-in-with-google-button';
import AuthSignInWithKakaoButton from '@/components/_auth/auth-sign-in-with-kakao-button';

const SignInPage = () => {
  return (
    <section>
      <AuthSignInForm />
      <AuthSignInWithGoogleButton />
      <AuthSignInWithKakaoButton />
    </section>
  );
};
export default SignInPage;
