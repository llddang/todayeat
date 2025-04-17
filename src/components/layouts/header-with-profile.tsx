import Link from 'next/link';
import Image from 'next/image';
import SITE_MAP from '@/constants/site-map.constant';
import LOGO from '@/../public/logo.svg';
import HeaderWithProfileLayer from '@/components/layouts/header-with-profile-layer';
import { getAuth } from '@/lib/apis/auth-server.api';
import ProfileImage from '@/components/commons/profile-image';
import { getUser } from '@/lib/apis/user.api';

const HeaderWithProfile = async () => {
  const { isAuthenticated } = await getAuth();
  const profileImage = isAuthenticated ? (await getUser()).profileImage : null;

  return (
    <HeaderWithProfileLayer>
      <Link href={SITE_MAP.HOME}>
        <Image src={LOGO} alt="투데잇 로고" />
      </Link>
      {isAuthenticated ? (
        <Link href={SITE_MAP.MY_PAGE}>
          <ProfileImage src={profileImage} size="sm" />
        </Link>
      ) : (
        <Link href={SITE_MAP.SIGN_IN}>
          <ProfileImage src={null} size="sm" />
        </Link>
      )}
    </HeaderWithProfileLayer>
  );
};

export default HeaderWithProfile;
