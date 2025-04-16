'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useDetectIsScrolled } from '@/lib/hooks/use-detect-is-scrolled';
import ProfileImage from '@/components/commons/profile-image';
import SITE_MAP from '@/constants/site-map.constant';
import LOGO from '@/../public/logo.svg';
import { useUserStore } from '@/lib/hooks/use-user-store';

const HeaderWithProfile = () => {
  const { user } = useUserStore();
  const isScrolled = useDetectIsScrolled();

  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-layout flex h-16 w-full items-center justify-between px-4 py-3',
        isScrolled ? 'bg-purple-10/94 backdrop-blur-[20px]' : 'bg-transparent',
        'temp-layout left-1/2 -translate-x-1/2'
      )}
    >
      <Link href={SITE_MAP.HOME}>
        <Image src={LOGO} alt="투데잇 로고" />
      </Link>
      {user.id ? (
        <Link href={SITE_MAP.MY_PAGE}>
          <ProfileImage src={user.profileImage} size="sm" />
        </Link>
      ) : (
        <Link href={SITE_MAP.SIGN_IN}>
          <ProfileImage src={null} size="sm" />
        </Link>
      )}
    </header>
  );
};

export default HeaderWithProfile;
