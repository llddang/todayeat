'use client';

import Image from 'next/image';
import DefaultProfile from '@/../public/illustrations/default-profile.svg';
import { Typography } from '@/components/ui/typography';
import IconButton from '@/components/commons/icon-button';
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
import MyPageEditProfile from '@/components/_my-page/my-page-edit-profile';
import { useUserStore } from '@/lib/hooks/use-user-store';
import { HorizontalSkeleton } from '@/components/commons/horizontal-skeleton';

const MyPageProfileBar = () => {
  const { user, refresh } = useUserStore();
  const [open, setOpen] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (user.id) setIsDataLoaded(!!user.id);
  }, [user]);

  return (
    <div className="flex items-center justify-between gap-2 px-4 pb-4 pt-1">
      {isDataLoaded ? (
        <>
          <div className="flex w-full items-center gap-3">
            <span className="relative aspect-square w-[4.5rem] overflow-hidden rounded-full">
              <Image
                src={user.profileImage || DefaultProfile}
                alt={user.nickname}
                fill
                priority
                sizes="20vw"
                className="object-contain"
              />
            </span>
            <div className="flex flex-1 flex-col">
              <Typography as="span" variant="subTitle1">
                {user.nickname}
              </Typography>
              <Typography as="span" variant="body4" className="text-gray-600">
                {user.email}
              </Typography>
            </div>
          </div>

          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <IconButton
                alt="프로필 수정하기"
                size="md"
                icon="before:bg-edit-info-icon"
                aria-label="프로필 수정하기"
                aria-haspopup="dialog"
                aria-expanded={open}
              />
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
                  <MyPageEditProfile userInfo={user} setOpen={setOpen} refresh={refresh} />
                  <DrawerFooter>
                    <DrawerClose className="absolute right-0 top-0">
                      <button
                        type="button"
                        className="before:bg-close-line-gray-550-icon before:block before:h-10 before:w-10 before:content-['']"
                      >
                        <span className="sr-only">닫기</span>
                      </button>
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

export default MyPageProfileBar;
