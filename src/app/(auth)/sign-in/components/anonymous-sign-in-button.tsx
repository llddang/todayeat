'use client';

import { useRouter } from 'next/navigation';
import { signInAnonymously } from '@/apis/auth-server.api';
import { Button } from '@/components/ui/button';
import SITE_MAP from '@/constants/site-map.constant';
import { useState } from 'react';
import Modal from '@/components/commons/modal';

const defaultModalInfo = { title: '', content: '' };

const AnonymousSignInButton = () => {
  const router = useRouter();
  const [modalInfo, setModalInfo] = useState(defaultModalInfo);

  const handleAnonymousSignInClick = async () => {
    try {
      const { error } = await signInAnonymously();
      if (error) return setModalInfo({ title: error.message, content: error.action });
      router.push(SITE_MAP.HOME);
    } catch {
      setModalInfo({
        title: '예상하지 못한 오류가 발생했습니다.',
        content: '잠시 후 다시 시도해주세요.'
      });
    }
  };

  return (
    <>
      <Button
        onClick={handleAnonymousSignInClick}
        className="flex gap-2 before:block before:h-[1.125rem] before:w-[1.125rem] before:bg-user-fill-icon before:bg-contain before:bg-center before:bg-no-repeat"
      >
        게스트 로그인
      </Button>
      <Modal open={!!modalInfo.title} onOpenChange={() => setModalInfo(defaultModalInfo)} {...modalInfo} />
    </>
  );
};
export default AnonymousSignInButton;
