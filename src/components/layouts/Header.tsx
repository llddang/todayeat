import Link from 'next/link';
import AuthSignOutButton from '@/components/_auth/auth-sign-out-button';
import SITE_MAP from '@/constants/site-map.constant';
import { getAuth } from '@/libs/apis/auth-server.api';

const Header = async () => {
  const { isAuthenticated } = await getAuth();
  return (
    <header className="flex justify-between">
      <nav className="space-x-4">
        <Link href={SITE_MAP.HOME}>홈</Link>
        <Link href={SITE_MAP.SIGN_IN}>로그인</Link>
        <Link href={SITE_MAP.SIGN_UP}>회원가입</Link>
      </nav>
      <AuthSignOutButton />
      로그인 했니 ? : {`${isAuthenticated}`}
    </header>
  );
};
export default Header;
