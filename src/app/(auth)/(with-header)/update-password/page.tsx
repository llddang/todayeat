import { redirect } from 'next/navigation';
import AuthUpdatePasswordForm from '@/components/_auth/auth-update-password-form';
import SITE_MAP from '@/constants/site-map.constant';
import PUBLIC_ERROR_MESSAGE from '@/constants/public-error-message.constant';

type UpdatePasswordPageProps = {
  searchParams: {
    code?: string;
  };
};
const UpdatePasswordPage = async ({ searchParams }: UpdatePasswordPageProps) => {
  if (!searchParams.code)
    return redirect(`${SITE_MAP.HOME}?error_code=${PUBLIC_ERROR_MESSAGE.EXPIRED_EMAIL_TOKEN.code}`);

  return (
    <section>
      <h2>비밀번호 변경</h2>
      <AuthUpdatePasswordForm accessToken={searchParams.code} />
    </section>
  );
};
export default UpdatePasswordPage;
