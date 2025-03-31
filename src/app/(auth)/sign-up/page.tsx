import Link from 'next/link';
import AuthSignUpForm from '@/components/_auth/auth-sign-up-form';
import SITE_MAP from '@/constants/site-map.constant';

const SignUpPage = () => {
  return (
    <section>
      <h2>회원가입</h2>
      <AuthSignUpForm />
      <p>
        이미 계정이 있으신가요? <Link href={SITE_MAP.SIGN_IN}>로그인으로</Link>
      </p>
    </section>
  );
};
export default SignUpPage;
