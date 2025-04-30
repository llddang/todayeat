import { useState } from 'react';
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
import { Typography } from '@/components/ui/typography';
import EditProfile from './edit-profile';

const EditProfileDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
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
          <EditProfile setOpen={setOpen} />
          <DrawerFooter>
            <DrawerClose className="absolute right-0 top-0">
              <span className="before:block before:h-10 before:w-10 before:bg-close-line-gray-550-icon before:content-['']">
                <span className="sr-only">닫기</span>
              </span>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EditProfileDrawer;
