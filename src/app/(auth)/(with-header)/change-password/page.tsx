import { redirect } from 'next/navigation';
import AuthChangePasswordForm from '@/components/_auth/auth-change-password-form';
import { getAuth } from '@/lib/apis/auth-server.api';
import SITE_MAP from '@/constants/site-map.constant';
import PUBLIC_ERROR_MESSAGE from '@/constants/public-error-message.constant';

const ChangePasswordPage = async () => {
  const auth = await getAuth();
  if (!auth.isAuthenticated) redirect(`${SITE_MAP.HOME}?error_code=${PUBLIC_ERROR_MESSAGE.UNAUTHENTICATED.code}`);

  return (
    <section>
      <h2>비밀번호 변경</h2>
      <AuthChangePasswordForm />
    </section>
  );
};
export default ChangePasswordPage;
