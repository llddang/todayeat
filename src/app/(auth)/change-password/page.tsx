import { redirect } from 'next/navigation';
import AuthChangePasswordForm from '@/components/_auth/auth-change-password-form';
import { getAuth } from '@/lib/apis/auth-server.api';
import SITE_MAP from '@/constants/site-map.constant';

const ChangePasswordPage = async () => {
  const auth = await getAuth();
  if (!auth.isAuthenticated) redirect(`${SITE_MAP.HOME}?error_code=Unauthenticated`);

  return (
    <section>
      <h2>비밀번호 변경</h2>
      <AuthChangePasswordForm />
    </section>
  );
};
export default ChangePasswordPage;
