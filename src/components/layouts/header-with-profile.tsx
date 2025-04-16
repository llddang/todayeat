'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useDetectScroll } from '@/lib/hooks/use-detect-scroll';
import ProfileImage from '@/components/commons/profile-image';
import SITE_MAP from '@/constants/site-map.constant';
import LOGO from '@/../public/logo.svg';
import { useUserStore } from '@/lib/hooks/use-user-store';

const HeaderWithProfile = () => {
  const { user } = useUserStore();
  const isScrolled = useDetectScroll();

  const profileImage = user.profileImage;

  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between px-4 py-3',
        isScrolled ? 'bg-purple-10/94 backdrop-blur-[20px]' : 'bg-transparent'
      )}
    >
      <Image src={LOGO} alt="투데잇 로고" />
      <Link href={SITE_MAP.MY_PAGE}>
        {profileImage ? <ProfileImage src={profileImage} size="sm" /> : <ProfileImage size="sm" />}
      </Link>
    </header>
  );
};

export default HeaderWithProfile;
