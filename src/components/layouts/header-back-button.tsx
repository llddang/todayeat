'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const HeaderBackButton = () => {
  const router = useRouter();
  const params = useSearchParams();

  const step = params.get('step') ?? '';
  const canGoBack = step.includes('step');

  if (!canGoBack) return null;

  return (
    <button onClick={() => router.back()} className="absolute left-4 mr-2">
      ← Back
    </button>
  );
};

export default HeaderBackButton;
