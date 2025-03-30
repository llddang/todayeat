import AuthSignUpForm from '@/components/_auth/auth-sign-up-form';
import Link from 'next/link';

const SignUpPage = () => {
  return (
    <section>
      <h2>회원가입</h2>
      <AuthSignUpForm />
      <p>
        아직 계정이 있으신가요? <Link href="/sign-in">로그인으로</Link>
      </p>
    </section>
  );
};
export default SignUpPage;
