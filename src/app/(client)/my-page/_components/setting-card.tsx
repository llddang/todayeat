'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Typography } from '@/components/ui/typography';
import SITE_MAP from '@/constants/site-map.constant';
import { signOut } from '@/apis/auth-server.api';
import { useToast } from '@/hooks/use-toast';

const SettingCard = () => {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    toast({
      description: '로그아웃 되었습니다.',
      icon: 'before:bg-toast-success',
      duration: 3000
    });
    await signOut();
    router.push(SITE_MAP.HOME);
  };

  return (
    <div className="flex flex-col rounded-2xl bg-white px-4 py-3">
      <div className="border-b-[1px] border-gray-200 pb-2">
        <Typography as="h3" variant="subTitle2" className="py-[0.56rem] pl-1 text-gray-800">
          설정
        </Typography>
      </div>
      <ul className="mt-2 text-gray-800">
        <li>
          <Link
            href={SITE_MAP.CHANGE_PASSWORD}
            className="flex w-full cursor-pointer items-center justify-between px-1 py-[0.56rem] after:block after:aspect-square after:w-5 after:bg-right-line-gray-600-icon after:bg-contain after:bg-no-repeat after:content-['']"
          >
            <Typography as="span" variant="body1" className="block w-full">
              비밀번호 수정
            </Typography>
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center justify-between px-1 py-[0.56rem] after:block after:aspect-square after:w-5 after:bg-right-line-gray-600-icon after:bg-contain after:bg-no-repeat after:content-['']"
          >
            <Typography as="span" variant="body1">
              로그아웃
            </Typography>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SettingCard;
