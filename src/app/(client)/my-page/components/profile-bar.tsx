'use client';

import { Typography } from '@/components/ui/typography';
import { useEffect, useState } from 'react';
import { HorizontalSkeleton } from '@/components/commons/horizontal-skeleton';
import { useUserStore } from '@/store/user-store';
import ProfileImage from '@/components/commons/profile-image';
import EditProfileDrawer from './edit-profile-drawer';

const ProfileBar = () => {
  const user = useUserStore((state) => state.user);
  const isDataLoaded = !!user;
  const [isProfileImageLoading, setIsProfileImageLoading] = useState(true);

  useEffect(() => {
    setIsProfileImageLoading(true);
  }, [user.profileImage]);

  return (
    <div className="flex items-center justify-between gap-2 px-4 pb-4 pt-1">
      {isDataLoaded ? (
        <>
          <div className="flex w-full items-center gap-3">
            <div className="relative aspect-square w-[4.5rem] overflow-hidden rounded-full">
              <ProfileImage
                src={user.profileImage}
                size="md"
                isImageLoading={isProfileImageLoading}
                setIsImageLoading={setIsProfileImageLoading}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <Typography as="span" variant="subTitle1">
                {user.nickname}
              </Typography>
              <Typography as="span" variant="body4" className="pointer-events-none text-gray-600 no-underline">
                {user.email}
              </Typography>
            </div>
          </div>
          {/* 프로필 수정 Drawer */}
          <EditProfileDrawer userInfo={user} />
        </>
      ) : (
        <div className="flex min-h-[4.5rem] items-center">
          <HorizontalSkeleton />
        </div>
      )}
    </div>
  );
};

export default ProfileBar;
