import Link from 'next/link';
import Image from 'next/image';
import SITE_MAP from '@/constants/site-map.constant';
import LOGO from '@/../public/logo.svg';
import { getAuth } from '@/apis/auth-server.api';
import { getUser } from '@/apis/user.api';
import ProfileImage from '@/components/commons/profile-image';
import HeaderLayer from '@/components/layouts/header/header-wrapper';

const HeaderWithProfile = async () => {
  const { isAuthenticated } = await getAuth();
  const profileImage = isAuthenticated ? (await getUser()).profileImage : null;

  return (
    <HeaderLayer>
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
    </HeaderLayer>
  );
};

export default HeaderWithProfile;
