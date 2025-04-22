'use client';

import Link from 'next/link';
import Image from 'next/image';
import SITE_MAP from '@/constants/site-map.constant';
import LOGO from '@/../public/logo.svg';
import { useUserStore } from '@/store/user-store';
import ProfileImage from '@/components/commons/profile-image';

const WithProfile = () => {
  const user = useUserStore((state) => state.user);
  const profileImage = user.profileImage || null;

  return (
    <>
      <Link href={SITE_MAP.HOME}>
        <Image src={LOGO} alt="투데잇 로고" />
      </Link>
      <Link href={SITE_MAP.MY_PAGE}>
        <ProfileImage src={profileImage} size="sm" />
      </Link>
    </>
  );
};

export default WithProfile;
