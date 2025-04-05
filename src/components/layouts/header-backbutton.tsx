'use client';

import { usePathname, useRouter } from 'next/navigation';

const BackButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  const canGoBack = pathname.includes('step');

  if (!canGoBack) return null;

  return (
    <button onClick={() => router.back()} className="mr-2">
      ← Back
    </button>
  );
};

export default BackButton;
