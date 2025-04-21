'use client';

import { Typography } from '@/components/ui/typography';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { useEffect, useState } from 'react';
import { HorizontalSkeleton } from '@/components/commons/horizontal-skeleton';
import { useUserStore } from '@/store/user-store';
import EditProfile from '@/app/(client)/my-page/components/edit-profile';
import ProfileImage from '@/components/commons/profile-image';

const ProfileBar = () => {
  const user = useUserStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    if (user.id) setIsDataLoaded(!!user.id);
  }, [user]);

  useEffect(() => {
    setIsImageLoading(true);
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
                isImageLoading={isImageLoading}
                setIsImageLoading={setIsImageLoading}
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

          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <span
                className="flex h-9 w-9 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/80 bg-center bg-no-repeat object-contain backdrop-blur-[10px] before:block before:h-4 before:w-4 before:bg-edit-info-icon before:bg-contain before:bg-no-repeat before:content-[''] hover:bg-gray-300/80"
                aria-label="프로필 수정하기"
                aria-haspopup="dialog"
                aria-expanded={open}
              >
                <span className="sr-only">프로필 수정하기</span>
              </span>
            </DrawerTrigger>
            {open && (
              <DrawerContent className="rounded-t-[2rem] px-5 pt-4">
                <div className="relative">
                  <DrawerHeader className="p-0 text-left">
                    <DrawerTitle className="py-[0.56rem] pl-1">
                      <Typography as="span" variant="subTitle2" className="py-0">
                        프로필 수정
                      </Typography>
                    </DrawerTitle>
                    <DrawerDescription className="sr-only">
                      여기에서 프로필을 수정하세요. 완료되면 저장 버튼을 클릭하세요.
                    </DrawerDescription>
                  </DrawerHeader>
                  <EditProfile userInfo={user} setOpen={setOpen} />
                  <DrawerFooter>
                    <DrawerClose className="absolute right-0 top-0">
                      <span className="before:block before:h-10 before:w-10 before:bg-close-line-gray-550-icon before:content-['']">
                        <span className="sr-only">닫기</span>
                      </span>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            )}
          </Drawer>
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
