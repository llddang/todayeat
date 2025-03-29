import { signUp } from '@/libs/apis/auth-server.api';

const SignUpPage = () => {
  const handleSubmit = async (formData: FormData) => {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    if (!email || !password || !name) return;
    await signUp(email, password, name);
  };

  return (
    <section>
      <form action={handleSubmit}>
        <label htmlFor="email">이메일</label>
        <input name="email" type="text" />
        <label htmlFor="password">비밀번호</label>
        <input name="password" type="password" />
        <label htmlFor="name">닉네임</label>
        <input name="name" type="text" />
        <button type="submit">회원가입</button>
      </form>
    </section>
  );
};
export default SignUpPage;
