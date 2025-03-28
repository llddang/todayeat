import { signIn } from '@/libs/utils/apis/auth.api';

const SignInPage = () => {
  const handleSubmit = async (formData: FormData) => {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    if (!email || !password) return;

    await signIn(email, password);
  };
  return (
    <section>
      <form action={handleSubmit}>
        <label htmlFor="email">이메일</label>
        <input name="email" type="text" />
        <label htmlFor="password">비밀번호</label>
        <input name="password" type="password" />
        <button type="submit">로그인</button>
      </form>
    </section>
  );
};
export default SignInPage;
