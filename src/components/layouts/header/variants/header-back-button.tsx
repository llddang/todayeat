'use client';

import { useRouter } from 'next/navigation';
import HeaderLayer from '../header-wrapper';

const HeaderBackButton = () => {
  const router = useRouter();

  return (
    <HeaderLayer>
      <button
        onClick={() => router.back()}
        aria-label="뒤로가기"
        className="h-10 w-10 bg-back-line-icon bg-contain bg-center bg-no-repeat"
      />
    </HeaderLayer>
  );
};

export default HeaderBackButton;
