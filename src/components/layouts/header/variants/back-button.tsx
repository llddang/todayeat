'use client';

import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      aria-label="뒤로가기"
      className="h-10 w-10 bg-back-line-icon bg-contain bg-center bg-no-repeat"
    />
  );
};

export default BackButton;
