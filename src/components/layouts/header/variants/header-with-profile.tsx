'use client';

import Link from 'next/link';
import Image from 'next/image';
import SITE_MAP from '@/constants/site-map.constant';
import LOGO from '@/../public/logo.svg';
import { useUserStore } from '@/store/user-store';
import ProfileImage from '@/components/commons/profile-image';
import HeaderLayer from '@/components/layouts/header/header-wrapper';

const HeaderWithProfile = () => {
  const user = useUserStore((state) => state.user);
  const profileImage = user.profileImage || null;

  return (
    <HeaderLayer>
      <Link href={SITE_MAP.HOME}>
        <Image src={LOGO} alt="투데잇 로고" />
      </Link>

      <Link href={SITE_MAP.MY_PAGE}>
        <ProfileImage src={profileImage} size="sm" />
      </Link>
    </HeaderLayer>
  );
};

export default HeaderWithProfile;
